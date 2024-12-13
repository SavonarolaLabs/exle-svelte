<script>
	export let href = '#';
	export let label = '';
	export let variant = 'primary';
</script>

<a
	{href}
	class={`btn text-md rounded-xl px-6 py-3 transition ${
		variant === 'primary'
			? 'bg-light-accent  text-white hover:opacity-90 dark:bg-dark-accent dark:text-white'
			: 'border-2 border-light-accent bg-transparent text-light-accent hover:bg-light-accent hover:text-white dark:border-gray-600 dark:text-white dark:hover:bg-dark-accent dark:hover:text-white'
	}`}
>
	{label}
</a>

<style>
	.btn {
		font-size: 14px;
		font-weight: 600;
		line-height: 17.64px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
