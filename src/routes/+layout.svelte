<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
	let { children } = $props();
</script>

<Navbar />
<main class="mx-auto max-w-screen-lg text-xs">
	{@render children()}
</main>
<Footer></Footer>

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
