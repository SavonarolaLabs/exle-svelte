<script>
	let isDark = true;

	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
	}
</script>

<button on:click={toggleTheme} class="text-2xl">
	{#if isDark}
		🌙
	{/if}
	{#if !isDark}
		☀️
	{/if}
</button>
