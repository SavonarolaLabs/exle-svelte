<script lang="ts">
	import Fuse from 'fuse.js';
	import LoanWidget from '../../components/LoanWidget.svelte';
	import { loans } from '../../data/DummyLoans';
	import type { Loan } from '../../data/DummyLoans';

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
	let filteredLoans: Loan[] = loans;

	// Search function
	function performSearch() {
		if (!searchQuery || searchQuery.trim() === '') {
			filteredLoans = loans;
			return;
		}

		// Perform fuzzy search
		const searchResults = fuse.search(searchQuery);

		// Map results to original loan objects
		filteredLoans = searchResults.map((result) => result.item);
	}

	// Reactive statement to trigger search
	$: searchQuery, performSearch();
</script>

<div class="container mx-auto py-8">
	<header class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-semibold">Loans on EXLE</h1>
			<p class="text-sm">{filteredLoans.length} Active Loans</p>
		</div>
		<div class="flex items-center gap-4">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search in loans name, ID, details..."
				class="w-80 rounded-md border bg-light-background px-4 py-2 dark:bg-dark-background"
			/>
		</div>
	</header>

	{#if filteredLoans.length === 0}
		<p class="text-center text-gray-500">No loans found. Try a different search term.</p>
	{:else}
		<p class="mb-4 text-sm text-gray-500">{filteredLoans.length} Active Loans</p>
		<div id="loans-grid" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredLoans as loan}
				<LoanWidget {loan} />
			{/each}
		</div>
	{/if}
</div>
