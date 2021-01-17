import { Accordion, AccordionDetails, AccordionSummary, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch as SwitchRouter, useRouteMatch } from "react-router-dom";
import axiosCodify from '../../../../api/axios';
import { useStateValue } from "../../../../context/StateProvider";
import NotFound from "../../../shares/NotFound/NotFound";
import CreateWork from "./CreateWork";
import DetailWork from './DetailWork';

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
                      {new Date(item.expiredTime).toLocaleString()}
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
          {(state.user.id == props.classroom.teacher?._id) ? (
            <>
              <CreateWork match={match} callbackOpen={callbackOpen} />
            </>
          ) : (
              <>
              </>
            )}
        </Route>
        <Route path={`${match.url}/:_id`} component={DetailWork} />
        <Route component={NotFound} />
      </SwitchRouter>
    </div>
  );
}