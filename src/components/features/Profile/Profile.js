import {
	Avatar,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Typography,
	Drawer,
	Toolbar,
} from "@material-ui/core";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ClassIcon from "@material-ui/icons/Class";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import { useStateValue } from "../../../context/StateProvider";
import { useHistory } from "react-router-dom";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		marginTop: 10,
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: "auto",
	},
	content: {
		flexGrow: 1,
		paddingLeft: theme.spacing(0),
	},
	card: {
		maxWidth: 300,
		display: "inline-flex",
		marginRight: 24,
	},
}));

function Profile() {
	const classes = useStyles();
	const [state, dispatch] = useStateValue();
	const history = useHistory();
	const handleDrawerClick = (url) => {
		history.push(url);
	};
	return (
		<div>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<ListItem
						button
						onClick={() => {
							handleDrawerClick("/profile");
						}}>
						<ListItemIcon>
							<Avatar
								style={{
									backgroundColor: "#3c87c0",
									height: 32,
									width: 32,
								}}>
								{state.user.firstName.charAt(0)}
							</Avatar>
						</ListItemIcon>
						<Typography
							variant="h6"
							style={{
								fontWeight: 500,
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}>
							{state.user.firstName} {state.user.lastName}
						</Typography>
					</ListItem>
					<Divider />
					<ListItem
						button
						onClick={() => {
							handleDrawerClick("/homepage");
						}}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home page" />
					</ListItem>
					<ListItem
						button
						onClick={() => {
							handleDrawerClick("/classrooms");
						}}>
						<ListItemIcon>
							<ClassIcon />
						</ListItemIcon>
						<ListItemText primary="Classroom" />
					</ListItem>
					<ListItem
						button
						onClick={() => {
							handleDrawerClick("/lessons");
						}}>
						<ListItemIcon>
							<MenuBookIcon />
						</ListItemIcon>
						<ListItemText primary="Lesson" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<BorderColorIcon />
						</ListItemIcon>
						<ListItemText primary="Practice" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<RecentActorsIcon />
						</ListItemIcon>
						<ListItemText primary="Social" />
					</ListItem>
				</div>
			</Drawer>
		</div>
	);
}

export default Profile;
