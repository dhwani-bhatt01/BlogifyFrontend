import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SinglePost from "./components/singlePost/SinglePost";
import Topbar from "./components/topbar/Topbar";
import { Context } from "./context/Context";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Write from "./pages/write/Write";

function App() {
	const { user } = useContext(Context);
	return (
		<BrowserRouter>
			<Topbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={user ? <Home /> : <Register />} />
				<Route path="/login" element={user ? <Home /> : <Login />} />
				<Route path="/write" element={user ? <Write /> : <Register />} />
				<Route path="/settings" element={user ? <Settings /> : <Register />} />
				<Route path="/post/:postId" element={<SinglePost />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
