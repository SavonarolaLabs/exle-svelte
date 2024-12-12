<script>
	let isDark = true;

	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
	}
</script>

<button on:click={toggleTheme} class="text-2xl">
	{#if isDark}
		<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="15.5" cy="15.5" r="15.5" fill="#292837" />
			<path
				d="M15.5 21.1875C18.6411 21.1875 21.1875 18.6411 21.1875 15.5C21.1875 12.3589 18.6411 9.8125 15.5 9.8125C12.3589 9.8125 9.8125 12.3589 9.8125 15.5C9.8125 18.6411 12.3589 21.1875 15.5 21.1875Z"
				stroke="white"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M21.7475 21.7475L21.6338 21.6338M21.6338 9.36625L21.7475 9.2525L21.6338 9.36625ZM9.2525 21.7475L9.36625 21.6338L9.2525 21.7475ZM15.5 6.82V6.75V6.82ZM15.5 24.25V24.18V24.25ZM6.82 15.5H6.75H6.82ZM24.25 15.5H24.18H24.25ZM9.36625 9.36625L9.2525 9.2525L9.36625 9.36625Z"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	{/if}
	{#if !isDark}
		☀️
	{/if}
</button>
