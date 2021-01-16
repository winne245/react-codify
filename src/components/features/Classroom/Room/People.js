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
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Class';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
// import axiosClient from '../../../api/axiosClient';
// import axiosCodify from '../../../api/axios';
// import productApi from '../../../api/productApi';
import { useStateValue } from "../../../../context/StateProvider";
// import { ACTION_TYPE } from "../../../reducers/reducer";


import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';
import { Collapse, Paper } from '@material-ui/core';


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