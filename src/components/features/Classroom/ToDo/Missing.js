import { Collapse, Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import React, { useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import { useStateValue } from "../../../../context/StateProvider";



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: '15px 30px 10px 30px',
  },
  nested: {
    width: '95%',
    marginLeft: theme.spacing(5.5),
  },
}));

export default function Missing() {
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
                All classes
              </Typography>
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
                <ListItemText primary="BT1" />
                <ListItemText primary="11/12/2020" style={{ marginLeft: 650 }} />
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
                <ListItemText primary="BT2" />
                <ListItemText primary="5/12/2020" style={{ marginLeft: 650 }} />
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
                <ListItemText primary="BT3" />
                <ListItemText primary="15/11/2020" style={{ marginLeft: 650 }} />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Paper>
    </div>
  );
}