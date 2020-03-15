import React from "react";
import StyleLoader from "../Utils/StyleLoader";
import { withKnobs, text, boolean, select, number } from "@storybook/addon-knobs";
import Card from "../Card/Card";
import Dialog from "./Dialog";
import Prompt from "./Prompt";
import Button from "../Form/Button/Button";
export default {
	title: "Dialog",
	decorators: [withKnobs],
};
export const defaultDialog = () => {
	const theme = select("theme", { light: "light", dark: "dark" }, "light");
	const dialog = React.createRef<Dialog>();
	const title = text("title", "Lorem Ipsum");
	const maxWidth = number("maxWidth", 600);
	const isOpen = boolean("isOpen", true);
	const closeable = boolean("closeable", true);
	const showX = boolean("showX", true);
	const escapeClose = boolean("escapeClose", true);
	const wrapperClickClose = boolean("wrapperClickClose", true);
	return (
		<StyleLoader theme={theme}>
			<Card>
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
					et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
					et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				</p>
				<Button
					onClick={() => {
						if (dialog.current) dialog.current.show();
					}}
				/>
			</Card>
			<Dialog
				closeable={closeable}
				ref={dialog}
				isOpen={isOpen}
				title={title}
				settings={{ escapeClose, maxWidth, showX, wrapperClickClose }}>
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua.
				</p>
			</Dialog>
		</StyleLoader>
	);
};

export const customizedButtons = () => {
	const theme = select("theme", { light: "light", dark: "dark" }, "light");
	const dialog = React.createRef<Dialog>();
	const isOpen = boolean("isOpen", true);
	return (
		<StyleLoader theme={theme}>
			<Card>
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
					et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
					et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				</p>
				<Button
					onClick={() => {
						if (dialog.current) dialog.current.show();
					}}
				/>
			</Card>
			<Dialog ref={dialog} isOpen={isOpen} title="Lorem Ipsum">
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua.
				</p>
			</Dialog>
		</StyleLoader>
	);
};

export const promptDialog = () => {
	const theme = select("theme", { light: "light", dark: "dark" }, "light");
	const dialog = React.createRef<Dialog>();
	const isOpen = boolean("isOpen", true);
	return (
		<StyleLoader theme={theme}>
			<Card>
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
					et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
					et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				</p>
				<Button
					onClick={() => {
						if (dialog.current) dialog.current.show();
					}}
				/>
			</Card>
			<Prompt
				isOpen={isOpen}
				dialogRef={dialog}
				title="Datei löschen?"
				text="Wollen Sie die Datei wirklich löschen?"
			/>
		</StyleLoader>
	);
};
