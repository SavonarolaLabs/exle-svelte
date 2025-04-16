import {
	createLend,
	fetchLoans,
	fetchRepayments,
	fetchServiceBox,
	parseLoanBox,
	parseRepaymentBox,
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
	fundingDeadlineHeight: 1504829n + 100000n,
	repaymentHeightLength: 720n * 30n,
	borrowerAddress: '9euvZDx78vhK5k1wBXsNvVFGc5cnoSasnXCzANpaawQveDCHLbU'
};

export async function createSolofundLoan() {
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
	createLend(sampleSolofundLend, chainData);
}
