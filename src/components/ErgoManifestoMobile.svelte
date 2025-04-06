<script>
	import { is_dark } from '../stores/ui';
	import ErgoRippleEffectDark from './ErgoRippleEffectDark.svelte';
	import ErgoRippleEffectLight from './ErgoRippleEffectLight.svelte';
</script>

<div
	class="flex flex-col overflow-hidden rounded-2xl border border-light-neutral dark:border-dark-neutral"
>
	<div
		class="relative flex w-full justify-center bg-blue-900"
		class:bg-[#262983]={!$is_dark}
		class:dark-bg={$is_dark}
	>
		{#if $is_dark}
			<ErgoRippleEffectDark />
		{:else}
			<ErgoRippleEffectLight />
		{/if}
	</div>

	<div class="bg-white p-6 dark:bg-dark-neutral">
		<h3 class="mb-6 text-2xl font-bold uppercase">THE ERGO MANIFESTO</h3>
		<div class="flex">
			<div class="mr-2 text-5xl text-indigo-500">"</div>
			<p class="text-left font-light text-gray-900 dark:text-gray-100">
				In the eyes of the original broad community vision, the tools of a cryptocurrency should
				allow people to do economic activity whatever the business size, geographic location, or
				interest rates set by big players.
			</p>
		</div>
	</div>
</div>

<style>
	.dark-bg {
		background: #241f31;
	}
</style>
