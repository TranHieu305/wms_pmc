/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [
		function ({ addComponents }) {
			addComponents({
				".detail-box": {
					borderRadius: "6px",
					backgroundColor: "#FFF",
					boxShadow:
						"0px 0px 2px 0px rgba(145, 158, 171, 0.20), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
				},
			});
		},
	],
};
