<script>
	import { base } from '$app/paths';

	import Button from '../components/Button.svelte';
	import ErgoManifesto from '../components/ErgoManifesto.svelte';
	import ExlePartners from '../components/ExlePartners.svelte';
	import HowItWorksSteps from '../components/HowItWorksSteps.svelte';
	import Roadmap from '../components/Roadmap.svelte';
	import WhatDistinguishesExle from '../components/WhatDistinguishesExle.svelte';
</script>

<section class="space-y-8">
	<h1
		class="mt-24 bg-gradient-to-r from-light-gradientStart to-light-gradientEnd bg-clip-text py-1 text-5xl font-bold leading-[1.2] text-transparent dark:from-dark-gradientStart dark:to-dark-gradientEnd"
	>
		Borrow and lend money<br /> globally on Ergo chain
	</h1>

	<p>
		A person-to-person (P2P) lending platform with easy-to-use<br /> tools to borrow and lend money on
		the Ergo blockchain.
	</p>
	<div class="flex space-x-4">
		<Button href="{base}/loans/create" label="Create loan" variant="primary" />
		<Button href="{base}/learn-more" label="Learn more" variant="secondary" />
	</div>
	<div class="relative" style="max-width:522px;">
		<img class="mt-4" src="{base}/globe.png" alt="" />
		<h2 class="absolute bottom-0 left-1/2 -translate-x-1/2 transform whitespace-nowrap">
			How does it work?
		</h2>
	</div>
</section>
<section>
	<div class="mt-20"></div>
	<HowItWorksSteps></HowItWorksSteps>
	<div class="my-20"></div>
	<ErgoManifesto></ErgoManifesto>
	<div class="my-20"></div>
	<WhatDistinguishesExle></WhatDistinguishesExle>
	<div class="my-20"></div>
	<ExlePartners></ExlePartners>
	<div class="my-20"></div>
	<Roadmap></Roadmap>
</section>
<div style="margin-bottom: 100vh"></div>

<style lang="postcss">
	section {
		@apply flex w-full flex-col items-center text-center;
	}
</style>
