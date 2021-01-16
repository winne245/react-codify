import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import jwt_decode from "jwt-decode";
import { useStateValue } from "../../../context/StateProvider";
import { ACTION_TYPE } from "../../../reducers/reducer";
import firebase from 'firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import axiosCodify, { setClientToken } from '../../../api/axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3),
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'popup',
//   // signInSuccessUrl: '/',
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID
//   ]
//   // callbacks: {
//   //   // Avoid redirects after sign-in.
//   //   signInSuccessWithAuthResult: () => false
//   // }
// };

export default function SignIn() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isChecked, setIsChecked] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleSignInSubmit = (e) => {
    e.preventDefault();
    // await axiosCodify.post('/signin', user)
    //   .then(res => {
    //     if (res.data.accessToken) {
    //       console.log(res.data);
    //       setClientToken(res.data.accessToken);
    //       localStorage.setItem("accessToken", res.data.accessToken);
    //       window.location.reload();
    //     }
    //     return res.data;
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    const signIn = async () => {
      try {
        const response = await axiosCodify.post('/signin', user);
        localStorage.setItem("accessToken", response.accessToken);
        const decoded = jwt_decode(response.accessToken);
        state.user = decoded.payload;
        dispatch({ type: ACTION_TYPE.SIGN_IN });
      } catch (error) {
        console.log('Error: ', error);
      }
    }
    signIn();

    // const signIn = async () => {
    //   try {
    //     const response = await axiosCodify.post('/signin', user);
    //     if (isChecked) {
    //       localStorage.setItem("accessToken", response.accessToken);
    //     } else {
    //       sessionStorage.setItem("accessToken", response.accessToken);
    //     }
    //     dispatch({ type: ACTION_TYPE.SIGN_IN });
    //   } catch (error) {
    //     console.log('Error: ', error);
    //   }
    // }
    // signIn();

  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Sign In
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/> */}
            <form className={classes.form} noValidate onSubmit={handleSignInSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                type="email"
                // autoComplete="email"
                autoFocus
                onChange={e => setUser({ ...user, email: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                // autoComplete="current-password"
                onChange={e => setUser({ ...user, password: e.target.value })}
              />
              <FormControlLabel
                control={<Checkbox
                  color="primary"
                  onChange={e => {
                    console.log(e.target.checked);
                    setIsChecked({ isChecked: e.target.checked });
                  }}
                />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              // onClick={handleSignInSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
            </form>
            {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/> */}
          </div>
        </Container>
      </Dialog>
    </div>
  );
}
