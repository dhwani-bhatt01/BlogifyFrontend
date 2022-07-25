import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Posts from "../../components/posts/Posts";
import { axiosBaseURL } from "../../constants/axios";
import Hero from "../../img/hero.jpg";
import "./home.css";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const { search } = useLocation();

	const user = search.split("=").pop();

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axiosBaseURL.get("/posts" + search);
			setPosts(res.data);
		};
		fetchPosts();
	}, [search]);

	return (
		<div className="mt-28">
			{user ? (
				<h1 className="text-center text-3xl font-bold mb-12">
					📘 Skribbles from Blogifyer:
					<span className="text-blue-500"> {user}</span>
				</h1>
			) : (
				<div className="max-w-7xl mx-auto flex items-center justify-around">
					<img src={Hero} alt="Hero" className="max-w-xl" />
					<div className="">
						<h1 className="text-5xl leading-snug font-extrabold mb-10">
							Amplify your thoughts <br /> with{" "}
							<span className="text-blue-500">Blogify!</span>
						</h1>
						<Link to="/write">
							<span className="bg-blue-500 text-white px-8 py-3 text-lg font-bold rounded-md">
								Start Blogging 📝
							</span>
						</Link>
					</div>
				</div>
			)}
			<Posts posts={posts} />
			<div className="bg-gray-800 text-white py-5 text-sm text-center">
				&copy; All rights reserved 2022
			</div>
		</div>
	);
}
