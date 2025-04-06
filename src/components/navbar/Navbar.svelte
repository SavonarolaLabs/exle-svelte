<script lang="ts">
	import ThemeToggle from '../ThemeToggle.svelte';
	import { base } from '$app/paths';
	import ExleSvg from '../ExleSvg.svelte';
	import { connected_wallet, is_dark } from '../../stores/ui';
	import MyAccountButton from './MyAccountButton.svelte';
	import ConnectWalletButton from './ConnectWalletButton.svelte';
	import Hamburger from './Hamburger.svelte';

	const links = [
		{ name: 'Loans', href: `${base}/loans` },
		{ name: 'Repayments', href: `${base}/repayments` }
	];
</script>

<nav class="w-full text-xs font-medium" class:border-dark={$is_dark} class:border-light={!$is_dark}>
	<div class="mx-auto flex max-w-screen-lg items-center justify-between p-4 md:px-0">
		<div class="flex items-center space-x-8">
			<!-- <img src={`${base}/logo.png`} alt="Logo" class="h-8 w-8" /> -->

			<a href="{base}/" class="flex items-center gap-1">
				<ExleSvg></ExleSvg>
				EXLE</a
			>
			{#each links as link}
				<a href={link.href} class="hover:text-secondary hidden md:block">{link.name}</a>
			{/each}
		</div>
		<div class="flex items-center md:hidden">
			<Hamburger></Hamburger>
		</div>
		<div class="hidden items-center space-x-3 md:flex">
			<ThemeToggle />
			{#if $connected_wallet}
				<MyAccountButton></MyAccountButton>
			{:else}
				<ConnectWalletButton></ConnectWalletButton>
			{/if}
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
