import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import firebase from 'firebase';
import React, { useState } from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import axiosCodify from '../../../api/axios';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
  // callbacks: {
  //   // Avoid redirects after sign-in.
  //   signInSuccessWithAuthResult: () => false
  // }
};

export default function SignUp() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "1999-01-01",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const signUn = async () => {
      try {
        const response = await axiosCodify.post('/signup', user);
        if (response) {
          setMessage(response.message);
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }
    signUn();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Sign Up
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
              Sign Up
            </Typography>
            {/* <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}> */}
            <Snackbar
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
              open={openSnackbar}
              autoHideDuration={4000}
              onClose={handleCloseSnackbar}
              message={message}
              action={
                <Button variant="outlined" color="secondary" size="small" onClick={handleCloseSnackbar}>
                  OK
                </Button>
              }
            />
            {/* <Snackbar message={message} openSnackbar={openSnackbar}/> */}
            <form className={classes.form} noValidate onSubmit={handleSignUpSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    // autoComplete="fname"
                    onChange={e => setUser({ ...user, firstName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    // autoComplete="lname"
                    onChange={e => setUser({ ...user, lastName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
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
                    onChange={e => setUser({ ...user, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    // autoComplete="current-password"
                    onChange={e => setUser({ ...user, confirmPassword: e.target.value })}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  {/* <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link> */}
                </Grid>
              </Grid>
            </form>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </div>
        </Container>
      </Dialog>
    </div>
  );
}
