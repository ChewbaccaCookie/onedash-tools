import React from "react";
import { storiesOf } from "@storybook/react";
import "../styles/default.scss";
import OneDashSpinner from "../components/OneDashSpinner/OneDashSpinner";

storiesOf("Spinner", module).add("default", () => <OneDashSpinner defaultVisible />);
