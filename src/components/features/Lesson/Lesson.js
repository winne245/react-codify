import React from 'react';
import { Route, BrowserRouter as Router, Link, Switch as  SwitchRouter, NavLink, useRouteMatch, Redirect} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import SignalCellular1BarIcon from '@material-ui/icons/SignalCellular1Bar';
import SignalCellular3BarIcon from '@material-ui/icons/SignalCellular3Bar';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Class';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RecentActorsIcon from '@material-ui/icons/RecentActors';

import Detail from "./detail";
import NotFound from "../../shares/NotFound/NotFound";

import { useStateValue } from "../../../context/StateProvider";
import { ACTION_TYPE } from "../../../reducers/reducer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  myClassTitle: {
    marginLeft: -55,
  },
  card: {
    maxWidth: 300,
    display: 'inline-flex',
    marginRight: 24,
  },
  inputRoot: {
    width: 200,
    marginLeft: -30,
    borderRadius: 25,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    //vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sidebarLightItemSearch: {
    width: 200,
    height: 35,
    marginLeft: 20,
    borderRadius: 25,
    backgroundColor: '#f0f2f5',
  },
  sidebarDarkItemSearch: {
    width: 200,
    height: 35,
    marginLeft: 20,
    borderRadius: 25,
    backgroundColor: '#6d6d6d',
  },
  sidebarItemSearchIcon: {
    marginLeft: -10,
  },
  sidebarItem: { 
    width: 220,
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
    marginRight: 10,
  },
  space: {
    height: 10
  }
}));

export default function Lesson() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  const match = useRouteMatch();
  return (
    <div className={classes.root}>
      {!state.isSignIn ? (
        <main className={classes.content}>
          This is Lesson
        </main>
      ) : ( 
        <>
          {/* <SwitchRouter>
            <Route exact path={match.url} component={Detail} />
            <Route path={`${match.url}/a`} component={Detail} />
            <Route path={`${match.url}/b`} component={Detail} />
            <Route path={`${match.url}/c`} component={Detail} />
            <Route path={`${match.url}/d`} component={Detail} />
            <Route component={NotFound} />
          </SwitchRouter>         */}
      
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
                  Lesson
                </Typography> 
              </ListItem>
                
                  
              <Divider />
              <div className={classes.space} />
              <ListItem className={clsx(classes.sidebarLightItemSearch, state.isDarkMode && classes.sidebarDarkItemSearch)}>
                <SearchIcon className={classes.sidebarItemSearchIcon}/>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </ListItem>
              <div className={classes.space} />
              
              <Divider />
              <ListSubheader inset className={classes.myClassTitle} >Knowledge</ListSubheader>
              <ListItem 
                button 
                to={`${match.url}/a`}
                component={NavLink}
                className={classes.sidebarItem}
                activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
              >
                <TrendingFlatIcon className={classes.iconSidebar}/>
                <ListItemText  primary="Basic" />
              </ListItem>
              <ListItem 
                button 
                to={`${match.url}/b`}
                component={NavLink}
                className={classes.sidebarItem}
                activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
              >
                <TrendingUpIcon className={classes.iconSidebar}/>
                <ListItemText  primary="Advanced" />
              </ListItem>
              <div className={classes.space} />
                
              <Divider />
              <ListSubheader inset className={classes.myClassTitle} >Programming</ListSubheader>
              <ListItem 
                button 
                to={`${match.url}/c`}
                component={NavLink}
                className={classes.sidebarItem}
                activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
              >
                <TrendingFlatIcon className={classes.iconSidebar}/>
                <ListItemText  primary="Basic" />
              </ListItem>
              <ListItem 
                button 
                to={`${match.url}/d`}
                component={NavLink}
                className={classes.sidebarItem}
                activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
              >
                <TrendingUpIcon className={classes.iconSidebar}/>
                <ListItemText  primary="Advanced" />
              </ListItem>              
            </div>
          </Drawer>
          <main className={classes.content}>
            This is Lesson
            {/* <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={require('../../../assets/images/classroom.jpg')}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Abcd Abcd
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={require('../../../assets/images/classroom.jpg')}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Bcda Bcda
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card> */}
          </main>
        </>
      )}
    </div>
  );
}