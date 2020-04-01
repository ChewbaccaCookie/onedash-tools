import React from "react";
import "./Spinner.scss";

interface SpinnerProps {
	defaultVisible?: boolean;
	fullPage?: boolean;
	className?: string;
}
class Spinner extends React.Component<SpinnerProps> {
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

	buildClassName = () => {
		let className = "spinner-container";
		if (this.props.className) className += ` ${this.props.className}`;
		if (this.props.fullPage) className += " full-page";
		if (this.state.display === true) className += " visible";
		return className;
	};
	render() {
		return (
			<div className={this.buildClassName()}>
				<div className="spinner-overlay" />
				<div className={`spinner ${this.state.visbilityClass}`}>
					<div className="sk-cube1 sk-cube"></div>
					<div className="sk-cube2 sk-cube"></div>
					<div className="sk-cube4 sk-cube"></div>
					<div className="sk-cube3 sk-cube"></div>
				</div>
			</div>
		);
	}
}
export default Spinner;
