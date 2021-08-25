import { Box, Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import BookPieChart from "../components/Data/BookPieChart";
import { LOADING } from "../utils/status";
import { CircularProgress } from "@material-ui/core";
import { getStats } from "../redux/slices/stats.slice";
import UserPieChart from "../components/Data/UserPieChart";
import CategoryPieChart from "../components/Data/CategoryPieChart";

function Dashboard() {
	document.title = "Dashboard";
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getStats());
	}, [dispatch]);
	const statsState = useSelector((state) => state.stats);

	if (statsState.getStatus === LOADING) {
		return (
			<div
				style={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<CircularProgress />
			</div>
		);
	}
	return (
		<div>
			<Grid container spacing="2" justifyContent="space-between">
				<Grid item xs={3}>
					<Card>
						<CardContent>
							<Grid
								container
								justifyContent="space-between"
								spacing="1"
							>
								<Grid xs="6">
									<Typography
										align="center"
										variant="h4"
										gutterBottom
										color="secondary"
									>
										{statsState.data.users}
									</Typography>
									<Typography variant="h4" align="center">
										Users
									</Typography>
								</Grid>
								<Grid xs="6" alignContent="center">
									<Box
										display="flex"
										justifyContent="center"
										alignItems="center"
										height="100%"
									>
										<AccountCircleIcon
											style={{ fontSize: "5rem" }}
										/>
									</Box>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={4}>
					<Card>
						<CardContent>
							<Grid
								container
								justifyContent="space-between"
								spacing="1"
							>
								<Grid xs="6">
									<Typography
										align="center"
										variant="h4"
										gutterBottom
										color="secondary"
									>
										{statsState.data.books}
									</Typography>
									<Typography variant="h4" align="center">
										Books
									</Typography>
								</Grid>
								<Grid xs="6" alignContent="center">
									<Box
										display="flex"
										justifyContent="center"
										alignItems="center"
										height="100%"
									>
										<LocalLibraryIcon
											style={{ fontSize: "5rem" }}
										/>
									</Box>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={5}>
					<Card>
						<CardContent>
							<Grid
								container
								justifyContent="space-between"
								spacing="1"
							>
								<Grid xs="6">
									<Typography
										align="center"
										variant="h4"
										gutterBottom
										color="primary"
									>
										{statsState.data.orders}
									</Typography>
									<Typography variant="h4" align="center">
										Total Orders
									</Typography>
								</Grid>
								<Grid xs="6" alignContent="center">
									<Box
										display="flex"
										justifyContent="flex-end"
										alignItems="center"
										height="100%"
										style={{ width: "100%" }}
									>
										<AccountBalanceIcon
											style={{ fontSize: "5rem" }}
										/>
									</Box>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
			<div style={{ marginTop: "20px" }}>
				<Grid container spacing={1} justifyContent="space-between">
					<Grid item xs="3">
						<BookPieChart bookData={statsState.data.bookData} />
					</Grid>
					<Grid item xs="4">
						<CategoryPieChart
							bookData={statsState.data.booksWithCategoryName}
						/>
					</Grid>
					<Grid item xs="3">
						<UserPieChart bookData={statsState.data.userData} />
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default Dashboard;
