import React from "react";
import StyleLoader from "../Utils/StyleLoader";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import Card from "./Card";
export default {
	title: "Card",
	decorators: [withKnobs],
};
export const defaultCard = () => {
	const theme = select("theme", { light: "light", dark: "dark" }, "light");
	const title = text("Titel", "Das hier ist ein Titel");

	return (
		<StyleLoader theme={theme}>
			<Card title={title}>
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
					et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
					et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				</p>
			</Card>
		</StyleLoader>
	);
};
