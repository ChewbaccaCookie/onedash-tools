import dayjs, { Dayjs } from "dayjs";

export default class OneDashUtils {
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
}
