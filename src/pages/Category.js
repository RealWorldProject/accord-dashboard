import { makeStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import AddEditCategoryDialog from "../components/Dialogs/AddEditCategoryDialog";

const useStyles = makeStyles((theme) => ({
	fab: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));

function Category() {
	document.title = "Categories";
	const classes = useStyles();
	// states
	const [addOpen, setAddOpen] = useState(false);

	const handleClickOpen = () => {
		setAddOpen(true);
	};

	const columns = ["category", "slug", "image", "actions"];
	const data = [
		{
			category: "Non-Fiction",
			slug: "non-fiction",
			image: "http://demo",
			actions: "Edit | Delete",
		},
		{
			category: "Educational",
			slug: "educational",
			image: "http://demo",
			actions: "Edit | Delete",
		},
	];

	return (
		<div>
			<MUIDataTable title={"Categories"} data={data} columns={columns} />
			<Fab
				className={classes.fab}
				onClick={handleClickOpen}
				color="primary"
				aria-label="add"
			>
				<AddIcon />
			</Fab>

			<AddEditCategoryDialog open={addOpen} setOpen={setAddOpen} />
		</div>
	);
}

export default Category;
