<script lang="ts">
	import { connectWallet } from '../../stores/ui';
</script>

<button
	class="w-[120px] rounded-full bg-dark-accent px-4 text-white hover:opacity-90"
	style="height:31px"
	on:click={connectWallet}
>
	Connect wallet
</button>
