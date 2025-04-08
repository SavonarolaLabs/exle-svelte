<script lang="ts">
	import StepCircle from '../../../icons/StepCircle.svelte';
	export let currentStep = 1;
</script>

<div class="mb-6 flex items-center justify-between">
	<div>
		<h2 class="text-xs font-semibold">Step {currentStep}/5</h2>
		<p class="mt-2 text-lg font-semibold">
			{#if currentStep === 1}
				Choose Loan Type
			{:else if currentStep === 2}
				Basic Loan Info
			{:else if currentStep === 3}
				Loan Funding Details
			{:else if currentStep === 4}
				Review Loan
			{:else if currentStep === 5}
				Payment & Finalize
			{/if}
		</p>
	</div>
	<div>
		<StepCircle step={currentStep}></StepCircle>
	</div>
</div>
