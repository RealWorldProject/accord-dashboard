import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardSideBar from "./components/DashboardSideBar";
import { useState } from "react";

function App() {
	const [isAuth, setIsAuth] = useState(true);
	return (
		<div className="App">
			<Router>
				{isAuth ? <DashboardSideBar /> : <PublicRoutes />}
				<ToastContainer position="top-center" />
			</Router>
		</div>
	);
}
const PublicRoutes = () => {
	return (
		<Switch>
			<Route exact path="/login" component={Login} />
			<Route path="*" exact>
				<Redirect to="/login" />
			</Route>
		</Switch>
	);
};
function PrivateRoutes() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/dashboard" component={DashboardSideBar} />
				<Route path="*" exact>
					<Redirect to="/dashboard" />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
