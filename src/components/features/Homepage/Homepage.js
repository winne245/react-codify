import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
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
import firebase from 'firebase';
import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Class';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RecentActorsIcon from '@material-ui/icons/RecentActors';

import { useStateValue } from "../../../context/StateProvider";
import { ACTION_TYPE } from "../../../reducers/reducer";
import productApi from '../../../api/productApi';

const drawerWidth = 240;

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
    padding: theme.spacing(3),
  },
  card: {
    maxWidth: 300,
    display: 'inline-flex',
    marginRight: 24,
  },
}));

export default function Homepage() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();
  // const [productList, setProductList] = useState([]);
  // useEffect(() => {
  //   const fetchProductList = async () => {
  //     try {
  //       const params = {
  //         _page: 1,
  //         _limit: 10
  //       };
  //       const response = await productApi.getAll(params);
  //       console.log('Fetch products successfully: ', response);
  //       setProductList(response.data);
  //     } catch (error) {
  //       console.log('Failed to fetch product list: ', error);
  //     }
  //   }
  //   fetchProductList();
  // }, []);

  return (
    <div className={classes.root}>
      {!state.isSignIn ? (
        <main className={classes.content}>
          This is Homepage
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
                <ListItem button>
                  <ListItemIcon>
                    <Avatar alt="" src={require('../../../assets/images/avatar.png')} />
                    {/* <Avatar alt="" src={firebase.auth().currentUser.photoURL} /> */}
                  </ListItemIcon>
                  <Typography variant="h6" style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {/* {firebase.auth().currentUser.displayName} */}
                    {/* {localStorage.getItem.accessToken("email")} */}
                    {state.user.email}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home page" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <ClassIcon />
                  </ListItemIcon>
                  <ListItemText primary="Classroom" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <MenuBookIcon />
                  </ListItemIcon>
                  <ListItemText primary="Lesson" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <BorderColorIcon />
                  </ListItemIcon>
                  <ListItemText primary="Practice" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <RecentActorsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Social" />
                </ListItem>
              </div>
            </Drawer>
            <main className={classes.content}>
              This is Homepage
          {/* <ul>
            {productList.map(product  => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul> */}
            </main>
          </>
        )}
    </div>
  );
}