<script lang="ts">
	import Fuse from 'fuse.js';
	import { loans } from '../data/DummyLoans';
	import type { Loan } from '../data/DummyLoans';
	import { ChevronDown } from 'lucide-svelte';
	import Sort from '../icons/Sort.svelte';
	import LoanWidget from '../components/loan/LoanWidget.svelte';

	export let phase = 'loan';

	// Fuse.js configuration
	const fuseOptions = {
		includeScore: true,
		shouldSort: true,
		threshold: 0.4, // Lower threshold means more strict matching
		keys: [
			'loanTitle',
			'loanDescription',
			'loanId',
			// Add more searchable fields as needed
			{ name: 'borrowerName', weight: 0.7 },
			{ name: 'loanPurpose', weight: 0.5 }
		]
	};

	// Create Fuse instance
	const fuse = new Fuse(loans, fuseOptions);

	let searchQuery = '';
	let filteredLoans: Loan[] = [];

	// Search function
	function performSearch() {
		if (!searchQuery || searchQuery.trim() === '') {
			filteredLoans = loans.filter((l) => l.phase === phase);
			return;
		}

		// Perform fuzzy search
		const searchResults = fuse.search(searchQuery);

		// Map results to original loan objects and filter by phase
		filteredLoans = searchResults
			.map((result) => result.item)
			.filter((loan) => loan.phase === phase);
	}

	// Reactive statement to trigger search
	$: searchQuery, phase, performSearch();
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
			<div class="flex items-center gap-2 text-sm font-normal">
				<Sort></Sort>
				Date added (desc)
				<ChevronDown size="1em" />
			</div>
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
