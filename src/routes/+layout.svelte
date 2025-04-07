<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/navbar/Navbar.svelte';
	import { initTheme, is_dark } from '../stores/ui';

	let { children } = $props();

	let unsubscribe: () => void;

	onMount(() => {
		initTheme();
		unsubscribe = is_dark.subscribe((value) => {
			localStorage.setItem('theme', value ? 'dark' : 'light');
		});
	});

	onDestroy(() => {
		unsubscribe?.();
	});
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />
	<main class="mx-auto max-w-screen-lg flex-grow px-4 text-lg font-light md:px-0 md:text-xs">
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
