<script lang="ts">
	import { onMount } from 'svelte';
	import { transactions } from '../../data/TxHistory';
	import Copy from '../../icons/Copy.svelte';
	import GlobalSearch from '../../icons/GlobalSearch.svelte';
	import More from '../../icons/More.svelte';

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
			.then(() => console.log('Copied'))
			.catch((err) => console.error('Failed to copy: ', err));
		closeMenu();
	}

	let openIndex: number | null = null;
	let popupRefs: HTMLElement[] = [];
	let buttonRefs: HTMLElement[] = [];

	function toggleMenu(index: number) {
		openIndex = openIndex === index ? null : index;
	}

	function closeMenu() {
		openIndex = null;
	}

	onMount(() => {
		const handleClick = (e: MouseEvent) => {
			if (openIndex === null) return;
			const popup = popupRefs[openIndex];
			const button = buttonRefs[openIndex];
			if (!popup || !button) return;
			if (!popup.contains(e.target as Node) && !button.contains(e.target as Node)) {
				closeMenu();
			}
		};
		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	});
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
		<div
			class="hidden grid-cols-5 border-light-border py-3 text-sm dark:border-dark-border lg:grid"
		>
			<div>{tx.transactionType}</div>
			<button class="flex cursor-pointer gap-1" on:click={() => copyToClipboard(tx.id)}>
				{tx.id}
				<Copy />
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
					<GlobalSearch /> View on explorer
				</div>
			</a>
		</div>
	{/each}
</div>

<div class="lg:hidden">
	{#each transactions as tx, i}
		<div class="relative grid grid-cols-2 py-3 text-sm">
			<div>
				<div class="mb-1 font-medium">{tx.transactionType}</div>
				<div class="text-xs opacity-[0.6]">{tx.id}</div>
			</div>

			<div class="flex items-center justify-end">
				<div class="text-right">
					<div class="mb-1 font-medium">{tx.amount} {tx.token}</div>
					<div class="text-xs opacity-[0.6]">{formatTimestamp(tx.timestamp)}</div>
				</div>
				<div class="relative ml-3">
					<button bind:this={buttonRefs[i]} on:click={() => toggleMenu(i)}>
						<More />
					</button>

					{#if openIndex === i}
						<div
							bind:this={popupRefs[i]}
							class="absolute right-0 top-full z-10 mt-2 w-60 rounded-xl border border-[#0000000F] bg-white p-2 shadow-lg dark:bg-dark-background dark:shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
						>
							<button
								class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-normal hover:bg-gray-100 dark:hover:bg-gray-800"
								on:click={() => copyToClipboard(tx.id)}
							>
								<Copy />
								Copy transaction hash
							</button>
							<a
								href={`https://explorer.ergoplatform.com/en/transactions/${tx.id}`}
								target="_blank"
								on:click={closeMenu}
								class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-normal hover:bg-gray-100 dark:hover:bg-gray-800"
							>
								<GlobalSearch />
								View on block explorer
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.rows > *:not(:last-child) {
		@apply border-b-2;
	}
</style>
