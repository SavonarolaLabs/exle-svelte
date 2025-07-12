import {
	createLendCrowdfundBoxTx,
	createLendTokensTx,
	decodeExleFundingInfo,
	decodeExleLoanTokenId,
	donationsFromExleMetadata,
	EXLE_MINING_FEE,
	fetchAllExleMetadata,
	fetchCrowdFundBoxesByLoanId,
	fetchLendBox,
	fetchLoans,
	fetchNodeInfo,
	fetchRepayments,
	fetchServiceBox,
	fundCrowdFundBoxTokensTx,
	fundLendWithCrowdBoxTokensTx,
	fundRepaymentTokensSruProxyTx,
	fundRepaymentTokensTx,
	isExleTx,
	isUserTx,
	parseLoanBox,
	parseRepaymentBox,
	prepareCrowdFundFromLendTx,
	preparefundLendTokensTx,
	prepareLendToRepaymentTokensTx,
	prepareNewCrowdFundTx,
	txToHistoryItem,
	type AllExleMetadata,
	type CreateLendChainContext,
	type CreateLendInputParams,
	type Donation,
	type ErgoTransaction,
	type HistoryItem,
	type Loan,
	type NodeBox
} from '$lib/exle/exle';
import { decimalsByTokenId } from '$lib/exle/exle';
import { derived, get, writable, type Readable, type Writable } from 'svelte/store';

export let is_mobile: Writable<Boolean> = writable(false);
export const connected_wallet: Writable<string> = writable('nautilus');
export const change_address: Writable<string> = writable('');
export const is_mobile_menu_open: Writable<boolean> = writable(false);
export const token_balance: Writable<Object[]> = writable([
	{
		ticker: 'ERG',
		amount: 23.45 * 10 ** 9,
		decimals: 9
	},
	{
		ticker: 'SigUSD',
		amount: 10878,
		decimals: 2
	}
]);

async function disconnectWeb3Wallet() {
	console.log('disconnectWeb3Wallet');
	try {
		await window.ergoConnector[get(connected_wallet)].disconnect();
	} catch {
		// Gotta catch em all!
	}
	connected_wallet.set('');
	change_address.set('');
}

async function connectWeb3Wallet() {
	const wallets = window.ergoConnector ? Object.keys(window.ergoConnector) : [];
	if (wallets.length > 0) {
		try {
			let connected = await window.ergoConnector[wallets[0]].connect();
			const address = await ergo.get_change_address();
			if (connected) {
				connected_wallet.set(wallets[0]);

				change_address.set(address);

				//await loadWeb3WalletTokens();
			} else {
				console.warn(`Connecting ${wallets[0]} failed.`);
			}
		} catch (e) {
			console.error(e);
		}
	}
}

export function toggleMobileMenu() {
	is_mobile_menu_open.update((value) => !value);
}

export function closeMobileMenu() {
	is_mobile_menu_open.set(false);
}

export function logout() {
	disconnectWeb3Wallet();
}

export function connectWallet() {
	connectWeb3Wallet();
}

export const is_dark: Writable<boolean> = writable(true);

export function initTheme() {
	const storedTheme = localStorage.getItem('theme') === 'dark';
	is_dark.set(storedTheme);
	document.documentElement.classList.toggle('dark', storedTheme);
}

export function toggleTheme() {
	is_dark.update((value) => {
		const newValue = !value;
		document.documentElement.classList.toggle('dark', newValue);
		return newValue;
	});
}

// fetch chain data
export const repayments: Writable<Loan[]> = writable([]);
export const exle_metadata: Writable<AllExleMetadata> = writable();

export async function loadLoansAndRepayments() {
	const loanBoxes = await fetchLoans();
	const nodeInfo = await fetchNodeInfo();
	if (!loanBoxes || !nodeInfo) return;
	const loanList: Loan[] = loanBoxes
		.map((b) => parseLoanBox(b, nodeInfo))
		.filter(Boolean) as Loan[];

	const repaymentBoxes = await fetchRepayments();
	const repaymentList: Loan[] = repaymentBoxes
		.map((b) => parseRepaymentBox(b, nodeInfo))
		.filter(Boolean) as Loan[];

	repayments.set([...loanList, ...repaymentList]);
}

