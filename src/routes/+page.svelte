<script>
	import Button from '../components/Button.svelte';
</script>

<section class="flex flex-col items-center space-y-8 py-16 text-center">
	<h1
		class="bg-gradient-to-r from-light-gradientStart to-light-gradientEnd bg-clip-text py-2 text-6xl font-bold leading-[1.2] text-transparent dark:from-dark-gradientStart dark:to-dark-gradientEnd"
	>
		Borrow and lend money<br /> globally on Ergo chain
	</h1>

	<p class="text-md">
		A person-to-person (P2P) lending platform with easy-to-use<br /> tools to borrow and lend money on
		the Ergo blockchain.
	</p>
	<div class="flex space-x-4">
		<Button href="/create-loan" label="Create loan" variant="primary" />
		<Button href="/learn-more" label="Learn more" variant="secondary" />
	</div>
</section>

<style>
	/* Optional local styles */
</style>
