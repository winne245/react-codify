import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  snackbar: {
    width: '100%',
  },
}));

export default function SnackbarError(props) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(props.openSnackbar);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setOpenSnackbar(false);
  };

  return (
    <div className={classes.snackbar}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar
        open={props.openSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert onClose={handleClose} severity="error">
          {props.message}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}