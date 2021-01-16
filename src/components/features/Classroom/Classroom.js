import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Link, Switch as SwitchRouter, NavLink, useRouteMatch, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { ModalRoute, ModalContainer } from 'react-router-modal';

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
import axiosClient from '../../../api/axiosClient';
import axiosCodify from '../../../api/axios';
import productApi from '../../../api/productApi';
import { useStateValue } from "../../../context/StateProvider";
import { ACTION_TYPE } from "../../../reducers/reducer";

import AllClass from "./AllClass";
import JoinClass from "./JoinClass";
import CreateClass from "./CreateClass";
import ToReview from "./ToReview/ToReview";
import ToDo from "./ToDo/ToDo";
import Room from "./Room/Room";
import Code from "../../Code";
import NotFound from "../../shares/NotFound/NotFound";

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
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    // paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(37.5),
  },
  myClassTitle: {
    marginLeft: -55,
  },
  // card: {
  //   maxWidth: 300,
  //   display: 'inline-flex',
  //   marginRight: 15,
  // },
  // title: {
  //   marginLeft: -60,
  //   fontSize: '1.875',
  // },
  sidebarItem: {
    width: 278,
    marginLeft: 10,
    borderRadius: 25,
    '&:hover': {
    },
  },
  listItemLightActive: {
    backgroundColor: '#eaf3ff',
    '&:hover': {
      backgroundColor: '#eaf3ff'
    },
  },
  listItemDarkActive: {
    backgroundColor: '#263951',
    '&:hover': {
      backgroundColor: '#263951'
    },
  },
  iconSidebar: {
    width: 35,
    height: 35,
    padding: 5.5,
    backgroundColor: '#3578E5',
    color: '#ffffff',
    borderRadius: 25,
    marginLeft: -5,
    marginRight: 15,
  },
  avarSidebar: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginLeft: -5,
    marginRight: 15,
  },
  space: {
    height: 10
  }
}));

export default function Classroom() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();
  const match = useRouteMatch();

  const [sidebarReload, setSidebarReload] = useState(false);
  const callbackSidebarReload = () => {
    setSidebarReload(!sidebarReload)
  };
  const [createdClassroom, setCreatedClassroom] = useState([]);
  const [attendedClassroom, setAttendedClassroom] = useState([]);
  useEffect(() => {
    if (state.isSignIn) {
      const fetchClassrooms = async () => {
        try {
          const response = await axiosCodify.get('/classrooms');
          setCreatedClassroom(response.createdClassroom);
          setAttendedClassroom(response.attendedClassroom);
        } catch (error) {
          console.log('Error: ', error);
        }
      }
      fetchClassrooms();
    }
  }, [state.isSignIn, sidebarReload]);

  return (
    <div className={classes.root}>
      {!state.isSignIn ? (
        <main className={classes.content}>
          This is Classrooms
        </main>
      ) : (
          <>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Toolbar />
              <div className={classes.drawerContainer}>
                <ListItem >
                  <Typography variant="h5" style={{ fontWeight: 500 }}>
                    Classroom
                  </Typography>
                </ListItem>

                <Divider />
                <div className={classes.space} />
                <ListItem
                  button
                  to={`${match.url}/join-class`}
                  component={NavLink}
                  className={classes.sidebarItem}
                  activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
                >
                  <AddBoxIcon className={classes.iconSidebar} />
                  <ListItemText primary="Join class" />
                </ListItem>
                <ListItem
                  button
                  to={`${match.url}/create-class`}
                  component={NavLink}
                  className={classes.sidebarItem}
                  activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
                >
                  <AddToPhotosIcon className={classes.iconSidebar} />
                  <ListItemText primary="Create class" />
                </ListItem>
                <div className={classes.space} />

                <Divider />
                <ListSubheader inset className={classes.myClassTitle} >Teaching</ListSubheader>
                <ListItem
                  button
                  to={`${match.url}/to-review`}
                  component={NavLink}
                  className={classes.sidebarItem}
                  activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
                >
                  <WorkOutlineIcon className={classes.iconSidebar} />
                  <ListItemText primary="To-review" />
                </ListItem>

                {createdClassroom.map((item, index) => (
                  <div key={item._id}>
                    <ListItem
                      button
                      to={`${match.url}/${item.alias}`}
                      component={NavLink}
                      className={classes.sidebarItem}
                      activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
                    >
                      <Avatar alt="" src={require('../../../assets/images/a.png')} className={classes.avarSidebar} />
                      <ListItemText primary={item.title} />
                    </ListItem>
                  </div>
                ))}

                <div className={classes.space} />
                <Divider />
                <ListSubheader inset className={classes.myClassTitle} >Enrolled</ListSubheader>
                <ListItem
                  button
                  to={`${match.url}/to-do`}
                  component={NavLink}
                  className={classes.sidebarItem}
                  activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
                >
                  <WorkOutlineIcon className={classes.iconSidebar} />
                  <ListItemText primary="To-do" />
                </ListItem>

                {attendedClassroom.map((item, index) => (
                  <div key={item._id}>
                    <ListItem
                      button
                      to={`${match.url}/${item.classroom.alias}`}
                      component={NavLink}
                      className={classes.sidebarItem}
                      activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
                    >
                      <Avatar alt="" src={require('../../../assets/images/a.png')} className={classes.avarSidebar} />
                      <ListItemText primary={item.classroom.title} />
                    </ListItem>
                  </div>
                ))}

                <div className={classes.space} />
              </div>
            </Drawer>
            <main className={classes.content}>
              <SwitchRouter>
                <Route exact path={match.url}>
                  <AllClass createdClassroom={createdClassroom} attendedClassroom={attendedClassroom} />
                </Route>
                <Route path={`${match.url}/join-class`}>
                  <JoinClass callbackSidebarReload={callbackSidebarReload} />
                </Route>
                <Route path={`${match.url}/create-class`}>
                  <CreateClass callbackSidebarReload={callbackSidebarReload} />
                </Route>
                <Route path={`${match.url}/to-review`} component={ToReview} />
                <Route path={`${match.url}/to-do`} component={ToDo} />
                <Route path={`${match.url}/:alias`} component={Room} />
                <Route component={NotFound} />
              </SwitchRouter>
            </main>
          </>
        )}
    </div>
  );
}