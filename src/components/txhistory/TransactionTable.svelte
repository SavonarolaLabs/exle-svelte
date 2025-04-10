<script lang="ts">
	import { transactions } from '../../data/TxHistory';
	import Copy from '../../icons/Copy.svelte';
	import GlobalSearch from '../../icons/GlobalSearch.svelte';
	import More from '../../icons/More.svelte';

	// Format timestamp to "HH:MM | DD MMM YYYY"
	function formatTimestamp(timestamp: string) {
		const date = new Date(timestamp);
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		const day = date.getDate();
		const month = date.toLocaleString('en-US', { month: 'short' });
		const year = date.getFullYear();

		return `${hours}:${minutes} | ${day} ${month} ${year}`;
	}
	function formatTime(timestamp: string) {
		const date = new Date(timestamp);
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');

		return `${hours}:${minutes}`;
	}

	function formatDate(timestamp: string) {
		const date = new Date(timestamp);
		const day = date.getDate();
		const month = date.toLocaleString('en-US', { month: 'short' });
		const year = date.getFullYear();

		return `${day} ${month} ${year}`;
	}

	function copyToClipboard(text: string) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				console.log('Transaction ID copied to clipboard');
			})
			.catch((err) => {
				console.error('Failed to copy: ', err);
			});
	}
</script>

<div
	class="grid hidden grid-cols-5 gap-4 border-b border-light-gray pb-2 text-xs opacity-[0.6] dark:border-dark-gray lg:grid"
>
	<div>Transaction Type</div>
	<div>Transaction Hash</div>
	<div>Time & Date</div>
	<div class="text-center">Amount</div>
</div>
<div class="rows">
	{#each transactions as tx}
		<div class="hidden grid-cols-5 py-3 text-sm lg:grid">
			<div>{tx.transactionType}</div>
			<button class="flex cursor-pointer gap-1" on:click={() => copyToClipboard(tx.id)}>
				{tx.id}
				<Copy></Copy>
			</button>
			<div class="flex justify-start gap-1">
				<span class="w-[40px] text-right">{formatTime(tx.timestamp)}</span> | {formatDate(
					tx.timestamp
				)}
			</div>
			<div class="flex justify-end gap-1">
				{tx.amount} <span style="width:100px">{tx.token}</span>
			</div>
			<a href="https://explorer.ergoplatform.com/en/transactions/{tx.id}">
				<div class="flex justify-end gap-1 text-light-accent dark:text-dark-accent">
					<GlobalSearch></GlobalSearch> View on explorer
				</div>
			</a>
		</div>
	{/each}
</div>

<div class="lg:hidden">
	{#each transactions as tx}
		<div class="grid grid-cols-2 py-3 text-sm">
			<div>
				<div class="mb-1 font-medium">{tx.transactionType}</div>
				<div class="text-xs opacity-[0.6]">
					{tx.id}
				</div>
			</div>
			<div class="flex items-center">
				<div class="flex-grow text-right">
					<div class="mb-1 font-medium">{tx.amount} {tx.token}</div>
					<div class="text-xs opacity-[0.6]">{formatTimestamp(tx.timestamp)}</div>
				</div>
				<button class="pl-4"><More></More></button>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.rows > *:not(:last-child) {
		@apply border-b-2 border-light-border dark:border-dark-border;
	}
</style>
