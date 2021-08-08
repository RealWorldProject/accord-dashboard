import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { LOADING } from "../utils/status";
import { CircularProgress } from "@material-ui/core";
import { getOrders } from "../redux/slices/order.slice";
import OrderDetailsDialog from "../components/Dialogs/OrderDetailsDialog";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	margin: {
		marginLeft: theme.spacing(1),
	},
}));

function Orders() {
	document.title = "Orders";
	const classes = useStyles();
	// state
	const [viewOrderData, setViewOrderData] = useState({});
	const [detailsOpen, setDetailsOpen] = useState(false);
	const order = useSelector((state) => state.order);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOrders());
	}, [dispatch]);

	const dummyData = [
		{
			fullName: "Test",
			phoneNumber: "9860180332",
			state: "Bagmati",
			city: "Banepa",
			area: "Tindobato",
			address: "nepal",
			coordinates: "jjsjsjs,kakakka",
			orderID: "1122445",
			userID: {
				username: "test",
				fullName: "test man",
				email: "testman@gmail.com",
			},
			orderItems: [
				{
					bookName: "Small Data",
					bookAuthor: "watman",
					bookImage: "shit",
					bookPrice: "321321",
					quantity: "wat",
					totalPrice: "123",
				},
			],
			orderTotalPrice: "243243",
			createdAt: Date.now(),
		},
	];

	const columns = [
		{
			name: "orderID",
			label: "Order ID",
		},
		{
			name: "orderTotalPrice",
			label: "Price",
		},
		{
			name: "userID",
			label: "Ordered By",
			options: {
				customBodyRender: (value, _, updatedValue) => {
					return <Typography>{value.email}</Typography>;
				},
			},
		},
		{
			name: "View Details",
			options: {
				customBodyRender: (value, tableMeta, updatedValue) => {
					return (
						<div>
							<Button
								variant="outlined"
								color="primary"
								onClick={() => {
									setViewOrderData(
										order.data[tableMeta.rowIndex]
										// dummyData[tableMeta.rowIndex]
									);
									setDetailsOpen(true);
								}}
							>
								View Details
							</Button>
						</div>
					);
				},
			},
		},
	];

	if (order.getStatus === LOADING) {
		return <CircularProgress />;
	}

	return (
		<div>
			<MUIDataTable
				columns={columns}
				title={"Orders"}
				data={order.data}
				options={{
					selectableRows: false,
				}}
			/>
			{viewOrderData.fullName ? (
				<OrderDetailsDialog
					detailsOpen={detailsOpen}
					setDetailsOpen={setDetailsOpen}
					order={viewOrderData}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default Orders;
