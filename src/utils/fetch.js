import Axios from "axios";

export const publicFetch = Axios.create();

export const privateFetch = Axios.create({
	headers: {
		authorization: "Bearer " + localStorage.getItem("token"),
	},
});
