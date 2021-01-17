import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { NavLink, Route, Switch as SwitchRouter, useRouteMatch } from "react-router-dom";
import axiosCodify from '../../../api/axios';
import { useStateValue } from "../../../context/StateProvider";
import NotFound from "../../shares/NotFound/NotFound";
import AllClass from "./AllClass";
import CreateClass from "./CreateClass";
import JoinClass from "./JoinClass";
import Room from "./Room/Room";
import ToDo from "./ToDo/ToDo";
import ToReview from "./ToReview/ToReview";





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