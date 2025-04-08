<script lang="ts">
	import { Info } from 'lucide-svelte';
	import Header from './loan/create/Header.svelte';
	import { is_dark } from '../stores/ui';
	import Button from './Button.svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	function goBack() {
		history.length > 1 ? history.back() : goto('/');
	}

	let currentStep = 1;
	let selectedLoanType: 'Crowdloan' | 'Solofund loan' | null = null;
	let isWalletConfirmed = false;
	let loanTitle = '';
	let loanDescription = '';
	let loanToken = 'SigUSD';
	let fundingGoal = '';
	let fundingDeadline = '';
	let interestRate = '';
	let repaymentPeriod = '';
	let termsAccepted = false;
	let paymentConfirmed = false;

	function handleContinue() {
		if (currentStep === 1 && selectedLoanType && isWalletConfirmed) {
			currentStep++;
		} else if (currentStep === 2 && loanTitle && loanDescription) {
			currentStep++;
		} else if (
			currentStep === 3 &&
			loanToken &&
			fundingGoal &&
			fundingDeadline &&
			interestRate &&
			repaymentPeriod
		) {
			currentStep++;
		} else if (currentStep === 4 && termsAccepted) {
			currentStep++;
		}
	}

	function handleGoBack() {
		if (currentStep > 1) {
			currentStep--;
		}
	}

	function handleFinalizePayment() {
		paymentConfirmed = true;
	}
</script>

