import dayjs, { Dayjs } from "dayjs";

export default class Utils {
	static generateGuid = () => {
		const S4 = function() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
	};

	static clone = (obj: any) => {
		return JSON.parse(JSON.stringify(obj));
	};

	static removeDate = (date: Dayjs | number) => {
		const d = dayjs(date);
		return d
			.set("y", 2000)
			.set("month", 0)
			.set("date", 0)
			.toDate()
			.getTime();
	};

	static setTime = (date: Dayjs | number, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) => {
		return dayjs(date)
			.set("h", hours)
			.set("m", minutes)
			.set("s", seconds)
			.set("millisecond", milliseconds)
			.toDate()
			.getTime();
	};

	static lockScrolling = () => {
		const body = document.querySelector("body");
		const html = document.querySelector("html");
		if (html && body) {
			body.classList.add("scrolling-locked");
			body.classList.remove("scrolling-unlocked");
			html.classList.add("scrolling-locked");
			html.classList.remove("scrolling-unlocked");
		}
	};
	static unlockScrolling = () => {
		const body = document.querySelector("body");
		const html = document.querySelector("html");
		if (html && body) {
			body.classList.remove("scrolling-locked");
			body.classList.add("scrolling-unlocked");
			html.classList.remove("scrolling-locked");
			html.classList.add("scrolling-unlocked");
		}
	};
}
