/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'5eme': { DEFAULT: '#3B82F6', light: '#EFF6FF', dark: '#1D4ED8' },
				'4eme': { DEFAULT: '#10B981', light: '#ECFDF5', dark: '#047857' },
				'3eme': { DEFAULT: '#F97316', light: '#FFF7ED', dark: '#C2410C' },
			},
		},
	},
	plugins: [],
}
