<script lang="ts">
	import type { Loan } from '../data/DummyLoans';
	export let loan: Loan;
</script>

<a href="/loans/{loan.loanId}">
	<div class="loan-widget rounded-lg border border-gray-300 bg-[var(--bg-color)] p-6 shadow">
		<div class="mb-2 flex items-center justify-between">
			<span class="text-sm text-gray-500">{loan.loanId}</span>
			<span class="text-sm font-semibold text-[var(--text-color)]">{loan.loanType}</span>
		</div>
		<h3 class="mb-2 text-lg font-semibold text-[var(--text-color)]">{loan.loanTitle}</h3>
		<p class="mb-4 line-clamp-4 h-[80px] overflow-hidden text-sm text-gray-600">
			{loan.loanDescription}
		</p>
		<ul class="mb-4 space-y-2 text-sm text-[var(--text-color)]">
			<li class="flex items-center">
				<svg
					class="mr-2 h-5 w-5 text-gray-500"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path
						d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h6v-2h-4z"
					/>
				</svg>
				<span>{loan.repaymentPeriod}</span>
			</li>
			<li class="flex items-center">
				<svg
					class="mr-2 h-5 w-5 text-gray-500"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path
						d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-.5 13h-2v-2h2v2zm0-4h-2V7h2v4z"
					/>
				</svg>
				<span>{loan.interestRate}</span>
			</li>
		</ul>
		<div class="mb-4">
			<div class="mb-1 flex items-center justify-between text-sm">
				<span>Funding Goal:</span>
				<span class="font-semibold text-[var(--text-color)]">{loan.fundingGoal}</span>
			</div>
			<div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
				<div class="h-full bg-green-500" style="width: {loan.fundedPercentage}%"></div>
			</div>
			<div class="mt-1 flex items-center justify-between text-sm">
				<span class="text-green-600">{loan.fundedAmount}</span>
				<span class="text-gray-600">{loan.daysLeft} Days Left</span>
			</div>
		</div>
		<p class="text-sm text-gray-500">Created by: {loan.creator}</p>
	</div>
</a>
