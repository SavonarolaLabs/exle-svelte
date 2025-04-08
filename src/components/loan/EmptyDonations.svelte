<script>
	import { base } from '$app/paths';
	import EmptyBox from '../../icons/EmptyBox.svelte';

	import Button from '../Button.svelte';
</script>

<div class="flex flex-grow flex-col items-center justify-center py-16">
	<div class="mb-6">
		<EmptyBox />
	</div>

	<div class="mb-1 text-center">You haven’t made any donations.</div>
	<div class="mb-6 text-center">
		You can donate to help fund or repay the loans created by others.
	</div>
	<div
		class="flex w-full flex-col justify-center space-y-4 px-3 md:flex-row md:space-x-4 md:space-y-0 md:px-0"
	>
		<Button href="{base}/loans" label="View loans" variant="primary" />
		<Button href="{base}/repayments" label="View repayments" variant="secondary" />
	</div>
</div>
