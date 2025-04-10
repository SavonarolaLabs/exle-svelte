<script lang="ts">
	import { shortenAddress } from '$lib/utils';
	import type { Loan } from '../../data/DummyLoans';
	import Clock from '../../icons/Clock.svelte';
	import InterestRate from '../../icons/InterestRate.svelte';
	import TickCircle from '../../icons/TickCircle.svelte';
	export let loan: Loan;
	export let showCreator: boolean = true;
</script>

<a href="/loans/{loan.loanId}">
	<div
		class="loan-widget rounded-2xl border-2 border-light-border p-6 px-5 dark:border-dark-border"
	>
		<div class="mb-2 flex items-center justify-between text-xs font-thin">
			<span>Loan ID: {loan.loanId}</span>
			<span>{loan.loanType}</span>
		</div>
		<h3 class="mb-3 text-xl font-medium">{loan.loanTitle}</h3>
		<p class="mb-5 line-clamp-4 h-[90px] overflow-hidden text-sm font-thin leading-relaxed">
			{loan.loanDescription}
		</p>
		<ul class="mb-5 space-y-4 text-sm">
			<li class="flex items-end gap-2">
				<Clock></Clock>
				<span class="font-medium">{loan.repaymentPeriod}</span>
				<span class="text-thin text-xs">Repayment Period</span>
			</li>
			<li class="flex items-center gap-2">
				<InterestRate></InterestRate>
				<span class="font-medium">{loan.interestRate}</span>
				<span class="text-thin text-xs">Interest Rate</span>
			</li>
		</ul>
		<div class="">
			<div class="mb-2 flex items-center justify-between text-sm">
				<span class="font-thin">
					{#if loan.phase == 'loan'}
						Funding Goal:
					{:else}
						Total Repayment:
					{/if}
				</span>
				<span class="font-medium">{loan.fundingGoal} {loan.fundingToken}</span>
			</div>
			<div class="h-[10px] w-full overflow-hidden rounded-full bg-[#0001] dark:bg-[#fff1]">
				<div
					class="h-full"
					class:bg-gray-500={loan.daysLeft == 0 || loan.isRepayed}
					class:bg-green-500={loan.phase == 'loan' && loan.daysLeft > 0 && !loan.isRepayed}
					class:bg-indigo-600={loan.phase == 'repayment' && loan.daysLeft > 0 && !loan.isRepayed}
					style="width: {loan.fundedPercentage}%"
				></div>
			</div>
			<div class="mt-2 flex items-center justify-between text-sm">
				<span
					class="dark:hidden"
					class:text-gray-500={loan.daysLeft == 0 || loan.isRepayed}
					class:text-green-500={loan.phase == 'loan' && loan.daysLeft > 0 && !loan.isRepayed}
					class:text-indigo-600={loan.phase == 'repayment' && loan.daysLeft > 0 && !loan.isRepayed}
					>{loan.fundedAmount}
					{#if loan.phase == 'loan'}
						funded
					{:else}
						repaid
					{/if}
				</span>
				<span
					class="hidden dark:block"
					class:text-gray-500={loan.daysLeft == 0 || loan.isRepayed}
					class:text-green-500={loan.phase == 'loan' && loan.daysLeft > 0 && !loan.isRepayed}
					class:text-indigo-400={loan.phase == 'repayment' && loan.daysLeft > 0 && !loan.isRepayed}
					>{loan.fundedAmount}
					{#if loan.phase == 'loan'}
						funded
					{:else}
						repaid
					{/if}
				</span>
				{#if loan.isReadyForWithdrawal}
					<span class="flex items-center gap-1 text-xs font-semibold text-green-500">
						<TickCircle></TickCircle>
						Ready for withdrawal
					</span>
				{:else}
					<span class="font-normal">{loan.daysLeft} Days Left</span>
				{/if}
			</div>
		</div>
		{#if showCreator}
			<p class="mt-5 text-xs font-thin">Created by: {shortenAddress(loan.creator)}</p>
		{/if}
	</div>
</a>
