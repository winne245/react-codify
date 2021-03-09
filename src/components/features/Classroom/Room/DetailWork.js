import { Accordion, AccordionDetails, AccordionSummary, Grid, Paper, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from "react-router-dom";
import axiosCodify from '../../../../api/axios';
import { useStateValue } from "../../../../context/StateProvider";
import Code from './Code/Code';
import StudentWork from './StudentWork';
import ReactHtmlParser from "react-html-parser";

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
    padding: 20,
    marginBottom: 16,
  },
  paperLeftComment: {
    marginBottom: 16,
  },
  submitArea: {
    width: '100%',
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between'
  },
  paperRight: {
    minHeight: 120,
    padding: 20,
    marginBottom: 16,
  },
  paperRightComment: {
    marginBottom: 16,
  },
  content: {
    borderTop: "1px solid #c1c1c1",
    marginTop: 10,
    marginBottom: -15,
    paddingTop: 10,
  },
}));

export default function DetailWork() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  const [open, setOpen] = useState(false);
  const callbackOpen = () => {
    setOpen(!open)
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const [open1, setOpen1] = useState(false);
  // const handle1Click = () => {
  //   setOpen1(!open1);
  // };
  // const [open2, setOpen2] = useState(false);
  // const handle2Click = () => {
  //   setOpen2(!open2);
  // };
  // const [open3, setOpen3] = useState(false);
  // const handle3Click = () => {
  //   setOpen3(!open3);
  // };

  const match = useRouteMatch();
  const params = useParams();
  const [exercise, setExercise] = useState([]);
  useEffect(() => {
    if (state.isSignIn) {
      const fetchExercise = async () => {
        try {
          const response = await axiosCodify.get(`${match.url}`);
          setExercise(response);
        } catch (error) {
          console.log('Error: ', error);
        }
      }
      fetchExercise();
    }
  }, [open, state.isSignIn]);
  const [exerciseResult, setExerciseResult] = useState([]);
  // const [exerciseResultCode, setExerciseResultCode] = useState();
  useEffect(() => {
    if (state.isSignIn) {
      const fetchExerciseResult = async () => {
        try {
          const response = await axiosCodify.get(`${match.url}/results`);
          setExerciseResult(response);
        } catch (error) {
          console.log('Error: ', error);
        }
      }
      fetchExerciseResult();
    }
  }, [open, exercise, state.isSignIn]);

  const [result, setResult] = useState(null);
  // useEffect(() => {
  //   exerciseResult.forEach(function (item, index) {
  //     if (item.student._id === state.user.id) {
  //       setResult(item)
  //     }
  //   })
  // }, [exerciseResult, state.isSignIn]);
  useEffect(() => {
    exerciseResult.map((item, index) => (
      item.student._id == state.user.id) ? (
        setResult(item)
      ) : (
        <></>
      ));
    console.log('result: ', result);
  }, [exerciseResult]);

  const resultLOL = () => {
    console.log('resultNe: ', result);
  };

  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    const studentList = async () => {
      try {
        const response = await axiosCodify.get(`/classrooms/${exercise.classroom?.alias}/attend`);
        setStudentList(response);
      } catch (error) {
        console.log('Error: ', error);
      }
    }
    studentList();
  }, [exercise]);


  const [post, setPost] = useState({
    content: "",
  });
  const handlePostSubmit = (e) => {
    e.preventDefault();
    window.alert(post.content);
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
        <Grid item xs={8}>
          <Paper className={classes.paperLeft}>
            <Typography gutterBottom variant="h5" component="h1">
              <strong>{exercise.title}</strong>
            </Typography>
            <Typography component="p">
              <strong>{exercise.creator?.firstName} {exercise.creator?.lastName}</strong> - {new Date(exercise.createAt).toLocaleString()}
            </Typography>
            <Typography component="p">
              {(state.user.id == exercise.creator?._id) ? (
                <>
                  100 point
                </>
              ) : (
                  <>
                    {(result == null) ? (
                      <>
                        0/{exercise.point} point
                      </>
                    ) : (
                        <>
                          {result.score}/{exercise.point} point
                        </>
                      )}
                  </>
                )}
              {/* {(exerciseResult.length == 0) ? (
                <>
                  0/{exercise.point}
                </>
              ) : (
                  <>
                    {exerciseResult.map((item, index) => (
                      item.student._id === state.user.id) ? (
                        <>{item.score}/{exercise.point}</>
                      ) : (
                        <>
                        </>
                      ))}
                  </>
                )} */}
            </Typography>
            <Typography component="p">
              <strong>Due:</strong> {new Date(exercise.expiredTime).toLocaleString()}
            </Typography>
            <Typography component="p" className={classes.content}>
              <strong >Content:</strong>
              <br />

            </Typography>
            {ReactHtmlParser(exercise.content)}
          </Paper>
          <Paper className={classes.paperLeftComment}>
            <Accordion >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ height: 60 }}>
                {/* <Avatar alt="" src={require('../../../../assets/images/avatar.png')} /> */}
                <Avatar style={{ backgroundColor: '#3c87c0' }} >
                  {state.user.firstName.charAt(0)}
                </Avatar>
                <Typography style={{ marginLeft: 12, paddingTop: 10 }}>
                  Public comments
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
                      type="submit"
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
        <Grid item xs={4}>
          {(state.user.id == exercise.creator?._id) ? (
            <>
              <Paper className={classes.paperRight}>
                <Typography gutterBottom variant="h5" component="h1">
                  Students work
                </Typography>
                <StudentWork
                  exercise={exercise}
                  exerciseResult={exerciseResult}
                  studentList={studentList}
                // callbackOpen={callbackOpen}
                />
              </Paper></>
          ) : (
              <>
                <Paper className={classes.paperRight}>
                  <Typography gutterBottom variant="h5" component="h1">
                    Your work
                  </Typography>
                  <Typography component="p" color="secondary">
                    {(result == null) ? (
                      <>
                        Unfinished
                      </>
                    ) : (
                        (result.isLate) ? (
                          <>
                            Late - {new Date(result.submitTime).toLocaleString()}
                          </>
                        ) : (
                            <>
                              Finished - {new Date(result.submitTime).toLocaleString()}
                            </>
                          ))}

                    {/* {(result.length == 0) ? (
                <>
                  Unfinished
                </>
              ) : (
                  <>
                    {result.map((item, index) => (
                      (item.isLate) ? (
                        <>
                          Late
                      </>
                      ) : (
                          <>
                            Finished
                        </>
                        )
                    ))}
                  </>
                )} */}
                  </Typography>
                  <Code
                    exercise={exercise}
                    result={result}
                    callbackOpen={callbackOpen}
                  />
                </Paper>
                {/* <Paper className={classes.paperRightComment}>
            <Accordion >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ height: 60 }}>
                <Avatar alt="" src={require('../../../../assets/images/avatar.png')} />
                <Typography style={{ marginLeft: 12, paddingTop: 10 }}>
                  Private comments
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
          </Paper> */}
              </>
            )}
        </Grid>
      </Grid>
    </div>
  );
}