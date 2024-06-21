export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			spacing: {
				'18': '3rem', // 72px			
			},
			colors: {
				blue: {
					400: '#6EC4E9',
					500: '#00A3E7',
					600: '#0079AC',
				}
			},
			fontSize: {
				'6xl': '5em',
				'7xl': '6em',
			},
		},
	},
	plugins: [],
};