import React from "react";
import { action } from "@storybook/addon-actions";
import StyleLoader from "../Utils/StyleLoader";
import { withKnobs, select as sel, boolean, text, number } from "@storybook/addon-knobs";
import Card from "./Card";
export default {
	title: "Card",
	decorators: [withKnobs],
};
export const defaultInput = () => {
	const title = text("Titel", "Das hier ist ein Titel");

	return (
		<StyleLoader>
			<Card title={title}>
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
					magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
					gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
					elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
					accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
					amet.
				</p>
			</Card>
		</StyleLoader>
	);
};
