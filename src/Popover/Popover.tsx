import * as React from "react";
import { Component } from "react";
import "./style/twenty.scss";
import Utils from "../Utils/Utils";
import SETTINGS from "../Utils/Settings";
import Button from "../Form/Button/Button";
import { styles } from "../ToolTypes";

export interface PopoverProps {
	title: string;
	onClose?: () => void;
	closeable?: boolean;
	className?: string;
	style?: styles;
	button?: {
		text?: string;
		onClick?: () => void;
	};
}

class Popover extends Component<PopoverProps> {
	state = {
		isClosing: false,
		isMoving: false,
		touchMargin: 0,
	};
	constructor(props: PopoverProps) {
		super(props);
	}
	preventDefault = (e: any) => {
		e.preventDefault();
	};
	componentDidMount() {
		Utils.lockScrolling();
		document.addEventListener("keydown", this.onKeyDown);
	}
	componentWillUnmount() {
		Utils.unlockScrolling();
		document.removeEventListener("keydown", this.onKeyDown);
		Utils.clearAllBodyScrollLocks();
	}

	private onKeyDown = (e: any) => {
		if (this.props.closeable === false || e.key !== "Escape") return;
		this.close();
	};

	close = (forceClose?: boolean) => {
		if (this.props.closeable === false && !(forceClose === true)) return;
		this.setState({
			isClosing: true,
		});
		setTimeout(() => {
			if (this.props.onClose) this.props.onClose();
		}, 250);
	};

	touchMove = (e: any) => {
		if (!this.touchValid(e)) return;
		this.touchMoveY = e.touches[0].clientY;
		if (this.touchMoveY - this.touchStartY > 0) {
			this.setState({ touchMargin: -Math.pow(this.touchMoveY - this.touchStartY, 1.05) });
		}
	};
	touchStartY = 0;
	touchMoveY = 0;

	touchValid = (e: any) => {
		const cl = e.target.classList;
		return (
			(cl.contains("popover") || cl.contains("popover-touchbar") || cl.contains("popover-title")) &&
			!(this.props.closeable === false)
		);
	};
	touchStart = (e: any) => {
		if (!this.touchValid(e)) return;
		this.touchStartY = e.touches[0].clientY;
	};
	touchEnd = (e: any) => {
		if (!this.touchValid(e)) return;
		const diff = this.touchMoveY - this.touchStartY;
		if (diff > 120) {
			this.close();
		} else {
			this.setState({ touchMargin: 0, isMoving: true });
			setTimeout(() => {
				this.setState({ isMoving: false });
			}, 250);
		}
	};
	buildClassName = () => {
		let className = "onedash-popover-wrapper";
		if (this.state.isClosing) {
			className += " isClosing";
		}
		if (this.state.isMoving) {
			className += " isMoving";
		}
		if (this.props.closeable === false) {
			className += " not-closeable";
		}

		if (this.props.style) {
			className += " style-" + this.props.style;
		} else {
			className += " style-" + SETTINGS.style;
		}
		return className;
	};

	render() {
		const { title } = this.props;
		return (
			<div className={this.buildClassName()}>
				<div className="popover-bg" onClick={() => this.close()}></div>

				<div
					className="popover"
					style={{ marginBottom: this.state.touchMargin }}
					onTouchStart={this.touchStart}
					onTouchEnd={this.touchEnd}
					onTouchMove={this.touchMove}>
					{(this.props.closeable === undefined || this.props.closeable === true) && (
						<>
							<div className="popover-touchbar"></div>
							<div className="popover-close page-close" onClick={() => this.close()}>
								<span></span>
								<span></span>
							</div>
						</>
					)}
					<div className="content">
						<h2 className="popover-title">{title}</h2>
						<div className="content-children">{this.props.children}</div>
					</div>
					{this.props.button && (
						<Button className="btn-next" onClick={this.props.button?.onClick}>
							{this.props.button.text}
						</Button>
					)}
				</div>
			</div>
		);
	}
}

export default Popover;
