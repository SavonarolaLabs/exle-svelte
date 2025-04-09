<script lang="ts">
	import ThemeToggle from '../ThemeToggle.svelte';
	import { base } from '$app/paths';
	import ExleSvg from '../ExleSvg.svelte';
	import { closeMobileMenu, connected_wallet, is_dark } from '../../stores/ui';
	import MyAccountButton from './MyAccountButton.svelte';
	import ConnectWalletButton from './ConnectWalletButton.svelte';
	import Hamburger from './Hamburger.svelte';

	const links = [
		{ name: 'Loans', href: `${base}/loans` },
		{ name: 'Repayments', href: `${base}/repayments` }
	];
</script>

<nav
	class="w-full border-b text-sm font-normal"
	class:border-dark-border={$is_dark}
	class:border-light-border={!$is_dark}
>
	<div class="mx-auto flex max-w-screen-xl items-center justify-between p-4 xl:px-0">
		<div class="flex items-center space-x-8">
			<a href="{base}/" on:click={closeMobileMenu} class="flex items-center gap-1">
				<ExleSvg />
				EXLE
			</a>
			{#each links as link}
				<a href={link.href} class="hover:text-secondary hidden md:block">{link.name}</a>
			{/each}
		</div>
		<div class="flex items-center md:hidden">
			<Hamburger />
		</div>
		<div class="hidden items-center space-x-3 md:flex">
			<ThemeToggle />
			{#if $connected_wallet}
				<MyAccountButton />
			{:else}
				<ConnectWalletButton />
			{/if}
		</div>
	</div>
</nav>

<style></style>
