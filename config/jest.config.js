export default {
	clearMocks: true,
	collectCoverageFrom: [
		"<rootDir>/src/hooks/*.ts",
		"<rootDir>/src/libs/*.ts",
		"<rootDir>/src/utils/*.ts",
	],
	maxWorkers: "50%",
	rootDir: "..",
	testEnvironment: "jsdom",
	testMatch: ["<rootDir>/src/**/*.test.{j,t}{s,sx}"],
	transform: {
		".*\\.(j|t)sx?$": [
			"@swc/jest",
			{
				jsc: {
					baseUrl: "./src",
					paths: {
						"@hooks/*": ["hooks/*"],
						"@libs/*": ["libs/*"],
						"@typings": ["typings.ts"],
						"@utils/*": ["utils/*"],
					},
					transform: {
						react: {
							runtime: "automatic",
						},
					},
				},
			},
		],
	},
	transformIgnorePatterns: [],
}
