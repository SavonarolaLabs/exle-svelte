<script lang="ts">
	import type { Loan } from '../../data/DummyLoans';
	import Clock from '../../icons/Clock.svelte';
	import InterestRate from '../../icons/InterestRate.svelte';
	import ArrowCicleRight from '../../icons/ArrowCicleRight.svelte';
	import Button from '../Button.svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	export let loan: Loan;

	let amount = '';

	function goBack() {
		history.length > 1 ? history.back() : goto('/');
	}

	function onButtonClick() {}
</script>

<div class="mb-8 mt-10 max-xl:px-4">
	<button on:click={goBack}><ArrowCicleRight></ArrowCicleRight></button>
</div>
<div class="flex max-xl:flex-col max-xl:px-4 xl:gap-20">
	<div class="xl:w-1/2">
		<div class="mb-2 flex items-center justify-between text-xs font-thin">
			<div>
				<span>Loan ID: {loan.loanId}</span>
				<h3 class="mb-3 text-xl font-medium">{loan.loanTitle}</h3>
			</div>
			<span class="rounded-md bg-gray-100 px-2 py-[4px] text-sm dark:bg-dark-gray"
				>{loan.loanType}</span
			>
		</div>

		<p class="mb-5 line-clamp-4 h-[90px] overflow-hidden text-sm font-light leading-relaxed">
			{loan.loanDescription}
		</p>
		<p class="font-thin">Borrower:</p>
		<p class="font-thin">{loan.creator}</p>

		<ul class="my-5 space-y-4 text-sm">
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
	</div>
	<div class="mb-5 xl:w-1/2">
		<div class="mb-2 flex items-center justify-between text-sm">
			<span class="font-thin">
				{#if loan.phase == 'loan'}
					Funding Goal:
				{:else}
					Total Repayment:
				{/if}
			</span>
			<span class="text-lg font-semibold">{loan.fundingGoal} {loan.fundingToken}</span>
		</div>

		<div class="h-[10px] w-full overflow-hidden rounded-full bg-[#0001] dark:bg-[#fff1]">
			<div
				class="h-full"
				class:bg-green-400={loan.phase == 'loan'}
				class:bg-indigo-600={loan.phase == 'repayment'}
				style="width: {loan.fundedPercentage}%"
			></div>
		</div>
		<div class="mt-2 flex items-center justify-between text-sm">
			<span
				class:text-green-500={loan.phase == 'loan'}
				class:text-indigo-600={loan.phase == 'repayment'}
				>{loan.fundedAmount}
				{#if loan.phase == 'loan'}
					funded
				{:else}
					repaid
				{/if}
			</span>
			<span class="font-normal">{loan.daysLeft} Days Left</span>
		</div>
		<div class="mb-4 mt-10 text-xl font-medium">Fund this loan</div>
		{#if loan.loanType == 'Solofund'}
			<div>You can help fund this loan. Solofund loans can only be fully funded by one person.</div>
		{:else}
			<div>You can help fund this loan partially or fully.</div>
		{/if}
		<div class="mb-2 mt-8">Amount</div>
		<div class="relative mb-10 w-full">
			<input
				id="interest-rate"
				type="number"
				placeholder={loan.loanType == 'Solofund' ? loan.fundingGoal : ''}
				bind:value={amount}
				class=" w-full rounded-xl border-2 border-[#e5e5eb] dark:border-dark-border"
			/>
			<span class="absolute inset-y-0 right-0 flex items-center px-4">$</span>
		</div>
		<Button
			onClick={onButtonClick}
			label={loan.phase == 'loan' ? 'Fund the loan' : 'Repay the loan'}
			variant="primary"
			disabled={!amount}
			w100={true}
		/>
		<div class="mt-6 text-xs font-thin">
			By clicking on “Fund the loan” button, you agree to our <a href="{base}/tos" class="underline"
				>terms of service</a
			>.
		</div>
	</div>
</div>
