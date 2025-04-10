<script>
	import DonationsList from '../../../components/donations/DonationsList.svelte';
	import EmptyDonations from '../../../components/loan/EmptyDonations.svelte';
	import { donations } from '../../../data/DummyDonations';
</script>

{#if donations?.length < 1}
	<EmptyDonations></EmptyDonations>
{:else}
	<DonationsList {donations}></DonationsList>
{/if}
