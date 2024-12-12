import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',

	theme: {
		screens: {
			lg: '848px'
		},
		extend: {
			colors: {
				light: {
					background: '#FFFFFF',
					text: '#000000',
					accent: '#5054dd',
					secondary: '#4E4E50',
					gradientStart: '#171622',
					gradientEnd: '#202482'
				},
				dark: {
					background: '#16151f',
					text: '#fdfdfd',
					accent: '#5054dd',
					secondary: '#4E4E50',
					gradientStart: '#fdfcfd',
					gradientEnd: '#7e7f92'
				}
			},
			fontWeight: {
				default: '400'
			},
			letterSpacing: {
				default: '0.025em'
			}
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
