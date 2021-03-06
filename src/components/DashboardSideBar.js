import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
import VerifyBooks from "../pages/VerifyBooks";
import Dashboard from "../pages/Dashboard";
import Category from "../pages/Category";
import Users from "../pages/Users";
import HomeIcon from "@material-ui/icons/Home";
import CategoryIcon from "@material-ui/icons/Category";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import CustomizedSnackbar from "./Snackbar/CustomizedSnackbar";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../redux/slices/user.slice";
import { useState } from "react";
import Orders from "../pages/Orders";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { Avatar } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: "auto",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function DashboardSideBar() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const dispatch = useDispatch();
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const userState = useSelector((state) => state.user);
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Grid container>
						<Grid item sm={11}>
							<Typography variant="h6" noWrap>
								Accord Dashboard
							</Typography>
						</Grid>
					</Grid>
					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<Avatar
								alt="admin profile"
								src={userState.user.image}
							/>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>
								Hello, {userState.user.fullName}
							</MenuItem>
							<MenuItem onClick={() => dispatch(removeToken())}>
								Log Out
							</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<List>
						<NavLink
							to="/dashboard"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<ListItem button>
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary={"Dashboard"} />
							</ListItem>
						</NavLink>
						<NavLink
							to="/books"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<ListItem button>
								<ListItemIcon>
									<MenuBookIcon />
								</ListItemIcon>
								<ListItemText primary={"Books"} />
							</ListItem>
						</NavLink>
						<NavLink
							to="/categories"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<ListItem button>
								<ListItemIcon>
									<CategoryIcon />
								</ListItemIcon>
								<ListItemText primary={"Category"} />
							</ListItem>
						</NavLink>
					</List>
					<Divider />
					<List>
						<NavLink
							to="/users"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<ListItem button>
								<ListItemIcon>
									<AccountBoxIcon />
								</ListItemIcon>
								<ListItemText primary={"Users"} />
							</ListItem>
						</NavLink>
						<NavLink
							to="/orders"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<ListItem button>
								<ListItemIcon>
									<MonetizationOnIcon />
								</ListItemIcon>
								<ListItemText primary={"Orders"} />
							</ListItem>
						</NavLink>
					</List>
				</div>
				<CustomizedSnackbar />
			</Drawer>
			<main className={classes.content}>
				<Toolbar />

				<Switch>
					<Route exact path="/books" component={VerifyBooks} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/categories" component={Category} />
					<Route exact path="/users" component={Users} />
					<Route exact path="/orders" component={Orders} />
					<Route path="*" exact>
						<Redirect to="/dashboard" />
					</Route>
				</Switch>
			</main>
		</div>
	);
}
