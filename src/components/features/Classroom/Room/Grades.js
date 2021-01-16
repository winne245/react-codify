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
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// import MUIEditor, { MUIEditorState } from "react-mui-draft-wysiwyg";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
  },
  nested: {
    width: '95%',
    marginLeft: theme.spacing(5.5),
  },
}));

// function uploadImageCallBack(file) {
//   // return new Promise(
//   //   (resolve, reject) => {
//   //     resolve({ data: { link: "http://dummy_image_src.com" } });
//   //   }
//   // );
//   // long story short, every time we upload an image, we
//   // need to save it to the state so we can get it's data
//   // later when we decide what to do with it.

//   // Make sure you have a uploadImages: [] as your default state
//   let uploadedImages = this.state.uploadedImages;

//   const imageObject = {
//     file: file,
//     localSrc: URL.createObjectURL(file),
//   }

//   uploadedImages.push(imageObject);

//   this.setState({ uploadedImages: uploadedImages })

//   // We need to return a promise with the image src
//   // the img src we will use here will be what's needed
//   // to preview it in the browser. This will be different than what
//   // we will see in the index.md file we generate.
//   return new Promise(
//     (resolve, reject) => {
//       resolve({ data: { link: imageObject.localSrc } });
//     }
//   );
// }

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
      const data = new FormData();
      console.log(data);
      // eslint-disable-line no-undef
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    },
  );
}

export default function Grades() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  const [open1, setOpen1] = useState(false);
  const handle1Click = () => {
    setOpen1(!open1);
  };
  const [open2, setOpen2] = useState(false);
  const handle2Click = () => {
    setOpen2(!open2);
  };
  const [open3, setOpen3] = useState(false);
  const handle3Click = () => {
    setOpen3(!open3);
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (newState) => {
    setEditorState(newState);
  };


  // const [editorState1, setEditorState1] = useState(MUIEditorState.createEmpty(),
  // )
  // const onChange1 = newState => {
  //   setEditorState1(newState)
  // }

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
        {/* <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              All classroom
                </ListSubheader>
          }
          className={classes.root}
        >
          <Divider />
          <ListItem button onClick={handle1Click}>
            <ListItemText primary="This week" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="This week" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handle2Click}>
            <ListItemText primary="Last week" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Last week" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handle3Click}>
            <ListItemText primary="Earlier" />
            {open3 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Earlier" />
              </ListItem>
            </List>
          </Collapse>
        </List> */}
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          toolbar={{
            image: {
              uploadCallback: uploadImageCallBack,
              previewImage: true,
              alt: { present: true, mandatory: false },
            },
          }}
          onEditorStateChange={onChange}
        />
      </Paper>
      {/* <MUIEditor editorState={editorState1} onChange={onChange1} /> */}
    </div>
  );
}