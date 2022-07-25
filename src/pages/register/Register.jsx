import { useState } from "react";
import { axiosBaseURL } from "../../constants/axios";
import "./register.css";

export default function Register() {
	const [username, setUserame] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(false);
		try {
			console.log({ username, email, password });
			const res = await axiosBaseURL.post("/auth/register", {
				username,
				email,
				password,
			});
			console.log({ res });
			res.data && window.location.replace("/login");
		} catch (err) {
			console.log({ err });
			setError(true);
		}
	};

	return (
		<div className="loginbg flex flex-col items-center justify-center h-screen">
			<div className="login shadow-lg rounded-md w-96 py-9 bg-white/20 backdrop-blur-lg">
				<span className="text-5xl font-bold text-white">Sign up</span>
				<form className="registerForm" onSubmit={handleSubmit}>
					<label className="text-white">Username</label>
					<input
						type="text"
						className="bg-white/30 text-white placeholder:text-white py-2 px-3 w-64 rounded"
						placeholder="Enter your username..."
						onChange={(e) => setUserame(e.target.value)}
					/>
					<label className="text-white">Email</label>
					<input
						type="text"
						className="bg-white/30 text-white placeholder:text-white py-2 px-3 w-64 rounded"
						placeholder="Enter your email..."
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label className="text-white">Password</label>
					<input
						type="password"
						className="bg-white/30 text-white placeholder:text-white py-2 px-3 w-64 rounded"
						placeholder="Enter your password..."
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className="bg-blue-500 text-white py-2 mt-6 rounded"
						type="submit"
					>
						Register
					</button>
				</form>
				{error && (
					<span style={{ color: "red", marginTop: "10px" }}>
						Something went wrong!
					</span>
				)}
			</div>
		</div>
	);
}
