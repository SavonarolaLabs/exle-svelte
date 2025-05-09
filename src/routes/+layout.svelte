<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/navbar/Navbar.svelte';
	import {
		change_address,
		connected_wallet,
		connectWallet,
		initTheme,
		is_dark,
		loadLoansAndRepayments
	} from '../stores/ui';
	import type { Writable } from 'svelte/store';
	import { fetchAllExleMetadata } from '$lib/exle/exle';

	let { children } = $props();

	let unsubTheme: () => void;
	let unsubAddress: () => void;
	let unsubWallet: () => void;

	export function persistStore<T>(key: string, store: Writable<T>, defaultValue: T) {
		// Initialize from localStorage
		const stored = localStorage.getItem(key);
		if (stored !== null) {
			try {
				store.set(JSON.parse(stored));
			} catch (e) {
				console.warn(`Failed to parse localStorage key: ${key}`);
			}
		} else {
			store.set(defaultValue);
		}

		// Subscribe to store and persist changes
		const unsubscribe = store.subscribe((value) => {
			if (
				value === undefined ||
				value === null ||
				(typeof value === 'string' && value.trim() === '')
			) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, JSON.stringify(value));
			}
		});

		return unsubscribe;
	}

	onMount(() => {
		initTheme();
		unsubTheme = is_dark.subscribe((value) => {
			localStorage.setItem('theme', value ? 'dark' : 'light');
		});

		unsubAddress = persistStore('change_address', change_address, '');
		unsubWallet = persistStore('connected_wallet', connected_wallet, '');

		const restoredWallet = localStorage.getItem('connected_wallet');
		if (restoredWallet) {
			connectWallet(restoredWallet);
		}

		loadLoansAndRepayments();
		fetchAllExleMetadata();
	});

	onDestroy(() => {
		unsubTheme?.();
		unsubAddress?.();
		unsubWallet?.();
	});
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />
	<main
		class="mx-auto flex w-full max-w-screen-xl flex-grow flex-col px-4 text-lg font-light md:text-sm xl:px-0"
	>
		{@render children()}
	</main>
	<Footer></Footer>
</div>

<style lang="postcss">
	/* Light Mode (default) */
	:global(html) {
		@apply bg-light-background text-light-text transition-colors;
		font-weight: 300; /* Light font */
		letter-spacing: 0.025em; /* Slightly wide */
	}

	/* Dark Mode */
	:global(html.dark) {
		@apply bg-dark-background text-dark-text;
	}
	:global(h2) {
		@apply text-4xl font-bold;
	}
</style>
