import React from "react";
import { storiesOf } from "@storybook/react";
import "../src/styles/default.scss";
import OneDashSpinner from "../src/OneDashSpinner/OneDashSpinner";

storiesOf("Spinner", module).add("default", () => <OneDashSpinner defaultVisible />);
