<script lang="ts">
	import { onMount } from 'svelte';
	import EmptyLoans from '../../../components/loan/EmptyLoans.svelte';
	import { loans } from '../../../data/DummyLoans';
	import LoanWidget from '../../../components/loan/LoanWidget.svelte';
	import type { Loan } from '../../../data/DummyLoans';
	import { change_address } from '../../../stores/ui';

	let withdrawableLoans: Loan[] = [];
	let activeLoanRequests: Loan[] = [];
	onMount(() => {
		withdrawableLoans = loans.filter((l) => l.isReadyForWithdrawal && l.creator == $change_address);
		activeLoanRequests = loans.filter(
			(l) => !l.isReadyForWithdrawal && l.creator == $change_address
		);
	});
</script>

{#if withdrawableLoans.length > 0}
	<div class="mb-4 flex items-center gap-1">
		<span class="text-lg font-semibold">Withdrawable loans</span>
		<span class="text-sm font-thin opacity-70"
			>({withdrawableLoans.length} loan{withdrawableLoans.length > 1 ? 's' : ''})</span
		>
	</div>
	<div id="loans-grid" class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
		{#each withdrawableLoans as loan}
			<LoanWidget {loan} showCreator={false} />
		{/each}
	</div>
{/if}

{#if activeLoanRequests.length > 0}
	<div class:mt-10={withdrawableLoans.length > 0} class="mb-4 flex items-center gap-1">
		<span class="text-lg font-semibold">Active loan requests</span>
		<span class="text-sm font-thin opacity-70"
			>({activeLoanRequests.length} loan{activeLoanRequests.length > 1 ? 's' : ''})</span
		>
	</div>
	<div id="loans-grid" class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
		{#each activeLoanRequests as loan}
			<LoanWidget {loan} showCreator={false} />
		{/each}
	</div>
{/if}

{#if withdrawableLoans.length == 0 && activeLoanRequests.length == 0}
	<EmptyLoans></EmptyLoans>
{/if}
