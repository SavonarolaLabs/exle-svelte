import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				// Light Mode Colors
				light: {
					background: '#FFFFFF', // Light mode background
					text: '#000000', // Light mode text
					accent: '#5054dd', // Button and interactive elements
					secondary: '#4E4E50', // Subtle text or border
					gradientStart: '#171622', // Gradient start for light mode
					gradientEnd: '#202482' // Gradient end for light mode
				},
				// Dark Mode Colors
				dark: {
					background: '#16151f', // Dark mode background
					text: '#fdfdfd', // Dark mode text
					accent: '#5054dd', // Button and interactive elements
					secondary: '#4E4E50', // Subtle text or border
					gradientStart: '#fdfcfd', // Gradient start for dark mode
					gradientEnd: '#7e7f92' // Gradient end for dark mode
				}
			},
			fontWeight: {
				default: '300' // Light weight
			},
			letterSpacing: {
				default: '0.025em' // Slightly wide by default
			}
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
