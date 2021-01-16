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
import AddIcon from '@material-ui/icons/Add';
import ClassIcon from '@material-ui/icons/Class';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
// import axiosClient from '../../../api/axiosClient';
// import axiosCodify from '../../../api/axios';
// import productApi from '../../../api/productApi';
import { useStateValue } from "../../../../context/StateProvider";
// import { ACTION_TYPE } from "../../../reducers/reducer";
import NotFound from "../../../shares/NotFound/NotFound";


import CreateWork from "./CreateWork";
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';
import { Accordion, AccordionDetails, AccordionSummary, Collapse, Fab, Paper, TextField, Tooltip } from '@material-ui/core';
import DetailWork from './DetailWork';
import axiosCodify from '../../../../api/axios';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    padding: '15px 30px 10px 30px',
    marginBottom: 15,
  },
  nested: {
    width: '95%',
    marginLeft: theme.spacing(5.5),
  },
}));

export default function Exercises(props) {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  const [open, setOpen] = useState(false);
  const callbackOpen = () => {
    setOpen(!open)
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

  const match = useRouteMatch();

  const [exercisesList, setExercisesList] = useState([]);
  useEffect(() => {
    if (state.isSignIn) {
      const fetchExercises = async () => {
        try {
          const response = await axiosCodify.get(`${match.url}`);
          setExercisesList(response);
        } catch (error) {
          console.log('Error: ', error);
        }
      }
      fetchExercises();
    }
  }, [open]);
  return (
    <div className={classes.root}>
      <SwitchRouter>
        <Route exact path={match.url}>
          {exercisesList.map((item, index) => (
            <div key={item._id}>
              {/* <Paper> */}
              <Accordion style={{ marginBottom: 5 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <div style={{ width: '100%', minHeight: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex' }}>
                      <LibraryBooksIcon />
                      <Typography style={{ marginLeft: 15 }}>
                        {item.title}
                      </Typography>
                    </div>
                    <Typography>
                      {new Date(item.createAt).toDateString()}
                    </Typography>
                  </div>
                </AccordionSummary>
                <Divider />
                <AccordionDetails style={{ paddingTop: 0 }}>
                  <form noValidate style={{ width: '100%' }}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      multiline
                      rows={3}
                      // id="content"
                      name="content"
                      label="What's on your mind?"
                      type="text"
                      fullWidth
                      // autoComplete="email"
                      autoFocus
                    // onChange={e => setPost({ ...post, content: e.target.value })}
                    />
                    <div className={classes.submitArea}>
                      <Button
                        // type="submit"
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to={`${match.url}/${item._id}`}
                        className={classes.submit}
                      >
                        {/* <AttachFileIcon style={{ height: 20, marginLeft: -10 }} /> */}
                        view Detail Work
                      </Button>
                      {/* <Button
                  // type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Post
                </Button> */}
                    </div>
                  </form>
                </AccordionDetails>
              </Accordion>
              {/* </Paper> */}
            </div>
          ))}
          <CreateWork match={match} callbackOpen={callbackOpen} />
        </Route>
        <Route path={`${match.url}/:_id`} component={DetailWork} />
        <Route component={NotFound} />
      </SwitchRouter>
    </div>
  );
}