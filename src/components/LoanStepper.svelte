<script lang="ts">
	import { Info } from 'lucide-svelte';
	import Header from './loan/create/Header.svelte';
	import { change_address, createSolofundLoanTokens, is_dark } from '../stores/ui';
	import Button from './Button.svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import Nautilus from '../icons/Nautilus.svelte';
	import Check from '../icons/Check.svelte';
	import { tokenByTicker, type CreateLendInputParams } from '$lib/exle/exle';

	import { BLOCKS_PER_DAY, shortenAddress, toErgoBlocks } from '$lib/utils';

	function goBack() {
		history.length > 1 ? history.back() : goto('/');
	}

	let currentStep = 4;
	let selectedLoanType: 'Crowdloan' | 'Solofund' | null = null;
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

	async function handleFinalizePayment() {
		const token = tokenByTicker(loanToken)!;
		const userInput: CreateLendInputParams = {
			loanType: 'Solofund',
			project: [loanTitle, loanDescription],
			loanTokenId: token.tokenId,
			fundingGoal: BigInt(Math.floor(Number(fundingGoal) * 10 ** token.decimals)),
			interestRate: BigInt(Math.floor(Number(fundingGoal) * 10)),

			fundingDeadlineLength: BigInt(toErgoBlocks(Math.floor(Number(fundingDeadline)), 'Months')),
			repaymentHeightLength: BigInt(toErgoBlocks(Math.floor(Number(repaymentPeriod)), 'Months')),
			borrowerAddress: $change_address
		};

		const submittedTxId = await createSolofundLoanTokens(userInput);

		if (submittedTxId) {
			paymentConfirmed = true;
		}
	}
</script>

