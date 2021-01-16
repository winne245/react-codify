import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Link, Switch as SwitchRouter, NavLink, useRouteMatch, Redirect, useHistory } from "react-router-dom";
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
import axiosClient from '../../../api/axiosClient';
import axiosCodify from '../../../api/axios';
import productApi from '../../../api/productApi';
import { useStateValue } from "../../../context/StateProvider";
import { ACTION_TYPE } from "../../../reducers/reducer";

import { Paper, TextField } from '@material-ui/core';

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
    marginBottom: 15,
    boxShadow: '0.1px 0.1px 5px #424242',
  },
  toolbar: {
    padding: 0,
  },
  container: {
    padding: 0,
  },
  paper: {
    padding: '15px 30px 25px 30px',
    display: 'block',
  },
  paperDivider: {
    marginTop: 15,
    marginBottom: 15,
  },
  paperText: {
    display: 'block',
  },
  paperBtn: {
    width: '100%',
    marginTop: 10,
    display: 'flex',
    justifyContent: 'flex-end'
  },
}));

export default function JoinClass(props) {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();
  const match = useRouteMatch();
  const history = useHistory();
  const [classroomList, setClassroomList] = useState([]);

  const [classCode, setClassCode] = useState({
    joinId: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const JoinClass = async () => {
      try {
        const response = await axiosCodify.post('/classrooms/attend', classCode);
        window.alert('Join successfully!');
        setClassCode({ ...classCode, joinId: "" });
        props.callbackSidebarReload();
        history.push(`/classrooms/${response.classroom.alias}/stream`);
      } catch (error) {
        window.alert('Class not found! or Already attended!');
        console.log('Error: ', error);
      }
    }
    JoinClass();
  };

  return (
    <div className={classes.root}>
      <Toolbar className={clsx(classes.toolbarLight, state.isDarkMode && classes.toolbarDark)}>
        <Container maxWidth="md" style={{ padding: 0 }}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h5" style={{ fontWeight: 500 }}>
              Join class
            </Typography>
          </Toolbar>
        </Container>
      </Toolbar>
      <Container maxWidth="sm" className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant="h6"  >
            Class code
          </Typography>
          <span>Ask your teacher for the class code, then enter it here.</span>\
          <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="classCode"
              name="classCode"
              label="Class code"
              type="text"
              // autoComplete="email"
              value={classCode.joinId}
              autoFocus
              // className={classes.paperInput}
              onChange={e => setClassCode({ ...classCode, joinId: e.target.value })}
            />
            <Divider className={classes.paperDivider} />
            <span className={classes.paperText}>To sign in with a class code</span>
            <span className={classes.paperText}>- Use an authorized account</span>
            <span className={classes.paperText}>- Use a class code with 5-7 letters or numbers, and no spaces or symbols</span>
            <Divider className={classes.paperDivider} />
            <div className={classes.paperBtn}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                type="submit"
              >
                Join
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </div>
  );
}