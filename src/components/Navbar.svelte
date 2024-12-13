<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import { base } from '$app/paths';
	import { isDark } from '$lib/themeStore';
	import ExleSvg from './ExleSvg.svelte';

	const links = [
		{ name: 'Loans', href: `${base}/loans` },
		{ name: 'Repayments', href: `${base}/repayments` }
	];
</script>

<nav class="w-full text-xs font-medium" class:border-dark={$isDark} class:border-light={!$isDark}>
	<div class="mx-auto flex max-w-screen-lg items-center justify-between py-4">
		<div class="flex items-center space-x-8">
			<!-- <img src={`${base}/logo.png`} alt="Logo" class="h-8 w-8" /> -->

			<a href="{base}/" class="flex items-center gap-1">
				<ExleSvg></ExleSvg>
				EXLE</a
			>
			{#each links as link}
				<a href={link.href} class="hover:text-secondary">{link.name}</a>
			{/each}
		</div>
		<div class="flex items-center space-x-3">
			<ThemeToggle />
			<button
				class="rounded-full bg-dark-accent px-4 text-white hover:opacity-90"
				style="height:31px"
			>
				Connect wallet
			</button>
		</div>
	</div>
</nav>

<style>
	.border-dark {
		border-bottom: 1.5px solid #292837;
	}
	.border-light {
		border-bottom: 1.5px solid #f6f6fb;
	}
</style>
