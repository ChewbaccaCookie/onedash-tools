import React, { Component } from "react";
import Cookies from "js-cookie";
import "./DarkLightModeSwitch.scss";

interface DarkLightModeSwitchProps {
	mode?: "light" | "dark";
	onModeChange?: (mode: "light" | "dark") => void;
	cookie: boolean;
}

class DarkLightModeSwitch extends Component<DarkLightModeSwitchProps> {
	state = {
		light: true, // Default is light theme
	};
	componentDidMount() {
		// Load by cookie
		if (this.props.cookie === true && this.props.mode === undefined) {
			const mode = Cookies.get("theme");
			if (mode) this.setState({ light: mode !== "dark" ? true : false });
		}
		// Load by prop
		if (this.props.mode !== undefined) {
			this.setState({ light: this.props.mode === "light" ? true : false });
		}

		// Load by device preferences {
		this.setState({ light: window.matchMedia("(prefers-color-scheme: light)").matches === true });

		window.matchMedia("(prefers-color-scheme: dark)").addListener((e) => e.matches && this.setColorTheme("dark"));
		window.matchMedia("(prefers-color-scheme: light)").addListener((e) => e.matches && this.setColorTheme("light"));
	}

	componentDidUpdate(lastProps: DarkLightModeSwitchProps) {
		if (lastProps.mode !== this.props.mode) {
			this.setState({ light: this.props.mode === "light" ? true : false });
		}
	}
	public setColorTheme = (theme: "dark" | "light") => {
		if (this.props.cookie) Cookies.set("theme", theme);
		this.setState({ light: theme === "light" ? true : false });
		if (this.props.onModeChange) this.props.onModeChange(theme);
	};
	public toggleMode = () => {
		if (this.props.cookie) Cookies.set("theme", this.state.light === false ? "light" : "dark");
		this.setState({ light: !this.state.light });
		if (this.props.onModeChange) this.props.onModeChange(this.state.light === true ? "light" : "dark");
	};

	private buildClassName = (defaultClassName: string, darkModeClassName: string) => {
		return this.state.light === true ? defaultClassName : defaultClassName + " " + darkModeClassName;
	};
	render() {
		return (
			<div className="dark-light-switch">
				<div className={this.buildClassName("sun-box", "move")}>
					<div className="sun"></div>
				</div>
				<div className={this.buildClassName("moon-box", "move")}>
					<div className="moon"></div>
				</div>

				<div className="btn">
					<div className={this.buildClassName("btn__background", "color")} onClick={this.toggleMode}>
						<div className={this.buildClassName("btn__face", "move")}>
							<div className={this.buildClassName("btn__animation", "move")}>
								<span className={this.buildClassName("btn__eye-left", "close")}></span>
								<span className={this.buildClassName("btn__eye-right", "close")}></span>
								<span className={this.buildClassName("btn__mouth", "close")}></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DarkLightModeSwitch;
