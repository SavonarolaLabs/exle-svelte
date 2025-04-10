<script lang="ts">
	import { transactions } from '../../data/TxHistory';
	import Copy from '../../icons/Copy.svelte';
	import GlobalSearch from '../../icons/GlobalSearch.svelte';

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

	// Function to copy transaction ID to clipboard
	function copyToClipboard(text: string) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				// Optional: You could add a toast notification here
				console.log('Transaction ID copied to clipboard');
			})
			.catch((err) => {
				console.error('Failed to copy: ', err);
			});
	}
</script>

<div
	class="grid grid-cols-5 gap-4 border-b border-light-gray pb-2 text-xs opacity-[0.6] dark:border-dark-gray"
>
	<div>Transaction Type</div>
	<div>Transaction Hash</div>
	<div>Time & Date</div>
	<div>Amount</div>
</div>
{#each transactions as tx}
	<div class="grid grid-cols-5 py-3 text-sm">
		<div>{tx.transactionType}</div>
		<button class="flex cursor-pointer gap-1" on:click={() => copyToClipboard(tx.id)}>
			{tx.id}
			<Copy></Copy>
		</button>
		<div>{formatTimestamp(tx.timestamp)}</div>
		<div>{tx.amount} {tx.token}</div>
		<a href="https://explorer.ergoplatform.com/en/transactions/{tx.id}">
			<div class="flex gap-1 text-light-accent dark:text-dark-accent">
				<GlobalSearch></GlobalSearch> View on explorer
			</div>
		</a>
	</div>
{/each}