export const my_donations: Readable<Donation[]> = derived<
	[typeof exle_metadata, typeof change_address],
	Donation[]
>(
	[exle_metadata, change_address],
	([$exle_metadata, $change_address], set) => {
		if (!$exle_metadata || !$change_address) return;
		const donations = donationsFromExleMetadata($exle_metadata, $change_address);
		set(donations);
	},
	[] as Donation[]
);

export const transactions: Readable<HistoryItem[]> = derived<
	[typeof exle_metadata, typeof change_address],
	HistoryItem[]
>(
	[exle_metadata, change_address],
	([$exle_metadata, $change_address], set) => {
		if (!$exle_metadata || !$change_address) return;
		const transactions = [...$exle_metadata.crowdfundHistoryTxs, ...$exle_metadata.loanHistoryTxs]
			.filter((tx) => isExleTx(tx))
			.filter((tx) => isUserTx(tx, $change_address))
			.map((tx) => txToHistoryItem(tx))
			.filter(Boolean);
		console.log({ transactions });
		set(transactions);
	},
	[] as HistoryItem[]
);

export async function loadExleHistory() {
	const meta = await fetchAllExleMetadata();
	if (meta) {
		exle_metadata.set(meta);
	}
}

export async function getWeb3WalletData() {
	await window.ergoConnector.nautilus.connect();
	const me = await ergo.get_change_address();
	const utxos = await ergo.get_utxos();
	const height = await ergo.get_current_height();
	return { me, utxos, height };
}

const sampleSolofundLend: CreateLendInputParams = {
	loanType: 'Solofund',
	project: ['Foo', 'Bar'],
	loanTokenId: 'f60bff91f7ae3f3a5f0c2d35b46ef8991f213a61d7f7e453d344fa52a42d9f9a', // Test SigUSD
	fundingGoal: 100n * 100n,
	interestRate: 20n, // 2%
	fundingDeadlineLength: 100_000n,
	repaymentHeightLength: 720n * 30n,
	borrowerAddress: '9euvZDx78vhK5k1wBXsNvVFGc5cnoSasnXCzANpaawQveDCHLbU'
};

export async function createSolofundLoanTokens(userInput: CreateLendInputParams) {
	//const userInput = sampleSolofundLend;
	const { utxos: userUtxo, height } = await getWeb3WalletData();
	const serviceBox = await fetchServiceBox();
	if (!serviceBox) {
		throw new Error('Failed to fetch service box');
	}
	const chainData: CreateLendChainContext = {
		userUtxo,
		serviceBox,
		height
	};
	const unsignedTx = createLendTokensTx(userInput, chainData);
	const signed = await ergo.sign_tx(unsignedTx);

	//const unsignedCrowdTx = createLendCrowdfundBoxTx(signed, userInput);
	//console.log({ signed });
	const sumbited = await ergo.submit_tx(signed);
	console.log({ sumbited });
}

//prepareNewCrowdFundTx
// serviceBox: 9d5a69629b999312d1971ba10d185c914eea72505a0206f16ea52aa3a9f8f871
// lendBox:
export async function createCrowdfundLoanTokens(
	loanId: string = '9f42a7457d48f34495d8c0c0aa7b5ac99b478e1638e47946077f05476e23a885'
) {
	const { utxos: utxo, height, me } = await getWeb3WalletData();
	const serviceBox = await fetchServiceBox();
	if (!serviceBox) {
		throw new Error('Failed to fetch service box');
	}

	const lendbox = await fetchLendBox(loanId);

	if (!lendbox) {
		throw new Error('Failed to fetch lend box');
	}

	const unsignedTx = prepareNewCrowdFundTx(serviceBox, lendbox, utxo, height, me);
	console.log(unsignedTx);
	console.log('------CHECK-----');
	console.log(unsignedTx.inputs[0].assets);
	console.log(unsignedTx.outputs[0].assets);
	const signed = await ergo.sign_tx(unsignedTx);
	console.log({ signed });
	const sumbited = await ergo.submit_tx(signed);
	console.log({ sumbited });
}

