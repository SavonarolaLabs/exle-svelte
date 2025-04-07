<script>
	import { base } from '$app/paths';
	import Button from '../../../components/Button.svelte';
	import EmptyBox from '../../../icons/EmptyBox.svelte';
</script>

<div class="flex flex-grow flex-col items-center justify-center py-16">
	<div class="mb-6">
		<EmptyBox />
	</div>
	<div class="mb-1 text-center">There are no loans here.</div>
	<div class="mb-6 text-center">
		Click on the button below if you want to create a loan request:
	</div>
	<Button href="{base}/loans/create" label="Create loan" variant="primary" class="px-6" />
</div>
