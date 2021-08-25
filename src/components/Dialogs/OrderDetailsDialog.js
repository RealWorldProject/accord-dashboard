import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { Grid, makeStyles } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { TableContainer } from "@material-ui/core";
import { Table } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import ShowOrderTest from "../Text/ShowOrderTest";
import { Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	margin: {
		marginTop: theme.spacing(1),
	},
	left: {
		paddingLeft: theme.spacing(1),
	},
	mleft: {
		marginLeft: theme.spacing(1),
	},
	image: {
		width: "262px",
		height: "400px",
	},
	large: {
		width: "50px",
		height: "50px",
	},
}));

export default function OrderDetailsDialog({
	detailsOpen,
	setDetailsOpen,
	order,
}) {
	const handleClose = () => {
		setDetailsOpen(false);
	};
	const classes = useStyles();

	return (
		<div>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={detailsOpen}
				maxWidth="md"
				fullWidth={true}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Order Details
					{order.status === "PENDING" ? (
						<Chip
							label="PENDING"
							color="primary"
							className={classes.mleft}
						/>
					) : (
						<Chip
							label="CANCELLED"
							color="secondary"
							className={classes.mleft}
						/>
					)}
				</DialogTitle>
				<DialogContent dividers>
					<Grid container>
						<Grid item md={6}>
							<Typography>Order Info</Typography>
							<ShowOrderTest
								name="Ordered At"
								data={new Date(order.createdAt).toDateString()}
							/>
							<ShowOrderTest
								name="Ordered Number"
								data={order.orderID}
							/>
						</Grid>
						<Grid item md={6}>
							<Typography>User Info</Typography>
							<ShowOrderTest name="Name" data={order.fullName} />
							<ShowOrderTest
								name="Contact Number"
								data={order.phoneNumber}
							/>
						</Grid>
					</Grid>
					<Divider />
					<Typography className={classes.margin}>
						Shipping Info
					</Typography>
					<Grid container>
						<Grid item md={6}>
							<ShowOrderTest
								name="Address"
								data={`${order.state}, ${order.city}, ${order.area}`}
							/>
							<ShowOrderTest
								name="Payment Method"
								data={order.paymentGateway}
							/>
						</Grid>
						<Grid item md={6}>
							{order.coordinates ? (
								<ShowOrderTest
									name="Coordinates"
									data={order.coordinates}
								/>
							) : (
								""
							)}
							{order.address ? (
								<ShowOrderTest
									name="Address 2"
									data={order.address}
								/>
							) : (
								""
							)}
						</Grid>
					</Grid>

					<Divider />

					<Typography className={classes.margin}>Items</Typography>

					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Author</TableCell>
									<TableCell>Price</TableCell>
									<TableCell>quantity</TableCell>
									<TableCell>Total Price</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{order.orderItems.map((item) => {
									return (
										<TableRow key={item.id}>
											<TableCell>
												{item.bookName}
											</TableCell>
											<TableCell>
												{item.bookAuthor}
											</TableCell>
											<TableCell>
												{item.bookPrice}
											</TableCell>
											<TableCell>
												{item.quantity}
											</TableCell>
											<TableCell>
												{item.totalPrice}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
					<Typography
						variant="h6"
						className={classes.margin}
						align="right"
					>
						Grand Total: {order.orderTotalPrice}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Grid container>
						<Grid item xs={1}>
							<Avatar
								alt="Ordered By"
								src={order.userID.image}
								className={classes.large}
							>
								{order.userID.email[0]}
							</Avatar>
						</Grid>
						<Grid item xs={10} className={classes.left}>
							<Typography align="left">
								{order.userID.fullName}
							</Typography>
							<Typography align="left">
								{order.userID.email}
							</Typography>
						</Grid>
					</Grid>
				</DialogActions>
			</Dialog>
		</div>
	);
}
