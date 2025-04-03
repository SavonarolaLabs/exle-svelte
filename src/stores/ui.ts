import { writable, type Writable } from 'svelte/store';

export const connected_wallet: Writable<string> = writable('nautilus');

export function logout() {
	connected_wallet.set('');
}

export function connectWallet() {
	connected_wallet.set('nautilus');
}
