import { CardMedia } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ClassIcon from "@material-ui/icons/Class";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../../context/StateProvider";

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

export default function Homepage() {
	const history = useHistory();
	const classes = useStyles();
	const [state, dispatch] = useStateValue();

	return (
		<div className={classes.root}>
			{!state.isSignIn ? (
				<main>
					<CardMedia
						component="img"
						className={classes.cardMedia}
						image={require("../../../assets/images/Capture.PNG")}
					/>
				</main>
			) : (
				<>
					<main className={classes.content}>
						<CardMedia
							component="img"
							className={classes.cardMedia}
							image={require("../../../assets/images/Capture4.PNG")}
						/>
						<CardMedia
							component="img"
							className={classes.cardMedia}
							image={require("../../../assets/images/Capture2.PNG")}
						/>
						<CardMedia
							component="img"
							className={classes.cardMedia}
							image={require("../../../assets/images/Capture3.PNG")}
						/>
					</main>
				</>
			)}
		</div>
	);
}
