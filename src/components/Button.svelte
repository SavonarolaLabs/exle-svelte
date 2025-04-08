<script>
	export let href = '#';
	export let label = '';
	export let variant = 'primary';
</script>

<a
	{href}
	class={`btn w-full rounded-xl px-6 py-3 text-md transition md:w-[170px] ${
		variant === 'primary'
			? 'bg-light-accent  text-white hover:opacity-90 dark:bg-dark-accent dark:text-white'
			: 'border-2 bg-transparent hover:border-light-accent  hover:bg-light-accent hover:text-white dark:border-gray-600 dark:text-white dark:hover:bg-dark-accent dark:hover:text-white'
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
		align-items: center;
	}
</style>
