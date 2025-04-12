<script lang="ts">
	export let direction: 'asc' | 'desc' = 'desc';
</script>

<svg
	width="20"
	height="20"
	viewBox="0 0 20 20"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class="{direction === 'asc' ? 'rotate-180' : ''} transition-transform"
>
	<path d="M2.5 5.8335H17.5" stroke="#0C0D2D" stroke-width="1.2" stroke-linecap="round" />
	<path d="M5 10H15" stroke="#0C0D2D" stroke-width="1.2" stroke-linecap="round" />
	<path d="M8.3335 14.1665H11.6668" stroke="#0C0D2D" stroke-width="1.2" stroke-linecap="round" />
</svg>
