import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Link, Switch as SwitchRouter, NavLink, useRouteMatch, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import BatteryCharging50Icon from '@material-ui/icons/BatteryCharging50';
import BatteryCharging80Icon from '@material-ui/icons/BatteryCharging80';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';

import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Class';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
// import axiosClient from '../../../../api/axiosClient';
// import axiosCodify from '../../../../api/axios';
// import productApi from '../../../../api/productApi';
import { useStateValue } from "../../../../context/StateProvider";
// import { ACTION_TYPE } from "../../../../reducers/reducer";

import Assigned from "./Assigned";
import Missing from "./Missing";
import Done from "./Done";
import NotFound from "../../../shares/NotFound/NotFound";

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
          <Route path={`${match.url}/assigned`} component={Assigned} />
          <Route path={`${match.url}/missing`} component={Missing} />
          <Route path={`${match.url}/done`} component={Done} />
          <Route component={NotFound} />
        </SwitchRouter>
      </Container>
    </div>
  );
}