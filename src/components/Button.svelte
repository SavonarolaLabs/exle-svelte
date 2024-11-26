<script>
	export let href = '#';
	export let label = '';
	export let variant = 'primary';
</script>

<a
	{href}
	class={`rounded-xl px-8 py-3 transition ${
		variant === 'primary'
			? 'bg-light-accent text-white hover:opacity-90 dark:bg-dark-accent dark:text-white'
			: 'border-2 border-light-accent bg-transparent text-light-accent hover:bg-light-accent hover:text-white dark:border-gray-600 dark:text-white dark:hover:bg-dark-accent dark:hover:text-white'
	}`}
>
	{label}
</a>
