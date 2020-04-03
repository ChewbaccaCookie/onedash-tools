import * as React from "react";

export interface MediaRenderProps {
	size?: number;
	type: "mobile" | "desktop";
}

class MediaRender extends React.Component<MediaRenderProps> {
	state = { isRendered: false };
	width = 720;

	resize = () => {
		if (this.props.type === "mobile") {
			if (window.innerWidth < this.width) {
				this.setState({ isRendered: true });
			} else {
				this.setState({ isRendered: false });
			}
		} else {
			if (window.innerWidth > this.width) {
				this.setState({ isRendered: true });
			} else {
				this.setState({ isRendered: false });
			}
		}
	};

	componentDidMount() {
		window.addEventListener("resize", this.resize);
		if (this.props.size) {
			this.width = this.props.size;
		}

		if (this.props.type === "mobile") {
			if (window.innerWidth < this.width) {
				this.setState({ isRendered: true });
			}
		} else {
			if (window.innerWidth > this.width) {
				this.setState({ isRendered: true });
			}
		}
	}

	render() {
		return <>{this.state.isRendered && this.props.children}</>;
	}
}

export default MediaRender;
