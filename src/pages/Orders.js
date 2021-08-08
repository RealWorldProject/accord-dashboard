import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "@material-ui/core";
import { LOADING } from "../utils/status";
import { CircularProgress } from "@material-ui/core";
import { getOrders } from "../redux/slices/order.slice";
import OrderDetailsDialog from "../components/Dialogs/OrderDetailsDialog";
import { Typography } from "@material-ui/core";

function Orders() {
	document.title = "Orders";
	// state
	const [viewOrderData, setViewOrderData] = useState({});
	const [detailsOpen, setDetailsOpen] = useState(false);
	const order = useSelector((state) => state.order);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOrders());
	}, [dispatch]);

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
