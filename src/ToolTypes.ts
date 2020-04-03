export type styles = "none" | "minimal" | "twenty";
export interface ValueLabelPair {
	label: string;
	value: any;
}
export interface StyleLoaderStyle {
	dark: {
		[property: string]: string;
	};
	light: {
		[property: string]: string;
	};
	all: {
		[property: string]: string;
	};
}
