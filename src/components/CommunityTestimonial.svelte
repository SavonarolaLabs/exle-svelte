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

<div class="relative mx-auto max-w-screen-lg p-8 text-left">
	<div class="flex flex-col gap-8 lg:flex-row">
		<div class="flex-1">
			<h2 class="mb-4 text-4xl font-bold">{testimonials[currentIndex].title}</h2>
			<p class="whitespace-pre-line leading-relaxed text-gray-600">
				{testimonials[currentIndex].description}
			</p>
		</div>

		<div class="relative flex-1">
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
	<div class="mt-6 flex items-center justify-center gap-4">
		<button
			on:click={prev}
			class="rounded-full border border-gray-300 p-2 hover:bg-gray-200"
			aria-label="Previous"
		>
			&#8592;
		</button>

		{#each testimonials as _, index}
			<button
				on:click={() => goTo(index)}
				class="h-3 w-3 rounded-full"
				class:active={currentIndex === index}
				aria-label={`Go to slide ${index + 1}`}
				style="background-color: {currentIndex === index ? '#6366F1' : '#E5E7EB'}"
			/>
		{/each}

		<button
			on:click={next}
			class="rounded-full border border-gray-300 p-2 hover:bg-gray-200"
			aria-label="Next"
		>
			&#8594;
		</button>
	</div>
</div>

<style>
	button.active {
		background-color: #6366f1;
	}
</style>
