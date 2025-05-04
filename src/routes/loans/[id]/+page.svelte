<script>
	import { page } from '$app/stores';
	import LoanDetails from '../../../components/loan/LoanDetails.svelte';
	import { repayments } from '../../../stores/ui';

	let loan = {};
	let loanId;

	$: loanId = $page.params.id;
	$: loan = $repayments.find((l) => l.loanId === loanId);
</script>

{#if loan}
	<LoanDetails {loan} />
{:else if $repayments.length > 0}
	{$repayments.length}
	Loan not found.
{/if}
