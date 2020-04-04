import React, { Component } from "react";
import "./styles/twenty.scss";
import SETTINGS from "../Utils/Settings";
import Utils from "../Utils/Utils";
import DButton from "./DialogButton";
import { DialogProps, DialogButton } from "./DialogTypes";

const defaultValues = {
	maxWidth: 600,
};

class Dialog extends Component<DialogProps> {
	submitButton = React.createRef<DButton>();
	state = {
		isOpen: false,
		dialogCloses: false,
	};
	componentDidMount() {
		if (this.props.isOpen === true) {
			this.show();
		} else {
			this.hide();
		}
	}
	componentDidUpdate(lastProps: DialogProps) {
		if (lastProps.isOpen !== this.props.isOpen) {
			if (this.props.isOpen === true) {
				this.show();
			} else {
				this.hide();
			}
		}
	}

	private getClasses = () => {
		let classList = "onedash-dialog";
		if (this.props.className) {
			classList += " " + this.props.className;
		}
		if (this.state.isOpen) {
			classList += " dialog-visible";
		}
		if (this.state.dialogCloses) {
			classList += " dialog-closes";
		}
		if (this.props.style) {
			classList += " style-" + this.props.style;
		} else {
			classList += " style-" + SETTINGS.style;
		}
		return classList;
	};

	private onKeyDown = (e: any) => {
		if (
			e.key === "Escape" &&
			(!this.props.settings ||
				this.props.settings.escapeClose === undefined ||
				this.props.settings.escapeClose === true)
		)
			this.hide();
	};

	public hide = (forceClose?: boolean) => {
		if (!this.isCloseable() && !forceClose) return;
		document.removeEventListener("keydown", this.onKeyDown);
		Utils.unlockScrolling();
		this.setState({ dialogCloses: true });
		if (this.props.onClose) this.props.onClose();
		setTimeout(() => {
			this.setState({ isOpen: false });
		}, 300);
	};
	public show = () => {
		document.addEventListener("keydown", this.onKeyDown);
		Utils.lockScrolling();
		this.setState({ dialogCloses: false, isOpen: true });

		setTimeout(() => {
			if (this.submitButton.current) {
				this.submitButton.current.focus();
			}
		}, 300);
	};

	private isCloseable = () => {
		return this.props.closeable === undefined || this.props.closeable === true;
	};

	wrapperClick = (e: any) => {
		if (this.props.settings?.wrapperClickClose === undefined || this.props.settings.wrapperClickClose === true) {
			if (e.target.classList.contains("dialog-wrapper")) this.hide();
		}
	};

	render() {
		const maxWidth = this.props.settings?.maxWidth ? this.props.settings.maxWidth : defaultValues.maxWidth;
		const showX = this.props.settings?.showX !== undefined ? this.props.settings.showX : true;

		const buttons: DialogButton[] = this.props.buttons
			? this.props.buttons
			: this.isCloseable()
			? [{ type: "close", closeOnClick: true, mode: "light" }]
			: [];

		return (
			<section style={this.props.cssStyles} className={this.getClasses()}>
				<div className="dialog-wrapper" onClick={this.wrapperClick}>
					<div className="dialog" style={{ maxWidth }}>
						<div>
							{this.props.title && <h2 className="dialog-title">{this.props.title}</h2>}

							{this.isCloseable() && showX && (
								<div className="dialog-close" onClick={this.hide}>
									<span />
									<span />
								</div>
							)}

							<div className="dialog-content">{this.props.children}</div>
						</div>
						{buttons.length > 0 && (
							<div className="dialog-footer">
								<div className="left">
									{buttons
										.filter((x) => x.side === "left")
										.map((button, i) => (
											<DButton
												ref={button.submitButton === true ? this.submitButton : undefined}
												key={i}
												button={button}
												hide={this.hide}
											/>
										))}
								</div>
								<div className="right">
									{buttons
										.filter((x) => x.side === "right" || x.side === undefined)
										.map((button, i) => (
											<DButton
												ref={button.submitButton === true ? this.submitButton : undefined}
												key={i}
												button={button}
												hide={this.hide}
											/>
										))}
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="dialog-bg" />
			</section>
		);
	}
}

export default Dialog;
