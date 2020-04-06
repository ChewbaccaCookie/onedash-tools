import dayjs, { Dayjs } from "dayjs";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

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

	static lockScrolling = (target?: any) => {
		disableBodyScroll(target);
	};
	static unlockScrolling = (target?: any) => {
		enableBodyScroll(target);
	};
	static clearAllBodyScrollLocks = () => {
		clearAllBodyScrollLocks();
	};
}