//fundCrowdFundBoxTx
export async function fundCrowdfundLoanTokens() {
	const amount: bigint = 100n * 100n;
	const { utxos: utxo, height, me } = await getWeb3WalletData();

	const serviceBox = await fetchServiceBox();
	if (!serviceBox) {
		throw new Error('Failed to fetch service box');
	}

	const lendbox = await fetchLendBox(
		'9f42a7457d48f34495d8c0c0aa7b5ac99b478e1638e47946077f05476e23a885'
	);
	if (!lendbox) {
		throw new Error('Failed to fetch lend box');
	}
	const loanId = lendbox.assets[1].tokenId;

	const crowdFundBox = (await fetchCrowdFundBoxesByLoanId(loanId))[0];

	console.log('Crowd?', crowdFundBox);

	const paymentBox = {
		boxId: 'b334f7c6c947d5220940e68969d0b2f25aeb13730da7cc45b12cdeeb84dffffc',
		value: 50000000,
		ergoTree: '0008cd02eb083423041003740c9e791b2fea5ecf6e273669630a25b7ecabf9145395e447',
		assets: [
			{
				tokenId: 'f60bff91f7ae3f3a5f0c2d35b46ef8991f213a61d7f7e453d344fa52a42d9f9a',
				amount: 10000000000
			}
		],
		creationHeight: 1509225,
		additionalRegisters: {},
		transactionId: '63bfcbcb9fd24c7e5f174a0a6f5cb2b2d8ef16f762af60b649f01a90acea2f4f',
		index: 0
	};

	const otherUtxo = utxo.filter((x) => x.boxId != paymentBox.boxId);

	const unsignedTx = fundCrowdFundBoxTokensTx(
		amount,
		crowdFundBox,
		lendbox,
		serviceBox,
		paymentBox,
		otherUtxo,
		height,
		EXLE_MINING_FEE,
		me
	);
	console.log('-----------');
	console.log(unsignedTx);
	console.log('-----------');
	const signed = await ergo.sign_tx(unsignedTx);
	console.log({ signed });
	const sumbited = await ergo.submit_tx(signed);
	console.log({ sumbited });
}

export async function withdrawLendTokensTx(
	loanId: string = '9f42a7457d48f34495d8c0c0aa7b5ac99b478e1638e47946077f05476e23a885'
) {
	console.log(loanId);
	const { height, me } = await getWeb3WalletData();

	const lendbox = await fetchLendBox(loanId);
	if (!lendbox) {
		throw new Error('Failed to fetch lend box');
	}
	const serviceBox = await fetchServiceBox();
	if (!serviceBox) {
		throw new Error('Failed to fetch service box');
	}
	const unsignedTx = prepareLendToRepaymentTokensTx(
		height,
		serviceBox,
		lendbox,
		EXLE_MINING_FEE,
		me
	);

	console.log(unsignedTx);
	// autosign + submit

	//const signed = await ergo.sign_tx(unsignedTx);
	//console.log({ signed });
	//const sumbited = await ergo.submit_tx(signed);
	//console.log({ sumbited });
}

export async function fundLoanSolobyId(loanId: string) {
	100n * 100n; // Example amount (10,000)
	const { height, utxos, me } = await getWeb3WalletData();

	const serviceBox = await fetchServiceBox();
	if (!serviceBox) throw new Error('Failed to fetch service box');

	const lendBox = await fetchLendBox(loanId);
	if (!lendBox) throw new Error('Failed to fetch lend box');
	const { fundingGoal } = decodeExleFundingInfo(lendBox);

	const unsignedTx = preparefundLendTokensTx(
		fundingGoal,
		me,
		utxos,
		lendBox,
		height,
		EXLE_MINING_FEE
	);

	console.log('Unsigned TX:', unsignedTx);

	const signed = await ergo.sign_tx(unsignedTx);
	console.log('Signed TX:', signed);

	const submitted = await ergo.submit_tx(signed);
	console.log('Submitted TX ID:', submitted);
}

