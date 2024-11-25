<script>
	import { onMount } from 'svelte';

	let isDarkMode = localStorage.getItem('theme') === 'dark';

	const toggleTheme = () => {
		isDarkMode = !isDarkMode;
		document.documentElement.classList.toggle('dark', isDarkMode);
		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
	};

	// Ensure theme persists on page load
	onMount(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		}
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button on:click={toggleTheme}>
	{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
</button>

<style lang="postcss">
	:global(html) {
		@apply bg-white text-black transition-colors;
	}
	:global(html.dark) {
		@apply bg-black text-white;
	}
</style>
