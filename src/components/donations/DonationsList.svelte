<script lang="ts">
	import { shortenAddress } from '$lib/utils';
	import { my_donations } from '../../stores/ui';

	//export let donations = [];
</script>

<div class="mb-4 text-lg font-medium">
	My donations <span class="ml-1 text-sm font-light opacity-[0.6]"
		>({$my_donations.length} donation{$my_donations.length == 1 ? '' : 's'})</span
	>
</div>
<div class="hidden lg:block">
	{#each $my_donations as d}
		<div
			class="mb-4 grid grid-cols-4 rounded-xl border-2 border-light-border p-2 px-4 dark:border-dark-border"
		>
			<div>
				<div class="text-xs opacity-[0.6]">Loan ID: {shortenAddress(d.loanId)}</div>
				<div class="text-lg font-medium">{d.title}</div>
			</div>
			<div>
				<div class="text-xs opacity-[0.6]">Type:</div>
				<div class="font-medium">{d.type}</div>
			</div>
			<div>
				<div class="text-xs opacity-[0.6]">My donation:</div>
				<div class="font-medium">{d.amount}</div>
			</div>
			<div>
				<div class="text-xs opacity-[0.6]">Status:</div>
				<div class="font-medium" class:text-green-500={d.status?.includes('withdraw')}>
					{d.status}
				</div>
			</div>
		</div>
	{/each}
</div>

<div class="block lg:hidden">
	{#each $my_donations as d}
		<div class="mb-4 rounded-xl border-2 border-light-border p-2 px-4 dark:border-dark-border">
			<div class="flex justify-between">
				<div class="text-xs">Loan ID: {d.loan_id}</div>
				<div class="text-xs">{d.action}</div>
			</div>
			<div class="text-lg font-medium">{d.name}</div>

			<div class="my-2 flex justify-between">
				<div class="text-xs opacity-[0.6]">My donation:</div>
				<div class="font-medium">{d.donation}</div>
			</div>
			<div class="flex justify-between">
				<div class="text-xs opacity-[0.6]">Status:</div>
				<div class="font-medium" class:text-green-500={d.status?.includes('withdraw')}>
					{d.status}
				</div>
			</div>
		</div>
	{/each}
</div>
