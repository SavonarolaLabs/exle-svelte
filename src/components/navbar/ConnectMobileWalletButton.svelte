<script lang="ts">
	import { startAuthSession, AUTH_URL, waitForWalletAuth } from "$lib/ergoauth";


  function connectMobileWallet() {
    const id = startAuthSession();
    const deeplink =
      `ergopay://${new URL(AUTH_URL).host}/auth?id=${id}&address=#P2PK_ADDRESS#`;

    waitForWalletAuth()
      .then(addr => console.log('✅ wallet connected:', addr))
      .catch(err  => console.error('⏱️ auth timeout:', err.message));

    window.location.href = deeplink;
  }
</script>

<button
  class="w-full rounded-md bg-dark-accent px-4 py-2 text-white hover:opacity-90"
  on:click={connectMobileWallet}
>
  Connect Mobile Wallet
</button>
