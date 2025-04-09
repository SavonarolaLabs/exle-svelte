<script lang="ts">
	import { base } from '$app/paths';
	import Button from '../../components/Button.svelte';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

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
			<div class="whitespace-nowrap text-gray-800">23.45 ERG</div>
			<Button href="{base}/loans/create" label="Create loan" variant="primary" class="px-6" />
		</div>
	</div>

	<div class="mb-6 border-b">
		<div class="flex">
			<a href="/account/loans" class="tab" class:tab-active={$activeTab === 'loans'}>Loans</a>
			<a href="/account/repayments" class="tab" class:tab-active={$activeTab === 'repayments'}
				>Repayments</a
			>
			<a href="/account/donations" class="tab" class:tab-active={$activeTab === 'donations'}
				>Donations</a
			>
		</div>
	</div>

	{@render children()}
</div>

<style lang="postcss">
	.tab {
		@apply px-4 py-2 text-gray-600;
	}

	.tab-active {
		@apply border-b-2 border-blue-600 font-medium text-blue-600;
	}
</style>
