<script>
	import { base } from '$app/paths';

	import Button from '../components/Button.svelte';
</script>

<section>
	<h1
		class="mt-24 bg-gradient-to-r from-light-gradientStart to-light-gradientEnd bg-clip-text py-1 text-5xl font-bold leading-[1.2] text-transparent dark:from-dark-gradientStart dark:to-dark-gradientEnd"
	>
		Borrow and lend money<br /> globally on Ergo chain
	</h1>

	<p>
		A person-to-person (P2P) lending platform with easy-to-use<br /> tools to borrow and lend money on
		the Ergo blockchain.
	</p>
	<div class="flex space-x-4">
		<Button href="{base}/loans/create" label="Create loan" variant="primary" />
		<Button href="{base}/learn-more" label="Learn more" variant="secondary" />
	</div>
	<div class="relative" style="max-width:522px;">
		<img class="mt-4" src="{base}/globe.png" alt="" />
		<h2
			class="absolute bottom-0 left-1/2 -translate-x-1/2 transform whitespace-nowrap text-4xl font-bold"
		>
			How Does it work?
		</h2>
	</div>
</section>

<style lang="postcss">
	/* Optional local styles */
	section {
		@apply flex flex-col items-center space-y-8 text-center text-xs;
	}
</style>
