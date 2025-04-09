<script lang="ts">
	import { onMount } from 'svelte';

	const testimonials = [
		{
			title: 'Hear from our Community',
			name: 'Sarah',
			location: 'Kenya',
			description: `Sarah, an Entrepreneur from Kenya, achieved her dream with EXLE's support. Creating a compelling loan request, she garnered community contributions to fund her sustainable fashion venture.
			\nWith the borrowed funds, Sarah brought her vision to life, supporting local artisans. Her business success not only facilitated loan repayment but also inspired the EXLE community. Join us to turn your aspirations into reality!`
		},
		{
			title: 'Empowering Entrepreneurs',
			name: 'James',
			location: 'Nigeria',
			description: `James utilized EXLE's platform to secure funding for his innovative tech startup. His dedication and community support helped him build a sustainable business that serves thousands of users daily.`
		},
		{
			title: 'Sustainable Agriculture',
			name: 'Maria',
			location: 'Colombia',
			description: `Maria's organic farming initiative thrived with the help of EXLE's loans. She now supplies local markets with high-quality produce and supports other farmers in her region.`
		}
	];

	let currentIndex = 0;

	const next = () => {
		currentIndex = (currentIndex + 1) % testimonials.length;
	};

	const prev = () => {
		currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
	};

	const goTo = (index: number) => {
		currentIndex = index;
	};
</script>

<div class="relative mx-auto max-w-screen-xl p-8 text-left">
	<div class="relative mb-6 block flex-1 md:hidden">
		<div class="h-80 w-full overflow-hidden rounded-lg bg-gray-200">
			<!-- Placeholder for Image -->
			<div class="h-full w-full bg-gray-300"></div>
		</div>

		<!-- Placeholder for SVG Overlay -->
		<div class="absolute bottom-0 right-0 h-40 w-40">
			<!-- Insert your SVG overlay here -->
		</div>
	</div>

	<div class="flex flex-col gap-8 lg:flex-row">
		<div class="flex-1">
			<h2 class="mb-4 text-3xl font-bold md:text-4xl">{testimonials[currentIndex].title}</h2>
			<p class="whitespace-pre-line leading-relaxed text-gray-600 max-md:text-sm">
				{testimonials[currentIndex].description}
			</p>
		</div>

		<div class="relative hidden flex-1 md:block">
			<div class="h-80 w-full overflow-hidden rounded-lg bg-gray-200">
				<!-- Placeholder for Image -->
				<div class="h-full w-full bg-gray-300"></div>
			</div>

			<!-- Placeholder for SVG Overlay -->
			<div class="absolute bottom-0 right-0 h-40 w-40">
				<!-- Insert your SVG overlay here -->
			</div>
		</div>
	</div>

	<!-- Navigation Buttons -->
	<div class="mt-6 flex items-center justify-center max-md:justify-between md:gap-4">
		<button on:click={prev} class="" aria-label="Previous">
			<svg
				width="32"
				height="32"
				viewBox="0 0 32 32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M15.9993 29.3332C23.3631 29.3332 29.3327 23.3636 29.3327 15.9998C29.3327 8.63604 23.3631 2.6665 15.9993 2.6665C8.63555 2.6665 2.66602 8.63604 2.66602 15.9998C2.66602 23.3636 8.63555 29.3332 15.9993 29.3332Z"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M17.6797 20.7068L12.9863 16.0001L17.6797 11.2935"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>

		<div class="flex items-center gap-4">
			{#each testimonials as _, index}
				<button
					on:click={() => goTo(index)}
					class="h-3 w-3 rounded-full"
					class:active={currentIndex === index}
					aria-label={`Go to slide ${index + 1}`}
					style="background-color: {currentIndex === index ? '#6366F1' : '#E5E7EB'}"
				/>
			{/each}
		</div>

		<button on:click={next} class="" aria-label="Next">
			<svg
				width="32"
				height="32"
				viewBox="0 0 32 32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M16.0007 29.3332C8.63686 29.3332 2.66732 23.3636 2.66732 15.9998C2.66732 8.63604 8.63686 2.6665 16.0007 2.6665C23.3644 2.6665 29.334 8.63604 29.334 15.9998C29.334 23.3636 23.3644 29.3332 16.0007 29.3332Z"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M14.3203 20.7068L19.0137 16.0001L14.3203 11.2935"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
</div>

<style>
	button.active {
		background-color: #6366f1;
	}
</style>
