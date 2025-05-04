<script lang="ts">
	import LoanWidget from '../../../components/loan/LoanWidget.svelte';
	import type { Loan } from '../../../data/DummyLoans';
	import { change_address, repayments } from '../../../stores/ui';
	import EmptyRepayments from '../../../components/loan/EmptyRepayments.svelte';

	let activeRepayments: Loan[] = [];
	let repaymentHistory: Loan[] = [];

	// Reactively recalculate when change_address changes and is not empty
	$: {
		activeRepayments = $repayments.filter(
			(l) => l.daysLeft > 0 && !l.isRepayed && l.creator === $change_address && l.phase !== 'loan'
		);
		repaymentHistory = $repayments.filter(
			(l) =>
				(l.daysLeft === 0 || l.isRepayed) && l.creator === $change_address && l.phase !== 'loan'
		);
	}
</script>

{#if activeRepayments.length > 0}
	<div class="mb-4 flex items-center gap-1">
		<span class="text-lg font-medium">Active repayments</span>
		<span class="ml-1 text-sm font-thin opacity-70"
			>({activeRepayments.length} repayment{activeRepayments.length > 1 ? 's' : ''})</span
		>
	</div>
	<div id="loans-grid" class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
		{#each activeRepayments as loan}
			<LoanWidget {loan} showCreator={false} />
		{/each}
	</div>
{/if}

{#if repaymentHistory.length > 0}
	<div class:mt-10={activeRepayments.length > 0} class="mb-4 flex items-center gap-1">
		<span class="text-lg font-semibold">Repayment history</span>
		<span class="text-sm font-thin opacity-70"
			>({repaymentHistory.length} repayment{repaymentHistory.length > 1 ? 's' : ''})</span
		>
	</div>
	<div id="loans-grid" class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
		{#each repaymentHistory as loan}
			<LoanWidget {loan} showCreator={false} />
		{/each}
	</div>
{/if}

{#if activeRepayments.length === 0 && repaymentHistory.length === 0}
	<EmptyRepayments />
{/if}
