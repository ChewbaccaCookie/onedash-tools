import Axios from "axios";

export default class ServerStatus {
	private readonly serverPath: string;
	private readonly serviceID: string;
	private readonly redirectPath: string;
	private intervall: number;
	constructor(serverPath: string, serviceID: string, redirectPath = "/maintenance", pollingIntervall = 60000) {
		if (serverPath.charAt(serverPath.length - 1) === "/") {
			serverPath = serverPath.substring(0, serverPath.length - 1);
		}
		this.serverPath = serverPath;
		this.serviceID = serviceID;
		this.redirectPath = redirectPath;
		this.intervall = setInterval(this.checkStatus, pollingIntervall) as any;
	}

	private checkStatus = () => {
		Axios.get(`${this.serverPath}/status/${this.serviceID}`)
			.then((res) => {
				if (res.data?.data && res.data?.data === "under_maintenance") {
					// Under maintenance => Redirect
					window.location.href = this.redirectPath;
				}
			})
			.catch(() => {
				// Service cannot be found?
			});
	};

	public destroy = () => {
		clearInterval(this.intervall);
	};
}
