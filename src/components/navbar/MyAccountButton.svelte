<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import LogOut from '../../icons/LogOut.svelte';
	import { logout } from '../../stores/ui';
</script>

<div class="group relative w-[120px]">
	<button
		class="flex items-center gap-1 rounded-full bg-dark-accent px-4 pl-5 text-white hover:opacity-90"
		style="height:31px"
	>
		My Account <ChevronDown size="1em" />
	</button>

	<div class="invisible absolute inset-x-0 top-full w-[150px] group-hover:visible">
		<ul
			class="accent-hover overflow-hidden rounded-md border-t border-[#0000000F] bg-white shadow-lg dark:bg-dark-background dark:shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
		>
			<a
				href="/account/loans"
				class="block flex h-[38px] items-center px-4 hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent"
			>
				My Loans
			</a>
			<a
				href="/account/donations"
				class="block flex h-[38px] items-center px-4 hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent"
			>
				My Donations
			</a>
			<a
				href="/account/repayments"
				class="block flex h-[38px] items-center px-4 hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent"
			>
				My Repayments
			</a>
			<a
				href="/account/history"
				class="block flex h-[38px] items-center px-4 hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent"
			>
				Transactions History
			</a>
			<button
				on:click={logout}
				class="block flex h-[38px] w-full items-center gap-1 px-4 text-red-500 hover:bg-light-accent dark:hover:bg-dark-accent"
			>
				<LogOut />
				Log out
			</button>
		</ul>
	</div>
</div>

<style lang="postcss">
</style>
