import { useContext, useState } from "react";
import { axiosBaseURL } from "../../constants/axios";
import { Context } from "../../context/Context";
import "./settings.css";

export default function Settings() {
	const { user, dispatch } = useContext(Context);
	const [file, setFile] = useState(null);
	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState(false);

	const PF = "http://localhost:5000/images/";

	let img = "default.png";
	if (user && user?.profilePic) {
		img = user.profilePic;
	}

	console.log({ user });

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "UPDATE_START" });
		const updatedUser = {
			userId: user._id,
			username,
			email,
			password,
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);
			updatedUser.profilePic = filename;
			try {
				await axiosBaseURL.post("/upload", data);
			} catch (err) {}
		}
		try {
			const res = await axiosBaseURL.put("/users/" + user._id, updatedUser);
			setSuccess(true);
			dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
			window.location.replace("/");
		} catch (err) {
			dispatch({ type: "UPDATE_FAILURE" });
		}
	};

	return (
		<div className="settings">
			<div className="settingsWrapper max-w-md mx-auto">
				<form className="settingsForm" onSubmit={handleSubmit}>
					<label>Profile Picture</label>
					<div className="settingsPP">
						<img src={file ? URL.createObjectURL(file) : PF + img} alt="" />
						<label htmlFor="fileInput" className="ml-4 cursor-pointer">
							Click here...
						</label>
						<input
							type="file"
							id="fileInput"
							style={{ display: "none" }}
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</div>
					<label>Username</label>
					<input
						className="bg-gray-100 py-5 px-3"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label>Email</label>
					<input
						className="bg-gray-100 py-5 px-3"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>Password</label>
					<input
						className="bg-gray-100 py-5 px-3"
						type="password"
						placeholder="Enter your password..."
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="settingsSubmitButton" type="submit">
						Update
					</button>
					{success && (
						<span
							style={{ color: "green", textAlign: "center", marginTop: "20px" }}
						>
							Profile has been updated...
						</span>
					)}
				</form>
			</div>
		</div>
	);
}
