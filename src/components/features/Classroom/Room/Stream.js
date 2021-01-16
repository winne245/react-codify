import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Link, Switch as SwitchRouter, NavLink, useRouteMatch, useParams, Redirect } from "react-router-dom";
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import ChatIcon from '@material-ui/icons/Chat';

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
import { Collapse, Dialog, Grid, Paper, TextField, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import axiosCodify from '../../../../api/axios';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  grid: {
    justifyContent: 'flex-end',
  },
  card: {
    position: 'relative',
  },
  cardMedia: {
    height: 240,
    borderRadius: 4,
  },
  cardTitle: {
    position: 'absolute',
    top: '20px',
    left: '20px',
  },
  paperLeft: {
    minHeight: 120,
    padding: 20,
  },
  paperLeftText: {
    display: 'block',
    marginTop: 10,
    marginBottom: 10,
  },
  paperLeftLink: {
    color: '#3578E5',
    display: 'flex',
    justifyContent: 'flex-end',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  paperRight: {
    marginBottom: 16,
  },
  paperRightItem: {
    height: 60,
  },
  submitArea: {
    width: '100%',
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between'
  },
  paperRightBottom: {
    marginBottom: 10,
    padding: 16,
  },
  paperRightText: {
    display: 'flex',
    marginTop: 10,
  },
}));

export default function Stream(props) {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();


  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  const [post, setPost] = useState({
    content: "",
  });
  const handlePostSubmit = (e) => {
    e.preventDefault();
    window.alert(post.content);
    // const signIn = async () => {
    //   try {
    //     const response = await axiosCodify.post('/signin', user);
    //     if (response.accessToken) {
    //       localStorage.setItem("accessToken", response.accessToken);
    //       dispatch({ type: ACTION_TYPE.SIGN_IN });
    //       // window.location.reload();
    //     }
    //   } catch (error) {
    //     console.log('Error: ', error);
    //   }
    // }
    // signIn();
  };

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
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardMedia
              component="img"
              className={classes.cardMedia}
              image={require('../../../../assets/images/classroom.jpg')}
            />
            <CardContent className={classes.cardTitle}>
              <Typography gutterBottom variant="h3" component="h1">
                {props.classroom.title}
              </Typography>
              <Typography component="p">
                Class code: {props.classroom.joinId}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paperLeft}>
            <Typography component="p">
              <strong>Upcoming</strong>
            </Typography>
            <Typography component="p" className={classes.paperLeftText}>
              No work due soon
            </Typography>
            <Link to="/classroom/to-do/assigned" className={classes.paperLeftLink}>
              View all
            </Link>
          </Paper>
        </Grid>


        <Grid item xs={9} container spacing={0} className={classes.grid}>
          <Grid item xs={12}>
            <Paper className={classes.paperRight}>
              <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ height: 60 }}>
                  <Avatar alt="" src={require('../../../../assets/images/avatar.png')} />
                  <Typography style={{ marginLeft: 12, paddingTop: 10 }}>
                    Announce something to your class
                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails style={{ paddingTop: 0 }}>
                  <form noValidate onSubmit={handlePostSubmit} style={{ width: '100%' }}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      multiline
                      rows={3}
                      id="content"
                      name="content"
                      label="What's on your mind?"
                      type="text"
                      fullWidth
                      // autoComplete="email"
                      autoFocus
                      onChange={e => setPost({ ...post, content: e.target.value })}
                    />
                    <div className={classes.submitArea}>
                      <Button
                        // type="submit"
                        variant="outlined"
                        color="primary"
                        className={classes.submit}
                      >
                        <AttachFileIcon style={{ height: 20, marginLeft: -10 }} />
                        Add
                      </Button>
                      <Button
                        // type="submit"
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                      >
                        Post
                    </Button>
                    </div>
                  </form>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>



          <Grid item xs={12}>
            <Paper className={classes.paperRight}>
              <ListItem
                button
                // to={`${match.url}/join-class`}
                // component={Link}
                className={classes.paperRightItem}
              >
                <AddBoxIcon className={classes.iconSidebar} />
                <ListItemText primary="Join class" />
              </ListItem>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paperRightBottom}>
              <Typography variant="h5" component="h1">
                Communicate with your class here
              </Typography>
              <div className={classes.paperRightText}>
                <ChatIcon />
                <Typography component="p" style={{ marginLeft: 10 }}>
                  Create and schedule announcements
                </Typography>
              </div>
              <div className={classes.paperRightText}>
                <ChatIcon />
                <Typography component="p" style={{ marginLeft: 10 }}>
                  Respond to student posts
                </Typography>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paperRightBottom}>
              <Typography variant="h5" component="h1">
                View class updates and connect with your class here
              </Typography>
              <div className={classes.paperRightText}>
                <ChatIcon />
                <Typography component="p" style={{ marginLeft: 10 }}>
                  See when new assignments are posted
                </Typography>
              </div>
            </Paper>
          </Grid>

        </Grid>
      </Grid>
    </div>
  );
}