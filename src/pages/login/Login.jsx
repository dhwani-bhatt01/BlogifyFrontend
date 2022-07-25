import { useContext, useRef } from "react";
import { axiosBaseURL } from "../../constants/axios";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
	const userRef = useRef();
	const passwordRef = useRef();
	const { dispatch, isFetching } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "LOGIN_START" });
		try {
			console.log({
				username: userRef.current.value,
				password: passwordRef.current.value,
			});
			const res = await axiosBaseURL.post("/auth/login", {
				username: userRef.current.value,
				password: passwordRef.current.value,
			});
			console.log({ res });
			dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
		} catch (err) {
			console.log({ err });
			dispatch({ type: "LOGIN_FAILURE" });
		}
	};
	return (
		<div className="loginbg flex flex-col items-center justify-center h-screen">
			<div className="login shadow-lg rounded-md w-96 py-9 bg-white/20 backdrop-blur-lg">
				<span className="text-5xl font-bold text-white">Login</span>
				<form className="loginForm" onSubmit={handleSubmit}>
					<label className="text-white">Username</label>
					<input
						type="text"
						className="bg-white/30 text-white placeholder:text-white py-2 px-3 w-64 rounded"
						placeholder="Enter your username..."
						ref={userRef}
					/>
					<label className="text-white">Password</label>
					<input
						type="password"
						className="bg-white/30 text-white placeholder:text-white py-2 px-3 w-64 rounded"
						placeholder="Enter your password..."
						ref={passwordRef}
					/>
					<button
						className="bg-blue-500 text-white py-2 mt-6 rounded"
						type="submit"
						disabled={isFetching}
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
