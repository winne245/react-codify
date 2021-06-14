import DateFnsUtils from "@date-io/date-fns";
import {
	Avatar,
	Badge,
	Button,
	Container,
	CssBaseline,
	Grid,
	makeStyles,
	TextField,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CreateIcon from "@material-ui/icons/Create";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosCodify from "../../../api/axios";
import { useStateValue } from "../../../context/StateProvider";
import SnackbarSuccess from "../../shares/Snackbar/SnackbarSuccess";

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
	},
	avatarContainer: {
		flex: 1,
		marginBottom: 30,
	},

	avatar: {
		width: 150,
		height: 150,
		margin: "0 auto",
	},
	drawerPaper: {
		marginTop: 20,
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: "auto",
	},
	content: {
		flexGrow: 1,
		justifyContent: "center",
		width: "50%",
		margin: "auto",
		paddingTop: 20,
		textAlign: "center",
	},

	profile: {
		marginTop: 20,
		margin: "auto",
	},
	card: {
		maxWidth: 300,
		display: "inline-flex",
		marginRight: 24,
	},
	button: {
		marginTop: 20,
	},
}));

function Profile() {
	const classes = useStyles();
	const inputImage = useRef();
	const [isEdit, setEdit] = useState(false);
	const [isChangeAvatar, setIsChangeAvatar] = useState(false);
	const [state, dispatch] = useStateValue();
	const [reviewImage, setReviewImage] = useState(null);
	const history = useHistory();
	const handleDrawerClick = (url) => {
		history.push(url);
	};
	const [open, setOpen] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [message, setMessage] = useState(null);

	const [user, setUser] = useState({
		email: "",
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		imgUrl: "",
	});

	useEffect(() => {
		getProfile();
	}, []);

	const handleUpdate = () => {
		console.log("Update");
		const update = async () => {
			try {
				if (reviewImage) {
					const formData = new FormData();
					formData.app(reviewImage);
				}
				const response = await axiosCodify.put("/users/profile", user);
				if (response.message) {
					setMessage(response.message);
					setOpenSnackbar(true);
					getProfile();
					setEdit(false);
				}
			} catch (error) {
				console.log("Error: ", error);
			}
		};
		update();
	};

	const handleChangeAvatar = async (e) => {
		var formData = new FormData();
		formData.append("image", reviewImage, reviewImage.name);

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};

		const response = await axiosCodify.put("/users/change-avatar", formData);

		try {
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const getProfile = async () => {
		const response = await axiosCodify.get("/users/profile");
		setUser({
			...user,
			firstName: response.firstName,
			lastName: response.lastName,
			email: response.email,
			dateOfBirth: response.dateOfBirth,
			imgUrl: response.imgUrl,
		});
	};

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<div className={classes.profile}>
					<Container component="main" maxWidth="xl">
						<CssBaseline />
						<div className={classes.paper}>
							<SnackbarSuccess
								message={message}
								openSnackbar={openSnackbar}
								setOpenSnackbar={setOpenSnackbar}
							/>
							<Grid className={classes.avatarContainer}>
								<Badge
									style={{ marginTop: 10 }}
									onClick={() => {
										inputImage.current.click();
									}}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right",
									}}>
									<Avatar className={classes.avatar} src={user.imgUrl}>
										<PersonIcon width="150" height="150" />
									</Avatar>
									<CreateIcon />
									<input
										type="file"
										hidden
										ref={inputImage}
										onChange={(e) => {
											const reader = new FileReader();
											reader.addEventListener("load", () => {
												setUser({ ...user, imgUrl: reader.result });
											});
											reader.readAsDataURL(e.target.files[0]);
											setUser({ ...user, imgUrl: reader.result });
											setReviewImage(e.target.files[0]);
											setIsChangeAvatar(true);
										}}></input>
								</Badge>
							</Grid>

							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										disabled={!isEdit}
										name="firstName"
										required
										fullWidth
										id="firstName"
										label="First Name"
										autoFocus
										value={user.firstName}
										// autoComplete="fname"
										onChange={(e) =>
											setUser({ ...user, firstName: e.target.value })
										}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										disabled={!isEdit}
										required
										fullWidth
										id="lastName"
										label="Last Name"
										name="lastName"
										// autoComplete="lname"
										value={user.lastName}
										onChange={(e) =>
											setUser({ ...user, lastName: e.target.value })
										}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										disabled={!isEdit}
										margin="normal"
										required
										fullWidth
										id="email"
										name="email"
										label="Email Address"
										type="email"
										// autoComplete="email"
										value={user.email}
										onChange={(e) =>
											setUser({ ...user, email: e.target.value })
										}
									/>
								</Grid>
								<Grid item xs={12}>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											disabled={!isEdit}
											fullWidth
											format="MM/dd/yyyy"
											margin="normal"
											value={user.dateOfBirth}
											onChange={(date) => {
												setUser({ ...user, dateOfBirth: date });
											}}
											KeyboardButtonProps={{
												"aria-label": "change date",
											}}
										/>
									</MuiPickersUtilsProvider>
								</Grid>
								{/*
									<Grid item xs={12}>
										<TextField
											disabled={!isEdit}
											variant="outlined"
											margin="normal"
											required
											fullWidth
											id="confirmPassword"
											name="confirmPassword"
											label="Confirm Password"
											type="password"
											// autoComplete="current-password"
											onChange={(e) =>
												setUser({ ...user, confirmPassword: e.target.value })
											}
										/>
									</Grid>
									*/}
							</Grid>
							<Grid container justify="center">
								<Grid item>
									{isEdit || isChangeAvatar ? (
										<>
											<Button
												type="submit"
												fullWidth
												variant="contained"
												color="primary"
												className={classes.button}
												onClick={isEdit ? handleUpdate : handleChangeAvatar}>
												Save
											</Button>
											<Button
												fullWidth
												variant="contained"
												color="secondary"
												onClick={() => {
													setEdit(false);
												}}
												className={classes.button}>
												Cancel
											</Button>
										</>
									) : (
										<Button
											onClick={() => {
												setEdit(true);
											}}
											fullWidth
											variant="contained"
											color="default"
											className={classes.button}>
											Update
										</Button>
									)}
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
			</div>
		</div>
	);
}

export default Profile;
