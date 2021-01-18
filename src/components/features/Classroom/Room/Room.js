import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { NavLink, Redirect, Route, Switch as SwitchRouter, useParams, useRouteMatch } from "react-router-dom";
import axiosCodify from '../../../../api/axios';
import { useStateValue } from "../../../../context/StateProvider";
import NotFound from "../../../shares/NotFound/NotFound";
import Exercises from "./Exercises";
import Grades from "./Grades";
import People from "./People";
import Stream from "./Stream";



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

export default function Room() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();
  const match = useRouteMatch();
  const params = useParams();
  const [classroom, setClassroom] = useState([]);
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    if (state.isSignIn) {
      const fetchClassroom = async () => {
        try {
          const response = await axiosCodify.get(`/classrooms/${params.alias}`);
          setClassroom(response);
          // console.log('1', classroom.title);
        } catch (error) {
          console.log('Error: ', error);
          if (error == 'Error: Request failed with status code 403') {
            console.log('Error:  not found!');
          }
        }
      }
      fetchClassroom();
      const studentList = async () => {
        try {
          const response = await axiosCodify.get(`/classrooms/${params.alias}/attend`);
          setStudentList(response);
        } catch (error) {
          console.log('Error: ', error);
        }
      }
      studentList();
    }
  }, [params.alias]);

  return (
    <div className={classes.root}>
      <Toolbar className={clsx(classes.toolbarLight, state.isDarkMode && classes.toolbarDark)}>
        <Container maxWidth="md" style={{ padding: 0 }}>
          <Toolbar className={classes.toolbar1}>
            <Typography variant="h5" style={{ fontWeight: 500 }}>
              {classroom.title}
            </Typography>
          </Toolbar>
          <Divider />
          <Toolbar className={classes.toolbar2}>
            <NavLink
              to={`${match.url}/stream`}
              className={clsx(classes.tabLight, state.isDarkMode && classes.tabDark)}
              activeClassName={clsx(classes.tabLightActive, state.isDarkMode && classes.tabDarkActive)}
            >
              Stream
            </NavLink>
            <NavLink
              to={`${match.url}/exercises`}
              className={clsx(classes.tabLight, state.isDarkMode && classes.tabDark)}
              activeClassName={clsx(classes.tabLightActive, state.isDarkMode && classes.tabDarkActive)}
            >
              Exercises
            </NavLink>
            <NavLink
              to={`${match.url}/people`}
              className={clsx(classes.tabLight, state.isDarkMode && classes.tabDark)}
              activeClassName={clsx(classes.tabLightActive, state.isDarkMode && classes.tabDarkActive)}
            >
              People
            </NavLink>
            <NavLink
              to={`${match.url}/grades`}
              className={clsx(classes.tabLight, state.isDarkMode && classes.tabDark)}
              activeClassName={clsx(classes.tabLightActive, state.isDarkMode && classes.tabDarkActive)}
            >
              Grades
            </NavLink>
          </Toolbar>
        </Container>
      </Toolbar>
      <Container maxWidth="md" className={classes.container}>
        <SwitchRouter>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/stream`} />
          <Route path={`${match.url}/stream`}>
            <Stream classroom={classroom} />
          </Route>
          <Route path={`${match.url}/exercises`}>
            <Exercises classroom={classroom} />
          </Route>
          <Route path={`${match.url}/people`}>
            <People studentList={studentList} classroom={classroom} />
          </Route>
          <Route path={`${match.url}/grades`} component={Grades} />
          <Route component={NotFound} />
        </SwitchRouter>
      </Container>
    </div>
  );
}