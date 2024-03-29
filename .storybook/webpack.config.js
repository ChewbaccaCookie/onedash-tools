const path = require("path");

module.exports = ({ config }) => {
	config.module.rules.push({
		test: /\.(ts|tsx)$/,
		use: [
			{
				loader: require.resolve("awesome-typescript-loader"),
			},
		],
	});
	config.module.rules.push({
		test: /\.scss$/,
		use: ["style-loader", "css-loader", "sass-loader"],
		include: path.resolve(__dirname, "../"),
	});

	config.module.rules.push({
		test: /\.stories\.tsx?$/,
		loaders: [{ loader: require.resolve("@storybook/source-loader"), options: { parser: "typescript" } }],
		enforce: "pre",
	});
	config.resolve.extensions.push(".ts", ".tsx");
	return config;
};
