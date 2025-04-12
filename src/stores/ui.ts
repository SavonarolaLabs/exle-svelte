import {
	fetchLoans,
	fetchRepayments,
	parseLoanBox,
	parseRepaymentBox,
	type Loan
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
