import type { Config } from 'tailwindcss';

export default {
    darkMode: ['selector', '[class*="app-dark"]'],
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'public-sans': ['"Public Sans"', 'sans-serif'],
            },
        },
        screens: {
           'xxs': '440px',
            xs:'500px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1560px',
            '3xl': '1920px'
        }
    },
        plugins: [require('tailwindcss-primeui')]
    } satisfies Config;