// src/lib/themeStore.ts
import { writable } from 'svelte/store';

const storedTheme = localStorage.getItem('theme') === 'dark';
export const isDark = writable(storedTheme);

isDark.subscribe((value) => {
	localStorage.setItem('theme', value ? 'dark' : 'light');
});
