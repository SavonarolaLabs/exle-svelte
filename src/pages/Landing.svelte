<script>
	import { base } from '$app/paths';

	import Button from '../components/Button.svelte';
	import CommunityTestimonial from '../components/CommunityTestimonial.svelte';
	import ErgoManifesto from '../components/ErgoManifesto.svelte';
	import ErgoManifestoMobile from '../components/ErgoManifestoMobile.svelte';
	import ExlePartners from '../components/ExlePartners.svelte';
	import HowItWorksSteps from '../components/HowItWorksSteps.svelte';
	import Roadmap from '../components/Roadmap.svelte';
	import WhatDistinguishesExle from '../components/WhatDistinguishesExle.svelte';
	import {
		createCrowdfundLoanTokens,
		createSolofundLoanTokens,
		fundCrowdfundLoanTokens,
		fundLoanWithCrowdBoxTokens,
		fundRepaymentTokens,
		withdrawLendTokensTx
	} from '../stores/ui';
</script>

<section class="space-y-6 md:space-y-8">
	<img class="absolute mt-4 w-[85%] max-w-[350px] md:hidden" src="{base}/globe.png" alt="" />
	<div class="h-[180px] md:h-[50px]"></div>
	<h1
		class="mt-24 bg-gradient-to-r from-light-gradientStart to-light-gradientEnd bg-clip-text py-1 text-4xl font-bold leading-[1.2] text-transparent dark:from-dark-gradientStart dark:to-dark-gradientEnd md:py-2 md:text-5xl"
	>
		Borrow and lend money<br class="hidden md:block" /> globally on Ergo chain
	</h1>

	<p class="mt-1 px-4 max-md:text-sm md:px-0">
		A person-to-person (P2P) lending platform with easy-to-use<br class="hidden md:block" /> tools to
		borrow and lend money on the Ergo blockchain.
	</p>
	<div
		class="flex w-full flex-col justify-center space-y-4 px-3 md:flex-row md:space-x-4 md:space-y-0 md:px-0"
	>
		<Button href="{base}/loans/create" label="Create loan" variant="primary" />
		<Button href="{base}/learn-more" label="Learn more" variant="primary-outline" />
	</div>
	<div
		class="flex w-full flex-col justify-center space-y-4 px-3 md:flex-row md:space-x-4 md:space-y-0 md:px-0"
	>
		<Button onClick={() => createSolofundLoanTokens()} label="Create Solofund Loan (TOKENS)" />
		<Button onClick={() => createCrowdfundLoanTokens()} label="Create Crowdfund Loan (TOKENS)" />
		<Button onClick={fundCrowdfundLoanTokens} label="FUND Crowdfund Loan (TOKENS)" />
		<Button onClick={fundLoanWithCrowdBoxTokens} label="FUND Loan with CrowdFundBox (TOKENS)" />
		<Button
			onClick={() => withdrawLendTokensTx()}
			label="Withdraw Lend (+ Lend => Repayment)(TOKENS)"
		/>
		<Button onClick={fundRepaymentTokens} label="Fund Repayment(TOKENS)" />
	</div>

	<div class="relative" style="max-width:522px;">
		<img class="mt-4 hidden md:block" src="{base}/globe.png" alt="" />
		<div class="block h-[100px] md:hidden"></div>
		<h2
			class="absolute bottom-0 left-1/2 -translate-x-1/2 transform whitespace-nowrap text-3xl md:text-4xl"
		>
			How does it work?
		</h2>
	</div>
</section>
<section class="">
	<div class="mt-10 md:mt-20"></div>
	<HowItWorksSteps></HowItWorksSteps>
	<div class="my-20"></div>
	<div class="hidden md:block">
		<ErgoManifesto></ErgoManifesto>
	</div>
	<div class="block md:hidden">
		<ErgoManifestoMobile></ErgoManifestoMobile>
	</div>
	<div class="my-20"></div>
	<WhatDistinguishesExle></WhatDistinguishesExle>
	<div class="my-12 md:my-20"></div>
	<CommunityTestimonial></CommunityTestimonial>
	<div class="my-20"></div>
	<ExlePartners></ExlePartners>
	<div class="my-20"></div>
	<Roadmap></Roadmap>
</section>

<style lang="postcss">
	section {
		@apply flex w-full flex-col items-center text-center;
	}
</style>
