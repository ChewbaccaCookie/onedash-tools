/* eslint-disable @typescript-eslint/camelcase */
import React, { Component } from "react";
import Calendar, { CalendarTileProperties } from "react-calendar/dist/entry.nostyle";
import "./OneDashBookingCalendar.scss";
import OneDashDialog from "../OneDashDialog/OneDashDialog";
import OneDashForm from "../OneDashForm/OneDashForm";
import OneDashInput from "../OneDashForm/OneDashInput";
import dayjs from "dayjs";

export interface Appointment {
	timestamp_from: string | number;
	timestamp_to: string | number;
}

interface OneDashCalendarProps {
	showLegend?: boolean;
	appointments?: Appointment[];
	addAppointment: (data: any) => void;
	showDialogOnAdd?: boolean;
}

export default class OneDashBookingCalendar extends Component<OneDashCalendarProps> {
	detailDialog = React.createRef<OneDashDialog>();
	detailForm = React.createRef<OneDashForm>();

	state = {
		appointments: [] as Appointment[],
		selectedValueRange: undefined,
		dayJSSelectedValueRange: [dayjs(), dayjs()],
	};
	componentDidMount() {
		this.setValues();
	}
	setValues = () => {
		let appointments = this.props.appointments ? this.props.appointments : [];
		appointments = appointments.map((blockedDay) => {
			blockedDay.timestamp_from = Number(blockedDay.timestamp_from);
			blockedDay.timestamp_to = Number(blockedDay.timestamp_to);
			return blockedDay;
		});
		this.setState({ appointments });
	};

	componentDidUpdate() {
		if (!this.props.appointments || this.state.appointments.length !== this.props.appointments.length) {
			this.setValues();
		}
	}

	onChange = (date: any) => {
		const startDate = date[0].getTime();
		const endDate = date[1].getTime();

		let addPossible = true;
		const appointments = this.state.appointments;
		appointments.forEach((blockedDay) => {
			if (blockedDay.timestamp_from >= startDate && blockedDay.timestamp_to <= endDate) {
				addPossible = false;
			}
		});
		if (addPossible && this.detailDialog.current) {
			this.setState({
				dayJSSelectedValueRange: [dayjs(date[0]), dayjs(date[1])],
			});
			if (this.props.showDialogOnAdd) {
				this.detailDialog.current.open();
			} else {
				this.props.addAppointment({ from: dayjs(date[0]), to: dayjs(date[1]) });
			}
		} else {
			this.setState({ selectedValueRange: [new Date(), new Date()] });
			/*showNotification({
				type: "E",
				message: "Der angegebende Zeitraum überschneidet sich mit anderen Buchungen"
			});*/
		}
	};

	formatCalendar = (calendarTile: CalendarTileProperties) => {
		const newDate = new Date(Date.UTC(calendarTile.date.getFullYear(), calendarTile.date.getMonth(), calendarTile.date.getDate()));
		const tileDate = newDate.getTime();
		const appointment = this.state.appointments.find(
			(blockedDay) => tileDate >= blockedDay.timestamp_from && tileDate <= blockedDay.timestamp_to
		) as any;
		if (appointment && calendarTile.view === "month") {
			switch (appointment.status) {
			case "mailConfirmed":
				return "day-pending day-booked";
			case "pending":
				return "day-pending day-pending";
			case "rejected":
				return "";
			default:
				return "day-confirmed day-booked";
			}
		} else {
			return "";
		}
	};

	addBlockedDay = () => {
		const form = this.detailForm.current;
		if (form && form.validateInputs() && this.detailDialog.current) {
			const data = form.getData();
			data.timestamp_from = data.dateRange[0].toDate().getTime();
			data.timestamp_to = data.dateRange[1].toDate().getTime();
			this.props.addAppointment(data);
			this.detailDialog.current.close();
			form.resetForm();
		}
	};

	render() {
		return (
			<div className="onedash-calendar">
				<Calendar
					calendarType="ISO 8601"
					tileClassName={(date) => this.formatCalendar(date)}
					minDate={new Date()}
					showWeekNumbers={true}
					showNeighboringMonth={true}
					onChange={this.onChange}
					minDetail="year"
					selectRange={true}
					value={this.state.selectedValueRange}
				/>
				<OneDashDialog
					className="booking-dialog"
					onSaveButtonClick={this.addBlockedDay}
					ref={this.detailDialog}
					closeable={true}
					isOpen={false}
					title="Buchung erstellen">
					<OneDashForm ref={this.detailForm}>
						<OneDashInput
							readonly
							value={this.state.dayJSSelectedValueRange}
							name="dateRange"
							type="date-range"
							required
							label="Startdatum"
							label2="Enddatum"
						/>
						<OneDashInput name="firstName" required label="Vorname" />
						<OneDashInput name="lastName" required label="Nachname" />
						<OneDashInput name="email" type="email" label="Email" />
						<OneDashInput name="address" label="Adresse" />
						<OneDashInput name="plz" label="Postleitzahl" />
						<OneDashInput name="location" label="Ort" />
						<OneDashInput name="additional_message" type="textarea" label="Zusätzliche Informationen" />
					</OneDashForm>
				</OneDashDialog>

				{this.props.showLegend && (
					<div className="onedash-calendar-legend" tabIndex={0}>
						<div className="legend-entry">
							<div className="legend-color today" />
							<div className="legend-name">Heutiger Tag</div>
						</div>
						<div className="legend-entry">
							<div className="legend-color pending" />
							<div className="legend-name">Warten auf Rückmeldung</div>
						</div>
						<div className="legend-entry">
							<div className="legend-color booked" />
							<div className="legend-name">Gebuchter Tag</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}
