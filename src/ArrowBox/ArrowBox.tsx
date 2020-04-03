import * as React from "react";
import { Component } from "react";
import "./styles/twenty.scss";
import SETTINGS from "../Utils/Settings";
import { styles } from "../ToolTypes";

export interface ArrowBoxProps {
	className?: string;
	isOpen?: boolean;
	defaultOpen?: boolean;
	title?: string;
	style?: styles;
}

class ArrowBox extends Component<ArrowBoxProps> {
	state = {
		isOpen: false,
	};

	buildClassName = () => {
		let className = "onedash-arrow-box";
		if (this.props.className) {
			className += " " + this.props.className;
		}
		if (this.state.isOpen) {
			className += " open";
		}
		if (this.props.style) {
			className += " style-" + this.props.style;
		} else {
			className += " style-" + SETTINGS.style;
		}
		return className;
	};
	public open = () => {
		if (!this.state.isOpen) this.setState({ isOpen: true });
	};
	public close = () => {
		if (this.state.isOpen) this.setState({ isOpen: false });
	};
	public toggle = () => {
		if (this.state.isOpen) {
			this.close();
		} else {
			this.open();
		}
	};

	componentDidMount() {
		if (this.props.isOpen) this.open();
		if (this.props.defaultOpen) this.open();
	}
	componentDidUpdate(lastProps: ArrowBoxProps) {
		if (this.props.isOpen !== lastProps.isOpen) {
			if (this.props.isOpen) {
				this.open();
			} else {
				this.close();
			}
		}
	}

	render() {
		return (
			<div className={this.buildClassName()}>
				{this.state.isOpen && (
					<>
						<div className="onedash-arrow-box__bg" onClick={this.close}></div>
						<div className="onedash-arrow-box__wrapper">
							<div className="onedash-arrow-box__content">
								{this.props.title && (
									<div className="onedash-arrow-box__content-title">{this.props.title}</div>
								)}
								<div className="onedash-arrow-box__content-children">{this.props.children}</div>
							</div>
						</div>
					</>
				)}
			</div>
		);
	}
}

export default ArrowBox;
