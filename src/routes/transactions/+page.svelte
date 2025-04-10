<script lang="ts">
	import TransactionTable from '../../components/txhistory/TransactionTable.svelte';
	import { transactions } from '../../data/TxHistory';
</script>

<div class="mb-4 mt-10">
	<div class="mb-1 text-xl font-semibold">Transaction History</div>
	<div class="opacity-[0.6]">
		{transactions.length} Transaction{transactions.length != 1 ? 's' : ''}
	</div>
</div>
<TransactionTable></TransactionTable>