export async function repayLoanByIdTokens(loanId: string, inputAmount: string) {
	if (!inputAmount || isNaN(Number(inputAmount))) {
		throw new Error('Invalid amount');
	}
	const { height, me, utxos } = await getWeb3WalletData();

	const lendBox = await fetchLendBox(loanId);
	if (!lendBox) {
		throw new Error('Failed to fetch lend box');
	}
	const tokenId = decodeExleLoanTokenId(lendBox);
	const decimals = decimalsByTokenId(tokenId);

	const amount = BigInt(Math.floor(Number(inputAmount) * 10 ** decimals));

	const unsignedTx = fundRepaymentTokensSruProxyTx(
		amount,
		me,
		utxos,
		lendBox, // treat this as a repaymentBox
		height,
		EXLE_MINING_FEE
	);

	console.log('Prepared TX:', unsignedTx);

	const signed = await ergo.sign_tx(unsignedTx);
	console.log('Signed TX:', signed);

	const submitted = await ergo.submit_tx(signed);
	console.log('Submitted TX ID:', submitted);
	return submitted;
}

export async function fundLoanWithCrowdBoxTokens() {
	const { height } = await getWeb3WalletData();

	const lendbox = await fetchLendBox(
		'9f42a7457d48f34495d8c0c0aa7b5ac99b478e1638e47946077f05476e23a885'
	);
	if (!lendbox) {
		throw new Error('Failed to fetch lend box');
	}

	const loanId = lendbox.assets[1].tokenId;

	const crowdFundBox = (await fetchCrowdFundBoxesByLoanId(loanId))[0];

	const unsignedTx = fundLendWithCrowdBoxTokensTx(crowdFundBox, lendbox, height, EXLE_MINING_FEE);

	console.log('----------');
	console.log(unsignedTx);
	//const signed = await ergo.sign_tx(unsignedTx);
	//console.log({ signed });
	//const sumbited = await ergo.submit_tx(signed);
	//console.log({ sumbited });
}

export async function fundRepaymentTokens() {
	const { height, me, utxos: utxo } = await getWeb3WalletData();

	const serviceBox = await fetchServiceBox();
	if (!serviceBox) {
		throw new Error('Failed to fetch service box');
	}

	const repaymentBox = await fetchLendBox(
		'e8c6c0d206cddff5268b6789e7cd74e4461785a835488b75b5684a9dc0b66bd0'
	);
	if (!repaymentBox) {
		throw new Error('Failed to fetch lend box');
	}
	console.log({ repaymentBox });
	const fundingAmount = 1n;

	const unsignedTx = fundRepaymentTokensTx(
		fundingAmount,
		me,
		utxo,
		repaymentBox,
		serviceBox,
		height,
		EXLE_MINING_FEE
	);

	console.log('----------');
	console.log(unsignedTx);
	const signed = await ergo.sign_tx(unsignedTx);
	console.log({ signed });
	const sumbited = await ergo.submit_tx(signed);
	console.log({ sumbited });
}

export async function createCrowdfundLoan_old() {
	const userInput = sampleSolofundLend;
	const { utxos: userUtxo, height, me } = await getWeb3WalletData();
	const serviceBox = await fetchServiceBox();
	if (!serviceBox) {
		throw new Error('Failed to fetch service box');
	}
	const chainData: CreateLendChainContext = {
		userUtxo,
		serviceBox,
		height
	};
	const unsignedTx = createLendTokensTx(userInput, chainData);
	const signed = await ergo.sign_tx(unsignedTx);
	console.log('ok');
	console.log('------CHECK-----');
	console.log(unsignedTx.inputs[0].assets);
	console.log(unsignedTx.outputs[0].assets);

	await wait();

	const unsignedTx2 = prepareCrowdFundFromLendTx(signed, height, me);
	console.log(unsignedTx2);
	console.log('------CHECK-----');
	console.log(unsignedTx2.inputs[0].assets);
	console.log(unsignedTx2.outputs[0].assets);
	const signed2 = await ergo.sign_tx(unsignedTx2);
	console.log({ signed2 });
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// Использование:
async function wait() {
	console.log('До задержки');
	await delay(500); // задержка 200 мс
	console.log('После задержки');
}
