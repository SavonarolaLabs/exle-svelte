<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import LoanDetails from '../../../components/loan/LoanDetails.svelte';
	import { repayments } from '../../../stores/ui';

	let loan = {};
	let loanId;

	$: loanId = $page.params.id;

	onMount(() => {
		loan = $repayments.find((l) => l.loanId == loanId);
	});
</script>

{#if loan}
	<LoanDetails {loan}></LoanDetails>
{:else}
	Loan not found.
{/if}
