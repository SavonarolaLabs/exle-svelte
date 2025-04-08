<script>
	import { is_dark } from '../stores/ui';

	export let href = '#';
	export let label = '';
	export let variant = 'primary';
	export let disabled = false;
	export let onClick = () => {};
</script>

{#if disabled}
	<button
		class="btn w-full rounded-xl border-2 border-gray-400 bg-gray-400 px-6 py-3 text-md font-medium text-gray-800 opacity-[0.4] transition md:w-[170px]"
		disabled={true}>{label}</button
	>
{:else if href != '#'}
	<a
		{href}
		on:click={onClick}
		class="btn w-full rounded-xl px-6 py-3 text-md font-medium transition md:w-[170px]"
		class:primary={variant === 'primary'}
		class:primary-outline={variant === 'primary-outline'}
		class:secondary={variant === 'secondary'}
		class:border-light-border={!$is_dark}
		class:border-dark-border={$is_dark}
	>
		{label}
	</a>
{:else}
	<button
		on:click|preventDefault={onClick}
		class="btn w-full rounded-xl px-6 py-3 text-md font-medium transition md:w-[170px]"
		class:primary={variant === 'primary'}
		class:primary-outline={variant === 'primary-outline'}
		class:secondary={variant === 'secondary'}
		class:border-light-border={!$is_dark}
		class:border-dark-border={$is_dark}
	>
		{label}
	</button>
{/if}

<style lang="postcss">
	.primary {
		@apply bg-light-accent text-white hover:opacity-90 dark:bg-dark-accent dark:text-white;
	}
	.primary-outline {
		@apply border-2 border-dark-accent bg-transparent text-dark-accent hover:border-light-accent hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent dark:hover:text-white;
	}
	.secondary {
		@apply border-2 bg-transparent hover:border-light-accent hover:bg-dark-accent hover:text-white;
	}

	.btn {
		line-height: 17.64px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
