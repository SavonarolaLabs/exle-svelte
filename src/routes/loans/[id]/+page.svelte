<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { loans } from '../../../data/DummyLoans';
	import LoanDetails from '../../../components/loan/LoanDetails.svelte';

	let loan = {};
	let loanId;

	$: loanId = $page.params.id;

	onMount(() => {
		loan = loans.find((l) => l.loanId == loanId);
	});
</script>

{#if loan}
	<LoanDetails {loan}></LoanDetails>
{:else}
	Loan not found.
{/if}
