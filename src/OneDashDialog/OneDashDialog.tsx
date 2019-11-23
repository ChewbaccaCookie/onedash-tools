import React, { Component } from "react";

import "./OneDashDialog.scss";

class OneDashDialog extends Component<DialogProps> {
	state = {
		isOpen: false,
		dialogCloses: false,
	};
	toggleScrollLock = () => {
		const body = document.querySelector("body");
		if (body) {
			if (this.state.isOpen) {
				body.classList.add("scrollingDisabled");
				body.classList.remove("scrollingEnabled");
			} else {
				body.classList.add("scrollingEnabled");
				body.classList.remove("scrollingDisabled");
			}
		}
	};
	public open = () => {
		this.setState(
			{
				isOpen: true,
			},
			this.toggleScrollLock
		);
	};
	public close = (forceClose?: any) => {
		if ((typeof forceClose !== "boolean" || forceClose === false) && !this.props.closeable && !this.props.closeByX)
			return;
		this.setState({
			dialogCloses: true,
		});
		setTimeout(() => {
			this.setState(
				{
					isOpen: false,
					dialogCloses: false,
				},
				this.toggleScrollLock
			);
		}, 300);
	};

	public toggleOpen = () => {
		this.setState(
			{
				isOpen: !this.state.isOpen,
			},
			this.toggleScrollLock
		);
	};
	public isOpen = () => {
		return this.state.isOpen;
	};
	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyDown);
		this.setState(
			{
				isOpen: this.props.isOpen,
			},
			this.toggleScrollLock
		);
	}
	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyDown);
	}
	handleKeyDown = (e: any) => {
		if (e.keyCode === 27 && (this.props.closeable === true || this.props.closeByX === true)) {
			if (this.state.isOpen) {
				this.close();
			}
		}
	};

	buildClassName = () => {
		let classList = "dialog-container";
		if (this.state.isOpen) {
			classList += " dialog-open";
		}
		if (this.state.dialogCloses) {
			classList += " dialog-closes";
		}
		if (this.props.bigPadding) {
			classList += " big-padding";
		}
		if (this.props.dialogStyle === "ios") {
			classList += " dialog-style-ios";
		}
		if (this.props.className) {
			classList += " " + this.props.className;
		}
		return classList;
	};

	render() {
		return (
			<section className={this.buildClassName()}>
				<div className="dialog" style={{ maxWidth: this.props.maxWidth }}>
					<div className="dialog-main-content">
						{this.props.title && <h2 className="dialog-headding">{this.props.title}</h2>}

						{(this.props.closeable || this.props.closeByX) && (
							<div className="dialog-close" onClick={this.toggleOpen}>
								<i className="fas fa-times" />
							</div>
						)}

						<div className="dialog-content">{this.props.children}</div>
					</div>
					{this.props.onSaveButtonClick && (
						<div className="dialog-footer">
							<button className="dialog-footer-close" onClick={this.close}>
								{this.props.closeBtnText}
								{!this.props.closeBtnText && <>Schließen</>}
							</button>
							<button className="dialog-save" onClick={this.props.onSaveButtonClick}>
								{this.props.saveBtnText}
								{!this.props.saveBtnText && <>Speichern</>}
							</button>
						</div>
					)}
					{!this.props.onSaveButtonClick && this.props.closeable && (
						<div className="dialog-footer">
							<button className="dialog-footer-close" onClick={this.close}>
								{this.props.closeBtnText}
								{!this.props.closeBtnText && <>Schließen</>}
							</button>
						</div>
					)}
				</div>

				<div className="dialog-bg" />
			</section>
		);
	}
}

export default OneDashDialog;
