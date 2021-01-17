import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BatteryCharging50Icon from '@material-ui/icons/BatteryCharging50';
import BatteryCharging80Icon from '@material-ui/icons/BatteryCharging80';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import React from 'react';
import { NavLink, Route, Switch as SwitchRouter, useRouteMatch } from "react-router-dom";
import { useStateValue } from "../../../context/StateProvider";
import NotFound from "../../shares/NotFound/NotFound";
import Detail from "./detail";




const drawerWidth = 300;

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
  },
}));

export default function Social() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  const match = useRouteMatch();
  return (
    <div className={classes.root}>
      {!state.isSignIn ? (
        <main className={classes.content}>
          This is Social
        </main>
      ) : (
          <>
            <SwitchRouter>
              <Route exact path={match.url} component={Detail} />
              <Route path={`${match.url}/a`} component={Detail} />
              <Route path={`${match.url}/b`} component={Detail} />
              <Route path={`${match.url}/c`} component={Detail} />
              <Route path={`${match.url}/d`} component={Detail} />
              <Route component={NotFound} />
            </SwitchRouter>

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
                    Practice
                </Typography>
                </ListItem>



                <Divider />
                <div className={classes.space} />
                <ListItem className={clsx(classes.sidebarLightItemSearch, state.isDarkMode && classes.sidebarDarkItemSearch)}>
                  <SearchIcon className={classes.sidebarItemSearchIcon} />
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
                <ListSubheader inset className={classes.myClassTitle} >Status</ListSubheader>
                <ListItem
                  button
                  to={`${match.url}/a`}
                  component={NavLink}
                  className={classes.sidebarItem}
                  activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
                >
                  <DoneIcon className={classes.iconSidebar} />
                  <ListItemText primary="Complete" />
                </ListItem>
                <ListItem
                  button
                  to={`${match.url}/b`}
                  component={NavLink}
                  className={classes.sidebarItem}
                  activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
                >
                  <CloseIcon className={classes.iconSidebar} />
                  <ListItemText primary="Incomplete" />
                </ListItem>
                <div className={classes.space} />

                <Divider />
                <ListSubheader inset className={classes.myClassTitle} >Level</ListSubheader>
                <ListItem
                  button
                  to={`${match.url}/c`}
                  component={NavLink}
                  className={classes.sidebarItem}
                  activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
                >
                  <BatteryCharging50Icon className={classes.iconSidebar} />
                  <ListItemText primary="Easy" />
                </ListItem>
                <ListItem
                  button
                  to={`${match.url}/d`}
                  component={NavLink}
                  className={classes.sidebarItem}
                  activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
                >
                  <BatteryCharging80Icon className={classes.iconSidebar} />
                  <ListItemText primary="Medium" />
                </ListItem>
                <ListItem
                  button
                  to={`${match.url}/e`}
                  component={NavLink}
                  className={classes.sidebarItem}
                  activeClassName={clsx(classes.listItemLightActive, state.isDarkMode && classes.listItemDarkActive)}
                >
                  <BatteryChargingFullIcon className={classes.iconSidebar} />
                  <ListItemText primary="hard" />
                </ListItem>

              </div>
            </Drawer>
            {/* <main className={classes.content}>
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
            </Card>
          </main> */}
          </>
        )}
    </div>
  );
}