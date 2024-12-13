<script lang="ts">
	export const roadmap = [
		{
			year: '2021',
			quarter: 'Q4',
			title: 'October 8-10',
			description:
				'ErgoHack II event – Ergo-Lend took first place! This got us rolling with a first version of the UI and a large portion of the ergoscript required to function.'
		},
		{
			year: '2022',
			quarter: 'Q1',
			title: 'End of Feb',
			description:
				'We completed a full end-to-end test using fully functional ergoscript contracts, scala backend and nexjs front end.'
		},
		{
			year: '2022',
			quarter: 'Q1',
			title: 'End of March',
			description: 'Contract bug bash and refactor to fix all found bugs and improve features.'
		},
		{
			year: '2022',
			quarter: 'Q2',
			title: 'May 2',
			description:
				'Staker Snapshot – Snapshot for ergopad stakers who reach any of the staking tiers. Don’t forget to whitelist for this event.'
		},
		{
			year: '2022',
			quarter: 'Q2',
			title: 'May 3',
			description: 'Contribution period, staker round – The contribution round lasts until May 8th.'
		},
		{
			year: '2022',
			quarter: 'Q2',
			title: 'May 10',
			description:
				'Seed round whitelisting – Whitelist for the seed round is FCFS. If you stake 25k ergopad tokens (alpha tier), you can access the form one hour earlier, at 13:00 UTC.'
		},
		{
			year: '2022',
			quarter: 'Q2',
			title: 'May 11',
			description:
				'Contribution period, seed round – The contribution round lasts until May 16th. On May 15th, the waitlist opens and the remaining tokens will be distributed FCFS.'
		},
		{
			year: '2022',
			quarter: 'Q2',
			title: 'May 18',
			description: 'Rebranding Ergo-Lend to EXLE.'
		},
		{
			year: '2022',
			quarter: 'Q2',
			title: 'May 25',
			description: 'EXLE IDO on Ergodex – Liquidity will be added in ErgLend pairs.'
		},
		{
			year: '2022',
			quarter: 'Q3',
			title: 'Summer',
			description: 'Scaling the backend for engineering and performance improvements.'
		},
		{
			year: '2022',
			quarter: 'Q4',
			title: 'Fall',
			description:
				'New features for both front end and backend are planned. We will be making proposals and submitting soon.'
		},
		{
			year: '2024',
			quarter: 'Q4',
			title: 'Redesign',
			description:
				'A complete redesign of the platform to enhance user experience, improve performance, and align with modern UI/UX standards.'
		}
	];
</script>

<h2>Project Roadmap</h2>
<p class="mt-10" style="max-width: 415px;">
	EXLE started for the ErgoHack 2 hackathon as 'Ergo-Lend' and we just kept going! We hope to help
	overcome some issues for the billions of unbanked people around the world. This is some of what we
	have in various stages of implementation.
</p>

<div class="relative ml-8 mt-16 text-left">
	<!-- Vertical Line -->
	<div
		class="absolute bottom-8 left-7 top-0 w-0.5 border-l-2 border-dashed border-light-neutral dark:border-dark-gray"
		style="height: calc(100% - 3rem);"
	></div>

	{#each roadmap.reverse() as item, index}
		<div class="relative mb-8 flex items-start">
			<!-- Year Badge -->
			<div
				class="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-light-neutral font-bold dark:bg-dark-gray dark:text-dark-textNeutral"
			>
				<div class="flex flex-col items-center text-2xl leading-none text-dark-textNeutral">
					<span>{item.year.slice(0, 2)}</span>
					<span>{item.year.slice(2, 4)}</span>
				</div>
			</div>

			<!-- Content -->
			<div class="ml-4">
				<h3 class="mb-1 text-lg font-bold">{item.quarter} | {item.title}</h3>
				<p style="max-width:432px">{item.description}</p>
			</div>
		</div>
	{/each}
</div>
