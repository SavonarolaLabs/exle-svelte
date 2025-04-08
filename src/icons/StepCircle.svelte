<!-- StepIndicator.svelte -->
<script lang="ts">
	// The current step (1-5)
	export let step: number = 1;
	export let size: number = 36;

	// Ensure step is between 1 and 5
	$: currentStep = Math.max(1, Math.min(5, step));

	// Define the path data for the 5 segments of the circle
	const paths = [
		'M21.4435 2.05496C26.0427 3.07747 29.588 5.72275 31.9128 9.8547', // Top right (1)
		'M33.9166 16.2432C34.3682 20.9739 32.9822 25.1846 29.8091 28.7009', // Right (2)
		'M24.3932 32.5972C20.076 34.4973 15.667 34.458 11.3821 32.5025', // Bottom (3)
		'M6.04325 28.5176C2.91747 24.9627 1.58422 20.7293 2.11272 16.0061', // Left (4)
		'M4.21499 9.63945C6.5955 5.5384 10.1784 2.95509 14.7923 2' // Top left (5)
	];

	// Function to get the color for a path
	const getPathColor = (pathIndex: number) => {
		return pathIndex < currentStep ? '#4E54E6' : '#E5E5EBB0';
	};
</script>

<svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
	{#each paths as path, index}
		<path
			d={path}
			stroke={getPathColor(index)}
			stroke-width="3"
			stroke-miterlimit="10"
			stroke-linecap="round"
		/>
	{/each}
</svg>
