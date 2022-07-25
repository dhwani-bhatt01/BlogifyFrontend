import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function Topbar() {
	const { user, dispatch } = useContext(Context);
	const PF = "https://blogify-app-backend.herokuapp.com/images/";

	let img = "default.png";
	if (user && user?.profilePic) {
		img = user.profilePic;
	}

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
	};

	return (
		<div className="py-3 px-8 w-full shadow-md fixed bg-white z-10 top-0">
			<div className="mx-auto max-w-7xl flex items-center justify-between">
				<h1 className="text-2xl font-bold">
					<Link to="/">Blogify</Link>
				</h1>
				<ul className="flex items-center">
					<li className="mx-4">
						<Link to="/">Home</Link>
					</li>
					<li className="mx-4">
						<Link to="/write">Write</Link>
					</li>
					{user ? (
						<>
							<li
								className="cursor-pointer mx-4 bg-blue-500 text-white px-4 py-1 rounded-md"
								onClick={handleLogout}
							>
								Log out
							</li>
							<li>
								<Link to="/settings">
									<img
										className="w-10 h-10 object-cover rounded-full"
										src={PF + img}
										alt=""
									/>
								</Link>
							</li>
						</>
					) : (
						<>
							<li className="mx-4 bg-blue-500 text-white px-4 py-1 rounded-md">
								<Link to="/login">Login</Link>
							</li>
							<li className="mx-4 bg-blue-500 text-white px-4 py-1 rounded-md">
								<Link to="/register">Sign up</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
}
