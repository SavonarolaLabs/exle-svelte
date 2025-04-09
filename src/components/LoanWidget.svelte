<script lang="ts">
	import type { Loan } from '../data/DummyLoans';
	import Clock from '../icons/Clock.svelte';
	import InterestRate from '../icons/InterestRate.svelte';
	export let loan: Loan;
</script>

<a href="/loans/{loan.loanId}">
	<div
		class="loan-widget rounded-lg border-[1.5px] border-light-border p-6 dark:border-dark-border"
	>
		<div class="mb-2 flex items-center justify-between text-xs font-thin">
			<span>Loan ID: {loan.loanId}</span>
			<span>{loan.loanType}</span>
		</div>
		<h3 class="mb-2 text-lg font-medium">{loan.loanTitle}</h3>
		<p class="mb-4 line-clamp-4 h-[80px] overflow-hidden text-sm">
			{loan.loanDescription}
		</p>
		<ul class="mb-4 space-y-2 text-sm">
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
		<div class="mb-4">
			<div class="mb-1 flex items-center justify-between text-sm">
				<span class="font-thin">Funding Goal:</span>
				<span class="font-medium">{loan.fundingGoal}</span>
			</div>
			<div class="h-2 w-full overflow-hidden rounded-full bg-[#0001] dark:bg-[#fff1]">
				<div class="h-full bg-green-400" style="width: {loan.fundedPercentage}%"></div>
			</div>
			<div class="mt-1 flex items-center justify-between text-sm">
				<span class="text-green-500">{loan.fundedAmount} funded</span>
				<span class="font-normal">{loan.daysLeft} Days Left</span>
			</div>
		</div>
		<p class="text-xs font-thin">Created by: {loan.creator}</p>
	</div>
</a>