<div class="mx-auto flex w-full max-w-2xl grow rounded-lg p-6 pt-8 text-sm">
	{#if currentStep === 1}
		<!-- Step 1 Content -->
		<div>
			<Header {currentStep}></Header>

			<div class="mb-8">
				<p class="mb-4">What type of loan do you want to take?</p>
				<div class="flex gap-4 max-md:flex-col">
					<!-- Crowdloan Button -->
					<button
						type="button"
						class="w-full rounded-lg border-2 p-4 text-left transition"
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
						class="w-full rounded-lg border-2 p-4 text-left transition"
						class:border-dark-accent={selectedLoanType === 'Solofund'}
						class:bg-dark-accent={selectedLoanType === 'Solofund'}
						class:text-white={selectedLoanType === 'Solofund'}
						class:border-dark-border={$is_dark && selectedLoanType !== 'Solofund'}
						class:border-light-border={!$is_dark && selectedLoanType !== 'Solofund'}
						on:click={() => (selectedLoanType = 'Solofund')}
					>
						<p class="mb-4 text-md font-semibold">Solofund</p>
						<p>Only one person can contribute to fund a Solofund.</p>
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
					<div class="max-w-full">
						<span>
							I confirm this is my wallet address:<br />
							<div class="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold">
								{shortenAddress($change_address)}
							</div>
							(Loaned funds will be sent to this address)
						</span>
					</div>
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

			<div class="flex justify-between gap-4 max-md:flex-col-reverse">
				<Button onClick={goBack} label="Cancel" variant="secondary" />

				<Button
					onClick={handleContinue}
					label="Continue"
					variant="primary"
					disabled={!selectedLoanType || !isWalletConfirmed}
				/>
			</div>
		</div>
	{/if}

	{#if currentStep === 2}
		<!-- Step 2 Content -->
		<div class="w-full">
			<Header {currentStep}></Header>

			<div class="mb-6">
				<label for="loan-title" class="block text-sm font-medium"> Loan Title </label>
				<input
					id="loan-title"
					type="text"
					bind:value={loanTitle}
					placeholder="Give your loan a meaningful title "
					class="mt-2 w-full rounded-lg border-2 border-light-border bg-transparent p-3 text-sm dark:border-dark-border"
				/>
			</div>

			<div class="mb-6">
				<label for="loan-description" class="block text-sm font-medium"> Loan Description </label>
				<textarea
					id="loan-description"
					bind:value={loanDescription}
					placeholder="Provide some details and description for your loan..."
					class="mt-2 w-full rounded-lg border-2 border-light-border bg-transparent p-3 text-sm dark:border-dark-border"
					rows="4"
				></textarea>
			</div>

			<div class="flex justify-between gap-4 max-md:flex-col-reverse">
				<Button onClick={handleGoBack} label="Go back" variant="secondary" />

				<Button
					onClick={handleContinue}
					label="Continue"
					variant="secondary"
					disabled={!loanTitle || !loanDescription}
				/>
			</div>
		</div>
	{/if}

	{#if currentStep === 3}
		<!-- Step 3 Content -->
		<div class="w-full">
			<Header {currentStep}></Header>

			<div class="mb-6">
				<label for="loan-token" class="block font-medium"> Loan Token </label>
				<div class="relative mt-2">
					<select
						id="loan-token"
						bind:value={loanToken}
						class="w-full rounded-lg border-2 border-light-border bg-transparent p-3 dark:border-dark-border"
					>
						<option value="SigUSD">SigUSD</option>
						<option value="ERG">ERG</option>
					</select>
				</div>
				<p class="mt-1 opacity-50 max-md:text-xs">(Token to borrow for this loan)</p>
			</div>

			<div class="mb-6">
				<label for="funding-goal" class="block font-medium"> Funding Goal </label>
				<div class="mt-2 flex">
					<div class="relative w-full">
						<input
							id="funding-goal"
							type="number"
							bind:value={fundingGoal}
							placeholder="Amount to be raised for this loan"
							class="w-full rounded-lg border-2 border-light-border bg-transparent p-3 pr-12 text-sm placeholder:text-sm placeholder:opacity-0 dark:border-dark-border md:placeholder:opacity-100"
						/>
						<span class="absolute inset-y-0 right-0 flex items-center px-4"> {loanToken} </span>
					</div>
				</div>
				<div class="mt-1 text-xs opacity-50 md:hidden">Amount to be raised for this loan</div>
			</div>

			<div class="mb-6">
				<label for="funding-deadline" class="block font-medium"> Funding Deadline </label>
				<div class="mt-2 flex">
					<div class="relative w-full">
						<input
							id="funding-deadline"
							type="number"
							bind:value={fundingDeadline}
							placeholder="Provide a deadline for this loan to be funded"
							class="w-full rounded-lg border-2 border-light-border bg-transparent p-3 pr-12 text-sm placeholder:text-sm placeholder:opacity-0 dark:border-dark-border md:placeholder:opacity-100"
						/>
						<span class="absolute inset-y-0 right-0 flex items-center px-4">Months</span>
					</div>
				</div>
				<div class="mt-1 text-xs opacity-50 md:hidden">
					Provide a deadline for this loan to be funded
				</div>
			</div>

			<div class="mb-6">
				<label for="interest-rate" class="block font-medium"> Interest Rate </label>
				<div class="mt-2 flex">
					<div class="relative w-full">
						<input
							id="interest-rate"
							type="number"
							bind:value={interestRate}
							placeholder="Enter the interest rate for this loan"
							class="w-full rounded-lg border-2 border-light-border bg-transparent p-3 pr-12 text-sm placeholder:text-sm placeholder:opacity-0 dark:border-dark-border md:placeholder:opacity-100"
						/>
						<span class="absolute inset-y-0 right-0 flex items-center px-4">%</span>
					</div>
				</div>
				<div class="mt-1 text-xs opacity-50 md:hidden">Enter the interest rate for this loan</div>
			</div>

			<div class="mb-6">
				<label for="repayment-period" class="block font-medium"> Repayment Period </label>
				<div class="mt-2 flex">
					<div class="relative w-full">
						<input
							id="repayment-period"
							type="number"
							bind:value={repaymentPeriod}
							placeholder="Provide a repayment period for this loan"
							class="w-full rounded-lg border-2 border-light-border bg-transparent p-3 pr-12 text-sm placeholder:text-sm placeholder:opacity-0 dark:border-dark-border md:placeholder:opacity-100"
						/>
						<span class="absolute inset-y-0 right-0 flex items-center px-4">Months</span>
					</div>
				</div>
				<div class="mt-1 text-xs opacity-50 md:hidden">
					Provide a repayment period for this loan
				</div>
			</div>

			<div class="flex justify-between gap-4 max-md:flex-col-reverse">
				<Button onClick={handleGoBack} label="Go back" variant="secondary" />

				<Button
					onClick={handleContinue}
					label="Continue"
					variant="primary"
					disabled={!loanToken ||
						!fundingGoal ||
						!fundingDeadline ||
						!interestRate ||
						!repaymentPeriod}
				/>
			</div>
		</div>
	{/if}

	{#if currentStep === 4}
		<!-- Step 4 Content -->
		<div class="w-full">
			<Header {currentStep}></Header>

			<div class="mb-6 space-y-4">
				<div>
					<div class="opacity-50">Loan Title:</div>
					{loanTitle}
				</div>
				<div>
					<div class="opacity-50">Loan Description:</div>
					{loanDescription}
				</div>
				<div>
					<div class="opacity-50">Borrower’s Address:</div>
					<div class="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
						{shortenAddress($change_address)}
					</div>
				</div>
				<div>
					<div class="opacity-50">Funding Goal:</div>
					{fundingGoal}
					{loanToken}
				</div>
				<div>
					<div class="opacity-50">Loan Type:</div>
					{selectedLoanType}
				</div>
				<div>
					<div class="opacity-50">Funding Deadline:</div>
					Around {fundingDeadline} months / {+fundingDeadline * BLOCKS_PER_DAY * 30} Blocks (Time is
					based on block)
				</div>
				<div>
					<div class="opacity-50">Interest Rate:</div>
					{interestRate}%
				</div>
				<div>
					<div class="opacity-50">Repayment Period:</div>
					Around {repaymentPeriod} months / {+repaymentPeriod * BLOCKS_PER_DAY * 30} Blocks (Time is
					based on block)
				</div>
			</div>

			<div class="mb-6">
				<div class="rounded-lg border-2 border-light-border p-4 dark:border-dark-border">
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

			<div class="flex justify-between gap-4 max-md:flex-col-reverse">
				<Button onClick={handleGoBack} label="Go back" variant="secondary" />

				<Button
					onClick={handleContinue}
					label="Continue"
					variant="primary"
					disabled={!termsAccepted}
				/>
			</div>
		</div>
	{/if}

	{#if currentStep === 5 && !paymentConfirmed}
		<!-- Payment & Finalize -->
		<div class="w-full">
			<Header {currentStep}></Header>

			<div class="mb-6">
				<p class="max-w-[400px]">
					In order to finalize your loan, you need to make a 0.1 ERG payment on your wallet. Your
					loan will be created after the payment transaction has finalized.
				</p>
			</div>

			<div class="mb-6 flex flex-col items-center rounded-lg border text-center">
				<p class="my-6 font-medium">Pay via browser wallet</p>
				<Nautilus></Nautilus>
				<p class="mb-10 mt-2 text-lg font-medium">Nautilus Wallet</p>
			</div>

			<div class="flex justify-between gap-4 max-md:flex-col-reverse">
				<Button onClick={goBack} label="Cancel" variant="secondary" />

				<Button onClick={handleFinalizePayment} label="Pay via browser wallet" variant="primary" />
			</div>
		</div>
	{/if}

	{#if currentStep === 5 && paymentConfirmed}
		<!-- Payment Confirmation -->
		<div class="flex flex-grow flex-col text-center">
			<Header {currentStep}></Header>
			<div class="flex flex-grow flex-col items-center justify-center md:mb-20">
				<div class="mb-4 flex justify-center">
					<Check></Check>
				</div>
				<p class="mb-8 max-w-[320px] text-xs">
					Your transaction has been confirmed and your loan is created. You can view it by clicking
					on the button below:
				</p>
				<Button href="{base}/loans" label="Take me to the loan page" variant="primary" />
			</div>
		</div>
	{/if}
</div>
