import axios from "axios";

export const axiosBaseURL = axios.create({
  baseURL: "http://localhost:5000/api",
});
