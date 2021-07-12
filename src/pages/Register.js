import { useState } from "react";
import "./Auth.scss";
import RegisterImage from "./register.jpg";
import { Link, useHistory } from "react-router-dom";
import { publicFetch } from "../utils/fetch";
import { toast } from "react-toastify";

function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [cpError, setCpError] = useState("");

	const history = useHistory();

	const validate = () => {
		if (email === "") {
			setEmailError("Email is Required");
			return false;
		} else {
			setEmailError("");
		}

		if (password === "") {
			setPasswordError("Password is Required");
			return false;
		} else {
			setPasswordError("");
		}

		if (confirmPassword === "") {
			setCpError("Please Confirm the password");
			return false;
		} else {
			setCpError("");
		}

		if (password !== confirmPassword) return false;

		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validate()) {
			const data = { email, password };
			console.log(data);
			try {
				const response = await publicFetch.post(
					"/api/v1/user/register",
					data
				);

				if (response.data.success) {
					toast.success("User Registered");
				}
				// go to login
				history.push("/login");
			} catch (error) {
				console.log(error.response);
				toast.error(error.response.data.message);
			}
		}
	};
	return (
		<div className="auth-container">
			<div className="auth-container__content">
				<div className="content">
					<h1 className="heading">Accord</h1>
					<p>Register for Divine Experience</p>
					<form onSubmit={handleSubmit} className="l-form">
						<div className="form-g">
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<span className="error">{emailError}</span>
						</div>
						<div className="form-g">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<span className="error">{passwordError}</span>
						</div>
						<div className="form-g">
							<label htmlFor="confirmPassword">
								Confirm Password:
							</label>
							<input
								type="password"
								id="confirmPassword"
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
									if (e.target.value !== password)
										setCpError("Passwords Don't Match");
									else setCpError("");
								}}
							/>
							<span className="error">{cpError}</span>
						</div>
						<button type="submit" className="button">
							Register
						</button>
					</form>
					<p>
						Click <Link to="/login">Here</Link> to login
					</p>
				</div>
			</div>
			<div
				className="auth-container__image"
				style={{ backgroundImage: `url(${RegisterImage})` }}
			></div>
		</div>
	);
}

export default Register;
