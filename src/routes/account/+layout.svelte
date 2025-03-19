<script lang="ts">
	let { children } = $props();
</script>

<div class="text-xl">My Account</div>

<div class="flex gap-4">
	<a href="/account/loans">loans</a>
	<a href="/account/repayments">repayments</a>
	<a href="/account/donations">donations</a>
</div>

<div class="flex gap-4">
	<a href="/loans/create">create loan</a>
</div>

{@render children()}
