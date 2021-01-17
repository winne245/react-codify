import { Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import { useStateValue } from "../../../../context/StateProvider";



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    padding: '15px 30px 0px 30px',
    marginBottom: 20,
  },
  nested: {
    width: '95%',
    marginLeft: theme.spacing(5.5),
  },
}));

export default function People() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  const match = useRouteMatch();

  const [classroomList, setClassroomList] = useState([]);
  // useEffect(() => {
  //   if (state.isSignIn) {
  //     const fetchClassroomList = async () => {
  //     try {
  //       const response = await axiosCodify.get('/classroom');
  //       setClassroomList(response)
  //       console.log('Fetch successfully: ', response);
  //     } catch (error) {
  //       console.log('Error: ', error);
  //     }
  //   }
  //   fetchClassroomList();
  //   }
  // }, [state.isSignIn]);
  // useEffect(() => {
  //   const fetchClassroomList = async () => {
  //     try {
  //       const response = await axiosClient.get('/products');
  //       console.log('Fetch successfully: ', response);
  //     } catch (error) {
  //       console.log('Error: ', error);
  //     }
  //   }
  //   fetchClassroomList();
  // }, []);
  return (
    <div className={classes.root}>
      {/* <SwitchRouter>
              <Route exact path={match.url} />
              <Route path={`${match.url}/a`} component={Detail} />
              <Route path={`${match.url}/b`} component={Detail} />
              <Route path={`${match.url}/c`} component={Detail} />
              <Route path={`${match.url}/d`} component={Detail} />
              <Route path={`${match.url}/e`} component={Detail} />
              <Route component={NotFound} />
            </SwitchRouter> */}
      {/* <main className={classes.content}> */}
      <Paper className={classes.paper}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <Typography variant="h5" component="h1" color="primary">
                Teachers
              </Typography>
            </ListSubheader>
          }
          className={classes.root}
        >
          <Divider />
          <ListItem>
            <ListItemText primary="Miss Hello" />
          </ListItem>
        </List>
      </Paper>

      <Paper className={classes.paper}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <Typography variant="h5" component="h1" color="primary">
                Students
              </Typography>
            </ListSubheader>
          }
          className={classes.root}
        >
          <Divider />
          <ListItem>
            <ListItemText primary="Student A" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Student B" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Student C" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Student D" />
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}