import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',

	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '848px',
			xl: '1024px'
		},
		extend: {
			colors: {
				light: {
					background: '#FFFFFF',
					text: '#000000',
					accent: '#5054dd',
					secondary: '#4E54E5',
					gradientStart: '#171622',
					gradientEnd: '#202482',
					neutral: '#EBECFF',
					textNeutral: '#777899',
					border: '#e6e6eb'
				},
				dark: {
					background: '#16151f',
					text: '#fdfdfd',
					accent: '#5054dd',
					secondary: '#4E54E5',
					gradientStart: '#fdfcfd',
					gradientEnd: '#7e7f92',
					neutral: '#1F2131',
					gray: '#2B293B',
					textNeutral: '#777899',
					border: '#292837'
				},
				'light-border': '#e6e6eb',
				'dark-border': '#292837',
				'light-accent': '#5054dd',
				'dark-accent': '#5054dd'
			},
			fontWeight: {
				default: '400'
			},
			letterSpacing: {
				default: '0.025em'
			},
			fontSize: {
				base: ['12px', '18px'],
				xs: ['12px', '18px'],
				md: ['14px', '1.25em'],
				lg: ['16px', '1.5em']
			}
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
