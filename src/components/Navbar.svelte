<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';

	const links = [
		{ name: 'Loans', href: '/loans' },
		{ name: 'Repayments', href: '/repayments' }
	];
</script>

<nav class="w-full">
	<div class="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4">
		<div class="flex items-center space-x-4">
			<!-- <img src="/logo.png" alt="Logo" class="h-8 w-8" /> -->
			<a href="/" class="text-xl font-bold">EXLE</a>
			{#each links as link}
				<a href={link.href} class="hover:text-secondary">{link.name}</a>
			{/each}
		</div>
		<div class="flex items-center space-x-6">
			<ThemeToggle />
			<button class="rounded-full bg-dark-accent px-4 py-2 text-white hover:opacity-90"
				>Connect Wallet</button
			>
		</div>
	</div>
</nav>
