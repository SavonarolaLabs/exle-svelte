import {
	createLendCrowdfundBoxTx,
	createLendTokensTx,
	EXLE_MINING_FEE,
	fetchCrowdFundBoxesByLoanId,
	fetchLendBox,
	fetchLoans,
	fetchRepayments,
	fetchServiceBox,
	fundCrowdFundBoxTokensTx,
	fundLendWithCrowdBoxTokensTx,
	parseLoanBox,
	parseRepaymentBox,
	prepareCrowdFundFromLendTx,
	prepareNewCrowdFundTx,
	type CreateLendChainContext,
	type CreateLendUserInput,
	type Loan,
	type NodeBox
} from '$lib/exle/exle';
import { writable, type Writable } from 'svelte/store';

export const connected_wallet: Writable<string> = writable('nautilus');
export const change_address: Writable<string> = writable(
	'9euvZDx78vhK5k1wBXsNvVFGc5cnoSasnXCzANpaawQveDCHLbU'
);
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

export function toggleMobileMenu() {
	is_mobile_menu_open.update((value) => !value);
}

export function closeMobileMenu() {
	is_mobile_menu_open.set(false);
}

export function logout() {
	connected_wallet.set('');
}

export function connectWallet() {
	connected_wallet.set('nautilus');
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

export async function loadLoansAndRepayments() {
	const loanBoxes = await fetchLoans();
	console.log({ loanBoxes });
	const loanList: Loan[] = loanBoxes.map(parseLoanBox).filter(Boolean) as Loan[];

	const repaymentBoxes = await fetchRepayments();
	const repaymentList: Loan[] = repaymentBoxes.map(parseRepaymentBox).filter(Boolean) as Loan[];

	repayments.set([...loanList, ...repaymentList]);
}

export async function getWeb3WalletData() {
	await window.ergoConnector.nautilus.connect();
	const me = await ergo.get_change_address();
	const utxos = await ergo.get_utxos();
	const height = await ergo.get_current_height();
	return { me, utxos, height };
}

const sampleSolofundLend: CreateLendUserInput = {
	loanType: 'Solofund',
	project: ['Foo', 'Bar'],
	loanTokenId: 'f60bff91f7ae3f3a5f0c2d35b46ef8991f213a61d7f7e453d344fa52a42d9f9a', // Test SigUSD
	fundingGoal: 100n * 100n,
	interestRate: 20n, // 2%
	fundingDeadlineHeight: 1_504_829n + 100_000n,
	repaymentHeightLength: 720n * 30n,
	borrowerAddress: '9euvZDx78vhK5k1wBXsNvVFGc5cnoSasnXCzANpaawQveDCHLbU'
};

export async function createSolofundLoanTokens() {
	const userInput = sampleSolofundLend;
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
export async function createCrowdfundLoanTokens() {
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
