import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import axiosCodify from '../../../../api/axios';
import { NavLink, Redirect, Route, Switch as SwitchRouter, useRouteMatch } from "react-router-dom";
import { useStateValue } from "../../../../context/StateProvider";
import NotFound from "../../../shares/NotFound/NotFound";
import Assigned from "./Assigned";
import Done from "./Done";
import Missing from "./Missing";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbarLight: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    padding: 0,
    marginBottom: 18,
    boxShadow: '0.1px 0.1px 5px grey',
  },
  toolbarDark: {
    flexGrow: 1,
    backgroundColor: '#424242',
    borderBottom: '1px solid #424242',
    padding: 0,
    marginBottom: 18,
    boxShadow: '0.1px 0.1px 5px #424242',
  },
  toolbar1: {
    padding: 0,
  },
  toolbar2: {
    padding: 0,
    minHeight: 50,
  },
  tabLight: {
    color: '#65676b',
    height: 50,
    width: 100,
    fontSize: '1.875',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    borderTop: '2.5px solid #ffffff',
    borderBottom: '2.5px solid #ffffff',
    // eslint-disable-next-line no-dupe-keys
    fontSize: '1rem',
    fontWeight: 520,
    '&:hover': {
      color: '#3578E5',
      backgroundColor: '#e4e6eb',
      borderRadius: 8,
    },
  },
  tabLightActive: {
    color: '#3578E5',
    borderBottom: '2.5px solid #3578E5',
    '&:hover': {
      backgroundColor: '#ffffff',
      borderRadius: 0,
    },
  },
  tabDark: {
    color: '#ffffff',
    height: 50,
    width: 100,
    fontSize: '1.875',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    borderTop: '2.5px solid #424242',
    borderBottom: '2.5px solid #424242',
    // eslint-disable-next-line no-dupe-keys
    fontSize: '1rem',
    fontWeight: 520,
    '&:hover': {
      color: '#3578E5',
      backgroundColor: '#303030',
      borderRadius: 8,
    },
  },
  tabDarkActive: {
    color: '#3578E5',
    borderBottom: '2.5px solid #3578E5',
    '&:hover': {
      backgroundColor: '#424242',
      borderRadius: 0,
    },
  },
  // containerLight: {
  //   minHeight: '71.5vh',
  //   borderRadius: 8,
  //   backgroundColor: '#ffffff',
  //   paddingLeft: 50,
  //   paddingRight: 50,
  //   paddingTop: 10,
  // },
  // containerDark: {
  //   minHeight: '71.5vh',
  //   borderRadius: 8,
  //   backgroundColor: '#424242',
  //   paddingLeft: 50,
  //   paddingRight: 50,
  //   paddingTop: 10,
  // },
  container: {
    padding: 0,
  },
}));

export default function ToDo() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();
  const match = useRouteMatch();

  const [assignedExercises, setAssignedExercises] = useState([]);
  const [missingExercises, setMissingExercises] = useState([]);
  const [doneExercises, setDoneExercises] = useState([]);
  useEffect(() => {
    if (state.isSignIn) {
      const fetchAllExercises = async () => {
        try {
          const response = await axiosCodify.get('/classrooms/exercises/todo');
          setAssignedExercises(response.notDoneExercises);
          setMissingExercises(response.lateSubmitExercises);
          setDoneExercises(response.doneExercises);
        } catch (error) {
          console.log('Error: ', error);
        }
      }
      fetchAllExercises();
    }
  }, [state.isSignIn]);

  var curr = new Date; // get current date
  var firstThisWeek = curr.getDate() - curr.getDay() + 1;
  var lastThisWeek = firstThisWeek + 6;
  var firstDayThisWeek = new Date(curr.setDate(firstThisWeek));
  var lastDayThisWeek = new Date(curr.setDate(lastThisWeek));
  var firstLastWeek = firstThisWeek - 7;
  var lastLastWeek = firstLastWeek + 6;
  var firstDayLastWeek = new Date(curr.setDate(firstLastWeek));
  var lastDayLastWeek = new Date(curr.setDate(lastLastWeek));

  return (
    <div className={classes.root}>
      <Toolbar className={clsx(classes.toolbarLight, state.isDarkMode && classes.toolbarDark)}>
        <Container maxWidth="md" style={{ padding: 0 }}>
          <Toolbar className={classes.toolbar1}>
            <Typography variant="h5" style={{ fontWeight: 500 }}>
              To-do
            </Typography>
          </Toolbar>
          <Divider />
          <Toolbar className={classes.toolbar2}>
            <NavLink
              to={`${match.url}/assigned`}
              className={clsx(classes.tabLight, state.isDarkMode && classes.tabDark)}
              activeClassName={clsx(classes.tabLightActive, state.isDarkMode && classes.tabDarkActive)}
            >
              Assigned
            </NavLink>
            <NavLink
              to={`${match.url}/missing`}
              className={clsx(classes.tabLight, state.isDarkMode && classes.tabDark)}
              activeClassName={clsx(classes.tabLightActive, state.isDarkMode && classes.tabDarkActive)}
            >
              Missing
            </NavLink>
            <NavLink
              to={`${match.url}/done`}
              className={clsx(classes.tabLight, state.isDarkMode && classes.tabDark)}
              activeClassName={clsx(classes.tabLightActive, state.isDarkMode && classes.tabDarkActive)}
            >
              Done
            </NavLink>
          </Toolbar>
        </Container>
      </Toolbar>
      <Container maxWidth="md" className={classes.container}>
        <SwitchRouter>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/assigned`} />
          <Route path={`${match.url}/assigned`} >
            <Assigned
              assignedExercises={assignedExercises}
              firstDayThisWeek={firstDayThisWeek}
              lastDayThisWeek={lastDayThisWeek}
              firstDayLastWeek={firstDayLastWeek}
              lastDayLastWeek={lastDayLastWeek}
            />
          </Route>
          <Route path={`${match.url}/missing`}>
            <Missing
              missingExercises={missingExercises}
              firstDayThisWeek={firstDayThisWeek}
              lastDayThisWeek={lastDayThisWeek}
              firstDayLastWeek={firstDayLastWeek}
              lastDayLastWeek={lastDayLastWeek}
            />
          </Route>
          <Route path={`${match.url}/done`}>
            <Done
              doneExercises={doneExercises}
              firstDayThisWeek={firstDayThisWeek}
              lastDayThisWeek={lastDayThisWeek}
              firstDayLastWeek={firstDayLastWeek}
              lastDayLastWeek={lastDayLastWeek}
            />
          </Route>
          <Route component={NotFound} />
        </SwitchRouter>
      </Container>
    </div>
  );
}