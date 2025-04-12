<script lang="ts">
	import EmptyTransactions from '../../components/loan/EmptyTransactions.svelte';
	import TransactionTable from '../../components/txhistory/TransactionTable.svelte';
	import { transactions } from '../../data/TxHistory';
</script>

<div class="flex grow flex-col md:px-4 xl:px-0">
	<div class="mb-4 mt-10">
		<div class="mb-1 text-xl font-semibold">Transaction History</div>
		<div class="opacity-[0.6]">
			{transactions.length} Transaction{transactions.length != 1 ? 's' : ''}
		</div>
	</div>
	{#if transactions?.length > 0}
		<TransactionTable></TransactionTable>
	{:else}
		<EmptyTransactions></EmptyTransactions>
	{/if}
</div>
