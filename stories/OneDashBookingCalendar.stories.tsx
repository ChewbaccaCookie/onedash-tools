import React from "react";
import { storiesOf } from "@storybook/react";
import "../styles/default.scss";
import OneDashBookingCalendar from "../components/OneDashBookingCalendar/OneDashBookingCalendar";
import OneDashCard from "../components/OneDashCard/OneDashCard";
import { action } from "@storybook/addon-actions";

storiesOf("Booking Calendar", module)
	.add("default", () => (
		<OneDashCard>
			<OneDashBookingCalendar appointments={[]} addAppointment={action("addAppointment")} />
		</OneDashCard>
	))
	.add("legend", () => (
		<OneDashCard>
			<OneDashBookingCalendar showLegend appointments={[]} addAppointment={action("addAppointment")} />
		</OneDashCard>
	))
	.add("add-dialog", () => (
		<OneDashCard>
			<OneDashBookingCalendar showDialogOnAdd appointments={[]} addAppointment={action("addAppointment")} />
		</OneDashCard>
	));
