<div class="container mx-auto py-8">
	<header class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-semibold">Loans on EXLE</h1>
			<p class="text-sm" id="active-loans-count">12 Active Loans</p>
		</div>
		<div class="flex items-center gap-4">
			<input
				type="text"
				id="loan-search"
				placeholder="Search in loans name, ID, details..."
				class="w-80 rounded-md border bg-light-background px-4 py-2 dark:bg-dark-background"
			/>
		</div>
	</header>
	<div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3" id="loans-grid"></div>
</div>
