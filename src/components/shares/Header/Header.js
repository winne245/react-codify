import {
	AppBar,
	IconButton,
	makeStyles,
	Menu,
	MenuItem,
	Switch,
	Toolbar,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ClassIcon from "@material-ui/icons/Class";
import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import NotificationsIcon from "@material-ui/icons/Notifications";
import clsx from "clsx";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../../../context/StateProvider";
import { ACTION_TYPE } from "../../../reducers/reducer";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import logo from "../../../logo.svg";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appBarSpacer: {
		height: 48,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	toolBarMid: {
		flexGrow: 1,
		justifyContent: "center",
	},
	toolBarLeft: {
		padding: 0,
		width: 300,
		justifyContent: "flex-start",
	},
	toolBarRight: {
		padding: 0,
		width: 300,
		justifyContent: "flex-end",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: 240,
		flexShrink: 0,
	},
	drawerPaper: {
		width: 240,
	},
	drawerContainer: {
		overflow: "auto",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	tabLight: {
		color: "#65676b",
		height: 63.5,
		width: 145,
		fontSize: "1.875",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textDecoration: "none",
		borderTop: "2.5px solid #f5f5f5",
		borderBottom: "2.5px solid #f5f5f5",
		// eslint-disable-next-line no-dupe-keys
		fontSize: "1rem",
		fontWeight: 520,
		"&:hover": {
			color: "#3578E5",
			backgroundColor: "#e4e6eb",
			borderRadius: 8,
		},
	},
	tabLightActive: {
		color: "#3578E5",
		borderBottom: "2.5px solid #3578E5",
		"&:hover": {
			backgroundColor: "#f5f5f5",
			borderRadius: 0,
		},
	},
	tabIcon: {
		height: 28,
	},
	tabDark: {
		color: "#ffffff",
		height: 63.5,
		width: 145,
		fontSize: "1.875",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textDecoration: "none",
		borderTop: "2.5px solid #212121",
		borderBottom: "2.5px solid #212121",
		// eslint-disable-next-line no-dupe-keys
		fontSize: "1rem",
		fontWeight: 520,
		"&:hover": {
			color: "#3578E5",
			backgroundColor: "#424242",
			borderRadius: 8,
		},
	},
	tabDarkActive: {
		color: "#3578E5",
		borderBottom: "2.5px solid #3578E5",
		"&:hover": {
			backgroundColor: "#212121",
			borderRadius: 0,
		},
	},
	menu: {
		marginTop: 35,
	},
}));

function Header() {
	const history = useHistory();
	const classes = useStyles();
	const [state, dispatch] = useStateValue();

	const [isDarkMode, setDarkMode] = useState(state.isDarkMode);
	const changeDarkMode = () => {
		setDarkMode((prevMode) => !prevMode);
		dispatch({ type: ACTION_TYPE.SWITCH_DARK_MODE, isDarkMode: isDarkMode });
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleOpenProfile = () => {
		history.push("/profile");
	};

	const handleSignOut = () => {
		setAnchorEl(null);
		localStorage.removeItem("accessToken");
		dispatch({ type: ACTION_TYPE.SIGN_OUT });
		// firebase.auth().signOut();
		// window.location.reload();
	};

	return (
		<div className={classes.root}>
			<AppBar position="fixed" color="default" className={classes.appBar}>
				<Toolbar style={{ paddingRight: 12 }}>
					<Toolbar className={classes.toolBarLeft}>
						<NavLink to="/homepage">
							<img src={logo} className="App-logo" alt="logo" />
						</NavLink>
					</Toolbar>

					<Toolbar className={classes.toolBarMid}>
						<NavLink
							to="/homepage"
							className={clsx(classes.tabLight, isDarkMode && classes.tabDark)}
							activeClassName={clsx(
								classes.tabLightActive,
								isDarkMode && classes.tabDarkActive
							)}>
							<HomeIcon style={{ fontSize: 30 }} />
						</NavLink>
						<NavLink
							to="/classrooms"
							className={clsx(classes.tabLight, isDarkMode && classes.tabDark)}
							activeClassName={clsx(
								classes.tabLightActive,
								isDarkMode && classes.tabDarkActive
							)}>
							<ClassIcon style={{ fontSize: 25 }} />
						</NavLink>
						<NavLink
							to="/lessons"
							className={clsx(classes.tabLight, isDarkMode && classes.tabDark)}
							activeClassName={clsx(
								classes.tabLightActive,
								isDarkMode && classes.tabDarkActive
							)}>
							<MenuBookIcon style={{ fontSize: 25 }} />
						</NavLink>
						<NavLink
							to="/practice"
							className={clsx(classes.tabLight, isDarkMode && classes.tabDark)}
							activeClassName={clsx(
								classes.tabLightActive,
								isDarkMode && classes.tabDarkActive
							)}>
							<BorderColorIcon style={{ fontSize: 25 }} />
						</NavLink>
						<NavLink
							to="/social"
							className={clsx(classes.tabLight, isDarkMode && classes.tabDark)}
							activeClassName={clsx(
								classes.tabLightActive,
								isDarkMode && classes.tabDarkActive
							)}>
							<GroupIcon style={{ fontSize: 30 }} />
						</NavLink>
					</Toolbar>
					<Toolbar className={classes.toolBarRight}>
						<Switch
							color="primary"
							checked={isDarkMode}
							onChange={changeDarkMode}
						/>

						{!state.isSignIn ? (
							<>
								<SignIn />
								<div style={{ width: 5 }} />
								<SignUp />
							</>
						) : (
							<>
								<IconButton
									aria-label="show 17 new notifications"
									color="inherit">
									<Badge badgeContent={17} color="secondary">
										<NotificationsIcon />
									</Badge>
								</IconButton>

								<IconButton
									aria-label="account of current user"
									aria-controls="menu-appBar"
									aria-haspopup="true"
									onClick={handleMenu}
									color="inherit">
									<Avatar
										style={{
											backgroundColor: "#3c87c0",
											height: 32,
											width: 32,
										}}>
										{state.user.firstName.charAt(0)}
									</Avatar>
								</IconButton>

								<Menu
									id="menu-appBar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={open}
									onClose={handleClose}
									className={classes.menu}>
									<MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
									<MenuItem onClick={handleClose}>Settings</MenuItem>
									<MenuItem onClick={handleClose}>Help</MenuItem>
									<MenuItem onClick={handleSignOut}>Sign out</MenuItem>
								</Menu>
							</>
						)}
					</Toolbar>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</div>
	);
}

export default Header;
