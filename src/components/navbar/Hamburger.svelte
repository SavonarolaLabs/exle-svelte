<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import {
		closeMobileMenu,
		connectWallet,
		is_mobile_menu_open,
		logout,
		toggleMobileMenu,
		toggleTheme
	} from '../../stores/ui';
	import LogOut from '../../icons/LogOut.svelte';
	import { slide } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { connected_wallet } from '../../stores/ui';
	import ExleSvg from '../ExleSvg.svelte';
	import { base } from '$app/paths';

	function handleLogout() {
		logout();
		toggleMobileMenu();
	}

	function handleConnect() {
		connectWallet();
		toggleMobileMenu();
	}
</script>

<!-- Mobile Navigation Bar -->
<button on:click={toggleMobileMenu} class="">
	{#if $is_mobile_menu_open}
		<X size={24} />
	{:else}
		<Menu size={24} />
	{/if}
</button>

<!-- Mobile Menu -->
{#if $is_mobile_menu_open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div on:click={closeMobileMenu} class="fixed inset-0 z-40 bg-black bg-opacity-40"></div>

	<div
		transition:slide={{ duration: 300 }}
		style="height:fit-content"
		class="fixed inset-0 top-0 z-50 bg-white px-4 pb-4 pt-1 text-sm font-normal dark:bg-dark-background"
	>
		<div class="mx-auto flex max-w-screen-xl items-center justify-between py-4 md:px-0">
			<a href="{base}/" on:click={closeMobileMenu} class="flex items-center gap-1 text-xs">
				<ExleSvg />
				EXLE
			</a>
			<button on:click={toggleMobileMenu} class="">
				{#if $is_mobile_menu_open}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>
		</div>
		<nav class="flex flex-col space-y-4">
			<a href="/loans" on:click={closeMobileMenu} class="">Loans</a>
			<a href="/repayments" on:click={closeMobileMenu} class="">Repayments</a>
			<a href="/create-loan" on:click={closeMobileMenu} class="">Create Loan</a>

			<div class="my-4 h-px w-full bg-gray-200 dark:bg-dark-gray"></div>

			{#if $connected_wallet}
				<button
					on:click={handleLogout}
					class="flex w-full items-center justify-between gap-2 text-red-500"
				>
					<div class="text-left text-dark-textNeutral">
						My Account
						<div class="text-sm opacity-50">9eq6S...QXssg</div>
					</div>
					<div class="flex items-center gap-2">
						Log out
						<span class="pt-[1px]"><LogOut /></span>
					</div>
				</button>

				<a href="{base}/account/loans" on:click={closeMobileMenu} class="">My Loans</a>
				<a href="{base}/account/repayments" on:click={closeMobileMenu} class="">My Repayments</a>
				<a href="{base}/account/donations" on:click={closeMobileMenu} class="">My Donations</a>
				<a href="{base}/transactions" on:click={closeMobileMenu} class="">Transactions History</a>
			{:else}
				<button
					on:click={handleConnect}
					class="w-full rounded-full bg-dark-accent py-2 text-center text-white"
				>
					Connect wallet
				</button>
			{/if}

			<div class="flex items-center justify-between">
				<span class="">Dark Mode:</span>
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="relative h-8 w-16 rounded-full bg-gray-300 p-1 dark:bg-dark-gray"
					on:click={toggleTheme}
				>
					<div
						class="absolute h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ease-in-out dark:translate-x-8 dark:bg-dark-accent"
					></div>
				</div>
			</div>
		</nav>
	</div>
{/if}
