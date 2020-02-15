import React, { Component } from "react";
import GenericInput from "../Generic/GenericInput";

interface InputProps extends GenericInputProps {}

class Input extends GenericInput<InputProps, any> {
	constructor(props) {
		super(props);
		this.reference = React.createRef();
	}
	protected _validate = () => {
		return true;
	};

	render() {
		return <div></div>;
	}
}

export default Input;
