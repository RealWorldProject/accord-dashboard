import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import DashboardSideBar from "./components/DashboardSideBar";
import { useSelector } from "react-redux";

function App() {
	const user = useSelector((state) => state.user);
	return (
		<div className="App">
			<Router>
				{user.token !== "" ? <DashboardSideBar /> : <PublicRoutes />}
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

export default App;
