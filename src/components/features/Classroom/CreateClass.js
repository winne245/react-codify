import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Link, Switch as SwitchRouter, NavLink, useRouteMatch, Redirect, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

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
    marginBottom: 18,
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

export default function CreateClass(props) {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();
  const match = useRouteMatch();
  const history = useHistory();
  const [classroom, setClassroom] = useState({
    title: "",
    description: "",
    // className: "",
    // section: "",
    // subject: "",
    // room: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const CreateClass = async () => {
      try {
        const response = await axiosCodify.post('/classrooms/create', classroom);
        window.alert('Create successfully!')
        setClassroom({ ...classroom, title: "", description: "" });
        props.callbackSidebarReload();
        history.push(`/classrooms/${response.alias}/stream`);
      } catch (error) {
        window.alert('Class already exists!');
        console.log('Error: ', error);
      }
    }
    CreateClass();
  };

  return (
    <div className={classes.root}>
      <Toolbar className={clsx(classes.toolbarLight, state.isDarkMode && classes.toolbarDark)}>
        <Container maxWidth="md" style={{ padding: 0 }}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h5" style={{ fontWeight: 500 }}>
              Create class
            </Typography>
          </Toolbar>
        </Container>
      </Toolbar>
      <Container maxWidth="sm" className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant="h6"  >
            Please fill out the form.
          </Typography>
          <Divider className={classes.paperDivider} />
          <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              name="title"
              label="Title"
              type="text"
              autoFocus
              value={classroom.title}
              // autoComplete="email"
              // className={classes.paperInput}
              onChange={e => setClassroom({ ...classroom, title: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              name="description"
              label="description"
              type="text"
              value={classroom.description}
              // autoComplete="email"
              // className={classes.paperInput}
              onChange={e => setClassroom({ ...classroom, description: e.target.value })}
            />

            <Divider className={classes.paperDivider} />
            <div className={classes.paperBtn}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                type="submit"
              >
                Create
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </div>
  );
}