import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./write.css";

export default function Write() {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [file, setFile] = useState(null);
	const { user } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newPost = {
			username: user.username,
			title,
			desc,
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);
			newPost.photo = filename;
			try {
				await axios.post("/upload", data);
			} catch (err) {
				console.log({ err });
			}
		}
		try {
			const res = await axios.post("/posts", newPost);
			console.log({ res });
			window.location.replace("/post/" + res.data._id);
		} catch (err) {
			console.log({ err });
		}
	};

	return (
		<div className="mt-28">
			{file && (
				<img
					src={URL.createObjectURL(file)}
					alt=""
					className="writeImg mx-auto"
				/>
			)}

			<form className="flex flex-col items-center" onSubmit={handleSubmit}>
				<div className="writeFormGroup">
					<label htmlFor="fileInput">
						<i className="fa-solid fa-plus"></i>
					</label>
					<input
						type="file"
						id="fileInput"
						style={{ display: "none" }}
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<input
						type="text"
						placeholder="Title"
						className="writeInput"
						autoFocus={true}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="writeFormGroup">
					<textarea
						placeholder="Tell your story..."
						type="text"
						className="writeInput writeText"
						onChange={(e) => setDesc(e.target.value)}
					></textarea>
				</div>
				<button
					className="bg-blue-500 text-white w-24 py-2 rounded-md"
					type="submit"
				>
					Publish
				</button>
			</form>
		</div>
	);
}
