<script>
	export let options = [
		{ value: 'date_asc', label: 'Date added (asc)' },
		{ value: 'date_desc', label: 'Date added (desc)' },
		{ value: 'funding_asc', label: 'Funding Goal (asc)' },
		{ value: 'funding_desc', label: 'Funding Goal (desc)' },
		{ value: 'name_asc', label: 'Name (asc)' },
		{ value: 'name_desc', label: 'Name (desc)' },
		{ value: 'interest_asc', label: 'Interest Rate (asc)' },
		{ value: 'interest_desc', label: 'Interest Rate (desc)' },
		{ value: 'repaid_asc', label: 'Repaid Percentage (asc)' },
		{ value: 'repaid_desc', label: 'Repaid Percentage (desc)' }
	];

	export let selectedOption = 'date_desc';
	export let onChange = (value) => {};

	import { ChevronDown } from 'lucide-svelte';
	import Sort from '../../icons/Sort.svelte';

	function selectOption(option) {
		selectedOption = option.value;
		onChange(option.value);
	}
</script>

<div class="group relative text-sm">
	<button
		class="flex w-[240px] items-center gap-2 rounded-lg px-2 hover:bg-gray-100 dark:hover:bg-gray-800"
		style="height: 31px;"
	>
		<Sort direction={selectedOption.endsWith('_asc') ? 'asc' : 'desc'} />
		{options.find((o) => o.value === selectedOption)?.label}
		<ChevronDown size="1em" />
	</button>

	<div class="invisible absolute top-full group-hover:visible">
		<ul
			class="accent-hover overflow-hidden rounded-md border-t border-[#0000000F] bg-white shadow-lg dark:bg-dark-background dark:shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
		>
			{#each options as option}
				<button
					on:click={() => selectOption(option)}
					class="block flex h-[38px] w-[240px] w-full items-center whitespace-nowrap px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
				>
					{option.label}
				</button>
			{/each}
		</ul>
	</div>
</div>
