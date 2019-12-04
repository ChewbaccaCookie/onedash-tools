import * as React from "react";
import { Component } from "react";
import "./OneDashPopover.scss";

export interface PopoverProps {
	className?: string;
	isOpen?: boolean;
	defaultOpen?: boolean;
	title?: string;
}

class OneDashPopover extends Component<PopoverProps> {
	state = {
		isOpen: false,
	};

	buildClassName = () => {
		let className = "onedash-popover";
		if (this.props.className) {
			className += " " + this.props.className;
		}
		if (this.state.isOpen) {
			className += " open";
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
	componentDidUpdate(lastProps: PopoverProps) {
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
						<div className="onedash-popover__bg" onClick={this.close}></div>
						<div className="onedash-popover__wrapper">
							<div className="onedash-popover__content">
								{this.props.title && <div className="onedash-popover__content-title">{this.props.title}</div>}
								<div className="onedash-popover__content-children">{this.props.children}</div>
							</div>
						</div>
					</>
				)}
			</div>
		);
	}
}

export default OneDashPopover;
