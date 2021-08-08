import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { LOADING } from "../utils/status";
import { CircularProgress } from "@material-ui/core";
import { getUsers } from "../redux/slices/users.slice";
import SuspendUserDialog from "../components/Dialogs/SuspendUserDialog";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	margin: {
		marginLeft: theme.spacing(1),
	},
}));

function Users() {
	document.title = "Users";
	const classes = useStyles();
	// state
	const [userID, setUserID] = useState("");
	const [rejectConfirmDialog, setRejectConfirmDialog] = useState(false);
	const users = useSelector((state) => state.users);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const columns = [
		{
			name: "email",
			label: "Email",
		},
		{
			name: "isSuspended",
			label: "Is Suspended",
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					if (value) {
						return <Typography>Yes</Typography>;
					} else {
						return <Typography>No</Typography>;
					}
				},
			},
		},
		{
			name: "Actions",
			options: {
				filter: true,
				sort: false,
				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<div>
							<Button
								className={classes.margin}
								variant="outlined"
								color="secondary"
								onClick={() => {
									setUserID(
										users.data[tableMeta.rowIndex]._id
									);
									setRejectConfirmDialog(true);
								}}
							>
								Suspend
							</Button>
						</div>
					);
				},
			},
		},
	];

	if (users.status === LOADING) {
		return <CircularProgress />;
	}

	return (
		<div>
			<MUIDataTable
				columns={columns}
				title={"Users"}
				data={users.data}
				options={{
					selectableRows: false,
				}}
			/>
			{userID !== "" ? (
				<SuspendUserDialog
					rejectConfirmDialog={rejectConfirmDialog}
					userID={userID}
					onCancelBtnClick={() => setRejectConfirmDialog(false)}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default Users;
