import * as React from "react";

export interface OneDashCalendarHeaderProps {
	currentDate: timeStamp;
}

class OneDashCalendarHeader extends React.Component<OneDashCalendarHeaderProps, any> {
	render() {
		return <div className="onedash-calendar-header"></div>;
	}
}

export default OneDashCalendarHeader;
