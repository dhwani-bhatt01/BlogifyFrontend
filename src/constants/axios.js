import axios from "axios";

export const axiosBaseURL = axios.create({
	// baseURL: "https://blogify-app-backend.herokuapp.com/api",
	baseURL: "https://blogify-backend-71q1.vercel.app/",
});
