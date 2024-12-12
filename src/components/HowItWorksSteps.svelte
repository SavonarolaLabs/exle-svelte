<script lang="ts">
	import { base } from '$app/paths';
	const steps = [
		{
			number: '1',
			title: 'Create your loan request',
			description:
				'Fill out the loan form with relevant information and pay 0.1 ERG to create your loan.',
			gif: 'system-regular-50-file.gif'
		},
		{
			number: '2',
			title: 'Wait for your loan to get crowdfunded',
			description:
				'Our community members will fund your loan request as they see fit during the funding period.',
			gif: 'system-regular-67-clock.gif'
		},
		{
			number: '3',
			title: 'Withdraw your funded loan',
			description:
				'After your loan is fully funded, you can withdraw your funds and your repayment period begins.',
			gif: 'system-regular-5-wallet.gif'
		}
	];
</script>

<div class="md:flex justify-center gap-8 p-6">
	{#each steps as step}
		<div class="flex max-w-sm flex-col items-start gap-2">
			<div class="flex items-center gap-4">
				<img src="{base}/{step.gif}" alt="" class="w-9 dark:invert" />
				<span class="text-6xl font-bold text-gray-200">{step.number}</span>
			</div>
			<h3 class="text-lg font-bold">{step.title}</h3>
			<p class="text-gray-600">{step.description}</p>
		</div>
	{/each}
</div>
