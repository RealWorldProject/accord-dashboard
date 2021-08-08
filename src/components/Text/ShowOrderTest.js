import { Typography } from "@material-ui/core";
import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	nameText: {
		fontWeight: 500,
	},
	text: {
		fontSize: "0.9rem",
	},
}));
const ShowOrderTest = ({ name, data }) => {
	const classes = useStyles();
	return (
		<Typography variant="subtitle1" className={classes.text}>
			<span className={classes.nameText}>{name}: </span>
			<span>{data}</span>
		</Typography>
	);
};

export default ShowOrderTest;