<div class="mx-auto w-full max-w-2xl rounded-lg p-6 pt-8">
	{#if currentStep === 1}
		<!-- Step 1 Content -->
		<div>
			<Header {currentStep}></Header>

			<div class="mb-8">
				<p class="mb-4 text-xs">What type of loan do you want to take?</p>
				<div class="flex space-x-4">
					<!-- Crowdloan Button -->
					<button
						type="button"
						class="w-full rounded-lg border p-4 text-left transition"
						class:border-dark-accent={selectedLoanType === 'Crowdloan'}
						class:bg-dark-accent={selectedLoanType === 'Crowdloan'}
						class:text-white={selectedLoanType === 'Crowdloan'}
						class:border-dark-border={$is_dark && selectedLoanType !== 'Crowdloan'}
						class:border-light-border={!$is_dark && selectedLoanType !== 'Crowdloan'}
						on:click={() => (selectedLoanType = 'Crowdloan')}
					>
						<p class="mb-4 text-md font-semibold">Crowdloan</p>
						<p>Multiple people can contribute to fund a crowdloan.</p>
					</button>

					<!-- Solofund Button -->
					<button
						type="button"
						class="w-full rounded-lg border p-4 text-left transition"
						class:border-dark-accent={selectedLoanType === 'Solofund loan'}
						class:bg-dark-accent={selectedLoanType === 'Solofund loan'}
						class:text-white={selectedLoanType === 'Solofund loan'}
						class:border-dark-border={$is_dark && selectedLoanType !== 'Solofund loan'}
						class:border-light-border={!$is_dark && selectedLoanType !== 'Solofund loan'}
						on:click={() => (selectedLoanType = 'Solofund loan')}
					>
						<p class="font-medium">Solofund loan</p>
						<p>Only one person can contribute to fund a solofund loan.</p>
					</button>
				</div>
			</div>

			<div class="mb-8">
				<label class="flex items-start space-x-2">
					<input
						type="checkbox"
						bind:checked={isWalletConfirmed}
						class="h-4 w-4 rounded border-gray-300 text-blue-600"
					/>
					<span>
						I confirm this is my wallet address:<br />
						<span class="font-bold">9fVx8HL3trmJ27ARGhibDVX13PssroaUMN1DH2reyS4daEXDrL</span><br /> (Loaned
						funds will be sent to this address)
					</span>
				</label>
			</div>

			<div class="mb-10 flex gap-2">
				<div>
					<Info size="18px"></Info>
				</div>
				<div>
					<span class="font-semibold">Loan creation fee</span> <br />
					There’s a 0.1 ERG fee for creating your loan.
				</div>
			</div>

			<div class="flex justify-between">
				<Button onClick={goBack} label="Cancel" variant="secondary" />

				<Button
					onClick={handleContinue}
					label="Continue"
					variant="secondary"
					disabled={!selectedLoanType || !isWalletConfirmed}
				/>
			</div>
		</div>
	{/if}

	{#if currentStep === 2}
		<!-- Step 2 Content -->
		<div>
			<Header {currentStep}></Header>

			<div class="mb-6">
				<label for="loan-title" class="block font-medium text-gray-700"> Loan Title </label>
				<input
					id="loan-title"
					type="text"
					bind:value={loanTitle}
					placeholder="Give your loan a meaningful title"
					class="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>

			<div class="mb-6">
				<label for="loan-description" class="block font-medium text-gray-700">
					Loan Description
				</label>
				<textarea
					id="loan-description"
					bind:value={loanDescription}
					placeholder="Provide some details and description for your loan..."
					class="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
					rows="4"
				></textarea>
			</div>

			<div class="flex justify-between">
				<button
					type="button"
					on:click={handleGoBack}
					class="rounded border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
				>
					Go back
				</button>
				<button
					type="button"
					on:click={handleContinue}
					class="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-300"
					disabled={!loanTitle || !loanDescription}
				>
					Continue
				</button>
			</div>
		</div>
	{/if}

	{#if currentStep === 3}
		<!-- Step 3 Content -->
		<div>
			<Header {currentStep}></Header>

			<div class="mb-6">
				<label for="loan-token" class="block font-medium text-gray-700"> Loan Token </label>
				<div class="relative mt-2">
					<select
						id="loan-token"
						bind:value={loanToken}
						class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
					>
						<option value="SigUSD">SigUSD</option>
						<option value="OtherToken">Other Token</option>
					</select>
				</div>
				<p class="mt-1 text-gray-500">(Token to borrow for this loan)</p>
			</div>

			<div class="mb-6">
				<label for="funding-goal" class="block font-medium text-gray-700"> Funding Goal </label>
				<div class="mt-2 flex">
					<input
						id="funding-goal"
						type="number"
						bind:value={fundingGoal}
						placeholder="Amount to be raised for this loan"
						class="w-full rounded-l-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
					/>
					<span
						class="flex items-center rounded-r-lg border-b border-r border-t border-gray-300 px-4 text-gray-700"
					>
						$
					</span>
				</div>
			</div>

			<div class="mb-6">
				<label for="funding-deadline" class="block font-medium text-gray-700">
					Funding Deadline
				</label>
				<div class="mt-2 flex">
					<input
						id="funding-deadline"
						type="number"
						bind:value={fundingDeadline}
						placeholder="Provide a deadline for this loan to be funded"
						class="w-full rounded-l-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
					/>
					<span
						class="flex items-center rounded-r-lg border-b border-r border-t border-gray-300 px-4 text-gray-700"
					>
						Months
					</span>
				</div>
			</div>

			<div class="mb-6">
				<label for="interest-rate" class="block font-medium text-gray-700"> Interest Rate </label>
				<div class="mt-2 flex">
					<input
						id="interest-rate"
						type="number"
						bind:value={interestRate}
						placeholder="Enter the interest rate for this loan"
						class="w-full rounded-l-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
					/>
					<span
						class="flex items-center rounded-r-lg border-b border-r border-t border-gray-300 px-4 text-gray-700"
					>
						%
					</span>
				</div>
			</div>

			<div class="mb-6">
				<label for="repayment-period" class="block font-medium text-gray-700">
					Repayment Period
				</label>
				<div class="mt-2 flex">
					<input
						id="repayment-period"
						type="number"
						bind:value={repaymentPeriod}
						placeholder="Provide a repayment period for this loan"
						class="w-full rounded-l-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
					/>
					<span
						class="flex items-center rounded-r-lg border-b border-r border-t border-gray-300 px-4 text-gray-700"
					>
						Months
					</span>
				</div>
			</div>

			<div class="flex justify-between">
				<button
					type="button"
					on:click={handleGoBack}
					class="rounded border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
				>
					Go back
				</button>
				<button
					type="button"
					on:click={handleContinue}
					class="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-300"
					disabled={!loanToken ||
						!fundingGoal ||
						!fundingDeadline ||
						!interestRate ||
						!repaymentPeriod}
				>
					Continue
				</button>
			</div>
		</div>
	{/if}

	{#if currentStep === 4}
		<!-- Step 4 Content -->
		<div>
			<Header {currentStep}></Header>

			<div class="mb-6 space-y-4">
				<p>
					<strong>Loan Title:</strong>
					{loanTitle}
				</p>
				<p>
					<strong>Loan Description:</strong>
					{loanDescription}
				</p>
				<p>
					<strong>Borrower’s Address:</strong>
					9fVx8HL3trmJ27ARGhibDVX13PssroaUMN1DH2reyS4daEXDrL
				</p>
				<p>
					<strong>Funding Goal:</strong>
					{fundingGoal}
					{loanToken}
				</p>
				<p>
					<strong>Loan Type:</strong>
					{selectedLoanType}
				</p>
				<p>
					<strong>Funding Deadline:</strong> Around {fundingDeadline} days /
					{+fundingDeadline * 1000} Blocks (Time is based on block)
				</p>
				<p>
					<strong>Interest Rate:</strong>
					{interestRate}%
				</p>
				<p>
					<strong>Repayment Period:</strong> Around {repaymentPeriod} days /
					{+repaymentPeriod * 1000} Blocks (Time is based on block)
				</p>
			</div>

			<div class="mb-6">
				<div class="rounded-lg border p-4 text-gray-700">
					<ul class="list-disc space-y-2 pl-6">
						<li>Creating or participating in loans is not illegal in your country.</li>
						<li>
							You are over the legal age required to use financial services such as funding loans
							and are not funding loans on behalf of an underage person or anyone who is not legally
							allowed to fund a loan.
						</li>
						<li>
							You are solely responsible for all legal or moral obligations and liabilities, and the
							service does not have any obligations or liabilities.
						</li>
						<li>
							You understand that there is a risk that the loan is not repaid and EXLE is not liable
							to any of the loss incurred.
						</li>
						<li>You are solely responsible for any due taxes and legal reports.</li>
						<li>I promise to repay what I owe.</li>
					</ul>
				</div>
				<div class="mt-4">
					<label class="flex items-start space-x-2">
						<input
							type="checkbox"
							bind:checked={termsAccepted}
							class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<span>I agree to the terms of use</span>
					</label>
				</div>
			</div>

			<div class="flex justify-between">
				<button
					type="button"
					on:click={handleGoBack}
					class="rounded border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
				>
					Go back
				</button>
				<button
					type="button"
					on:click={handleContinue}
					class="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-300"
					disabled={!termsAccepted}
				>
					Continue
				</button>
			</div>
		</div>
	{/if}

	{#if currentStep === 5 && !paymentConfirmed}
		<!-- Payment & Finalize -->
		<div>
			<Header {currentStep}></Header>

			<div class="mb-6">
				<p class="text-gray-700">
					In order to finalize your loan, you need to make a 0.1 ERGO ($0.15) payment on your
					wallet. Your loan will be created after the payment transaction has finalized.
				</p>
			</div>

			<div class="mb-6 rounded-lg border p-6 text-center">
				<img src="/nautilus-logo.png" alt="Nautilus Wallet" class="mx-auto mb-4 h-20 w-20" />
				<p class="mb-2 font-medium text-gray-700">Nautilus Wallet</p>
				<p class=" text-gray-500">Pay via browser wallet</p>
			</div>

			<div class="flex justify-between">
				<button
					type="button"
					on:click={handleGoBack}
					class="rounded border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
				>
					Cancel
				</button>
				<button
					type="button"
					on:click={handleFinalizePayment}
					class="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
				>
					Pay via browser wallet
				</button>
			</div>
		</div>
	{/if}

	{#if currentStep === 5 && paymentConfirmed}
		<!-- Payment Confirmation -->
		<div class="text-center">
			<Header {currentStep}></Header>

			<div class="mb-6">
				<div class="mb-4 flex justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-16 w-16 text-green-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2l4 -4m-7 8a9 9 0 100-18 9 9 0 000 18z"
						/>
					</svg>
				</div>
				<p class="text-gray-700">
					Your transaction has been confirmed and your loan is created. You can view it by clicking
					on the button below:
				</p>
			</div>

			<button
				type="button"
				class="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
			>
				Take me to the loan page
			</button>
		</div>
	{/if}
</div>
