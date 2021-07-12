import Axios from "axios";

export const publicFetch = Axios.create();

export const privateFetch = Axios.create({
	headers: {
		"auth-token": localStorage.getItem("token"),
	},
});
