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

<div class="flex w-full flex-wrap justify-center justify-between text-left">
	{#each steps as step}
		<div class="relative" style="max-width: 240px;">
			<span
				class="absolute left-0 top-8 -z-10 text-[7rem] font-bold text-light-neutral dark:text-dark-neutral"
			>
				{step.number}
			</span>
			<div
				class="flex flex-col gap-2"
				class:pl-6={step.number == '1'}
				class:pl-9={step.number == '2' || step.number == '3'}
			>
				<div class="flex items-center gap-4" style="margin-left:-3px;">
					<img src="{base}/{step.gif}" alt="" class="w-8 dark:invert" />
				</div>
				<h3 class="text-lg font-bold" style="max-width: 190px;">{step.title}</h3>
				<p>{step.description}</p>
			</div>
		</div>
	{/each}
</div>
