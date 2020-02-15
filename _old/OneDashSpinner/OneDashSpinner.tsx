import React from "react";
import "./OneDashSpinner.scss";
class OneDashSpinner extends React.Component<SpinnerProps> {
	state = {
		visbilityClass: "invisible",
		display: false,
	};
	componentDidMount() {
		if (this.props.defaultVisible === true) {
			this.show();
		}
	}
	public toggle = () => {
		if (this.state.display) {
			this.hide();
		} else {
			this.show();
		}
	};
	public show = () => {
		this.setState({
			display: true,
			visbilityClass: "visible",
		});
	};
	public hide = () => {
		this.setState(
			{
				visbilityClass: "invisible",
			},
			() => {
				setTimeout(() => {
					this.setState({
						display: false,
					});
				}, 300);
			}
		);
	};
	render() {
		return (
			<div className={this.state.display === true ? "flex-show spinner-container" : "spinner-container"}>
				<div className="spinner-overlay" />
				<div className={`spinner ${this.props.componentStyle} ${this.state.visbilityClass}`}>
					<div className="dot1" />
					<div className="dot2" />
				</div>
			</div>
		);
	}
}
export default OneDashSpinner;
