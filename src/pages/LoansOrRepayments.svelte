<script lang="ts">
	import Fuse from 'fuse.js';
	import type { Loan } from '../data/DummyLoans';
	import LoanWidget from '../components/loan/LoanWidget.svelte';
	import { repayments } from '../stores/ui';
	import SortLoans from '../components/loan/SortLoans.svelte';

	export let phase = 'loan';

	let selectedSort = 'date_desc';

	const sortOptions = [
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

	const fuseOptions = {
		includeScore: true,
		shouldSort: true,
		threshold: 0.4,
		keys: [
			'loanTitle',
			'loanDescription',
			'loanId',
			{ name: 'borrowerName', weight: 0.7 },
			{ name: 'loanPurpose', weight: 0.5 }
		]
	};

	$: fuse = new Fuse($repayments, fuseOptions);

	let searchQuery = '';
	let filteredLoans: Loan[] = [];

	function performSearch() {
		if (!searchQuery || searchQuery.trim() === '') {
			filteredLoans = $repayments.filter((l) => l.phase === phase);
		} else {
			const searchResults = fuse.search(searchQuery);
			filteredLoans = searchResults
				.map((result) => result.item)
				.filter((loan) => loan.phase === phase);
		}
		sortLoans();
	}

	function sortLoans() {
		const [key, dir] = selectedSort.split('_');
		filteredLoans.sort((a, b) => {
			let aVal: any = a[key];
			let bVal: any = b[key];

			if (typeof aVal === 'string') aVal = aVal.toLowerCase();
			if (typeof bVal === 'string') bVal = bVal.toLowerCase();

			if (aVal < bVal) return dir === 'asc' ? -1 : 1;
			if (aVal > bVal) return dir === 'asc' ? 1 : -1;
			return 0;
		});
	}

	function handleSortChange(value: string) {
		selectedSort = value;
		sortLoans();
	}

	$: searchQuery, phase, $repayments, performSearch();
</script>

<div class="container mx-auto py-8">
	<header class="mb-8 flex items-center justify-between max-md:flex-col max-md:items-start">
		<div>
			{#if phase == 'loan'}
				<h1
					class="bg-gradient-to-r from-[#23c276] to-[#0e1b33] bg-clip-text text-2xl font-semibold text-transparent dark:from-green-400 dark:to-blue-900"
				>
					Loans on EXLE
				</h1>
				<p class="mt-2 text-sm">{filteredLoans.length} Active Loans</p>
			{:else}
				<h1
					class="bg-gradient-to-r from-[#4d53e3] to-[#0d0e2f] bg-clip-text text-2xl font-semibold text-transparent dark:from-indigo-500 dark:to-indigo-700"
				>
					Repayments on EXLE
				</h1>
				<p class="mt-2 text-sm">{filteredLoans.length} Repayments</p>
			{/if}
		</div>

		<div class="flex items-center gap-4 max-md:mt-4 max-md:flex-col-reverse max-md:items-start">
			<SortLoans selectedOption={selectedSort} onChange={handleSortChange} options={sortOptions} />
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search in loans name, ID, details..."
				class="w-80 rounded-md border-2 border-light-border px-4 py-2 text-sm dark:border-dark-border dark:bg-dark-background"
			/>
		</div>
	</header>

	{#if filteredLoans.length === 0}
		<p class="text-center text-gray-500">No loans found. Try a different search term.</p>
	{:else}
		<div id="loans-grid" class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
			{#each filteredLoans as loan}
				<LoanWidget {loan} />
			{/each}
		</div>
	{/if}
</div>
