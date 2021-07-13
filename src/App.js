import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route path="*" exact>
						<Redirect to="/login" />
					</Route>
				</Switch>
				<ToastContainer position="top-center" />
			</Router>
		</div>
	);
}

export default App;
