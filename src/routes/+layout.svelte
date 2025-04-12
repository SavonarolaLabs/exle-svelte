<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/navbar/Navbar.svelte';
	import { initTheme, is_dark, loadLoansAndRepayments } from '../stores/ui';

	let { children } = $props();

	let unsubscribe: () => void;

	onMount(() => {
		initTheme();
		unsubscribe = is_dark.subscribe((value) => {
			localStorage.setItem('theme', value ? 'dark' : 'light');
		});
		loadLoansAndRepayments();
	});

	onDestroy(() => {
		unsubscribe?.();
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
