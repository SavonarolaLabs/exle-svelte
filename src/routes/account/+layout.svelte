<script lang="ts">
	import { base } from '$app/paths';
	import Button from '../../components/Button.svelte';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { token_balance } from '../../stores/ui';

	let { children } = $props();

	const path = derived(page, ($page) => $page.url.pathname);
	const activeTab = derived(path, ($path) =>
		$path.includes('/repayments')
			? 'repayments'
			: $path.includes('/donations')
				? 'donations'
				: 'loans'
	);
</script>

<div class="flex w-full flex-grow flex-col">
	<div class="mb-4 mt-8 flex items-center justify-between">
		<div>
			<div class="text-xl font-medium">My Account</div>
			<div class="text-sm text-gray-500">9eq6S...QXssg</div>
		</div>
		<div class="flex items-center gap-4">
			{#each $token_balance as token}
				<div class="whitespace-nowrap font-normal">
					{token.amount / 10 ** token.decimals}
					{token.ticker}
				</div>
			{/each}
			<Button href="{base}/loans/create" label="Create loan" variant="primary" class="px-6" />
		</div>
	</div>

	<div class="mb-6 border-b-2 border-gray-200">
		<div class="flex">
			<div class="relative">
				<a href="{base}/account/loans" class="tab" class:tab-active={$activeTab === 'loans'}
					>Loans</a
				>
				{#if $activeTab === 'loans'}
					<div class="indicator"></div>
				{/if}
			</div>
			<div class="relative">
				<a
					href="{base}/account/repayments"
					class="tab"
					class:tab-active={$activeTab === 'repayments'}>Repayments</a
				>
				{#if $activeTab === 'repayments'}
					<div class="indicator"></div>
				{/if}
			</div>
			<div class="relative">
				<a href="{base}/account/donations" class="tab" class:tab-active={$activeTab === 'donations'}
					>Donations</a
				>
				{#if $activeTab === 'donations'}
					<div class="indicator"></div>
				{/if}
			</div>
		</div>
	</div>

	{@render children()}
</div>

<style lang="postcss">
	.tab {
		@apply block px-4 py-2 text-gray-600;
	}

	.tab-active {
		@apply font-medium text-light-accent dark:text-dark-accent;
	}

	.indicator {
		@apply absolute bottom-[-1] left-0 h-0.5 w-full bg-light-accent dark:bg-dark-accent;
	}
</style>
