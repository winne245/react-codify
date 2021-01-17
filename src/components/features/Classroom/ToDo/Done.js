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
import { Link } from 'react-router-dom';
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
    display: 'flex',
    justifyContent: 'space-between',
    width: '95%',
    marginLeft: theme.spacing(5.5),
  },
  nestedTitle: {
    display: 'flex',
  }
}));

export default function Done(props) {
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

  return (
    <div className={classes.root}>
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

              {props.doneExercises.map((item, index) => (
                props.firstDayThisWeek <= new Date(item.expiredTime) && new Date(item.expiredTime) <= props.lastDayThisWeek) ? (
                  <div key={item._id}>
                    <ListItem
                      button
                      to={`/classrooms/${item.classroom.alias}/exercises/${item._id}`}
                      component={Link}
                      className={classes.nested}
                    >
                      <div className={classes.nestedTitle}>
                        <ListItemIcon style={{ marginTop: 3 }}>
                          <LibraryBooksIcon />
                        </ListItemIcon>
                        <ListItemText primary={item.classroom.title} />
                        <ListItemText primary={item.title} style={{ paddingLeft: 30 }} />
                      </div>
                      {new Date(item.expiredTime).toLocaleString()}
                    </ListItem>
                  </div>
                ) : (
                  <>
                  </>
                ))}

            </List>
          </Collapse>
          <ListItem button onClick={handle2Click}>
            <ListItemText primary="Last week" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open2} timeout="auto" unmountOnExit>

            {props.doneExercises.map((item, index) => (
              props.firstDayLastWeek <= new Date(item.expiredTime) && new Date(item.expiredTime) <= props.lastDayLastWeek) ? (
                <div key={item._id}>
                  <ListItem
                    button
                    to={`/classrooms/${item.classroom.alias}/exercises/${item._id}`}
                    component={Link}
                    className={classes.nested}
                  >
                    <div className={classes.nestedTitle}>
                      <ListItemIcon style={{ marginTop: 3 }}>
                        <LibraryBooksIcon />
                      </ListItemIcon>
                      <ListItemText primary={item.classroom.title} />
                      <ListItemText primary={item.title} style={{ paddingLeft: 30 }} />
                    </div>
                    {new Date(item.expiredTime).toLocaleString()}
                  </ListItem>
                </div>
              ) : (
                <>
                </>
              ))}

          </Collapse>
          <ListItem button onClick={handle3Click}>
            <ListItemText primary="Earlier" />
            {open3 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              {props.doneExercises.map((item, index) => (
                new Date(item.expiredTime) < props.firstDayLastWeek) ? (
                  <div key={item._id}>
                    <ListItem
                      button
                      to={`/classrooms/${item.classroom.alias}/exercises/${item._id}`}
                      component={Link}
                      className={classes.nested}
                    >
                      <div className={classes.nestedTitle}>
                        <ListItemIcon style={{ marginTop: 3 }}>
                          <LibraryBooksIcon />
                        </ListItemIcon>
                        <ListItemText primary={item.classroom.title} />
                        <ListItemText primary={item.title} style={{ paddingLeft: 30 }} />
                      </div>
                      {new Date(item.expiredTime).toLocaleString()}
                    </ListItem>
                  </div>
                ) : (
                  <>
                  </>
                ))}

            </List>
          </Collapse>
        </List>
      </Paper>
    </div>
  );
}