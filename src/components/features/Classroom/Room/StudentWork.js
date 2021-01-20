import { Avatar, Button, Dialog, Grid, Slide, Tab, Tabs, TextField, Tooltip } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PeopleIcon from '@material-ui/icons/People';
import SaveIcon from '@material-ui/icons/Save';
import React, { Fragment, useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import axiosCodify from "../../../../api/axios";
import { useStateValue } from "../../../../context/StateProvider";
import StudentWorkResult from "./StudentWorkResult";
import ReactHtmlParser from 'react-html-parser';



const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flex: 1,
    marginLeft: 18,
    display: 'flex',
    alignItems: 'center',
  },
  tabs: {
  },
  tab: {
    minWidth: 400,
    minHeight: 65,
    padding: '0px 12px 0px 25px',
  },
  tabTitleTop: {
    width: '100%',
    height: 40,
    display: 'flex',
    padding: '75px 20px 25px 25px',
  },
  tabTitleUserTop: {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
  },
  icon: {
    width: 32,
    height: 32,
    padding: 5,
    backgroundColor: '#3578E5',
    color: '#ffffff',
    borderRadius: 25,
    marginRight: 10,
  },
  tabTitlePointTop: {
    height: '100%',
    maxWidth: 100,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
  },
  tabTitle: {
    width: '100%',
    height: 65,
    display: 'flex',
    textTransform: 'capitalize',
  },
  tabTitleUser: {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  tabTitlePoint: {
    height: '100%',
    maxWidth: 100,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 23,
    color: '#f02849',
  },
  root: {
    display: 'flex',
    height: '100%',
    paddingTop: 50,
  },
  content: {
    width: '100%',
    padding: '16px 16px 16px 416px',
  },
  paperRight: {
    height: 639,
    overflow: 'auto',
    padding: 16,
  },
}));

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div>
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StudentWork(props) {
  const classes = useStyles();
  const params = useParams();
  const match = useRouteMatch();
  const [state, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [resultID, setResultID] = useState();
  const [point, setPoint] = useState({
    "score": 0,
  });
  // useEffect(() => {
  //   console.log('1: ', match.url);
  //   console.log('2: ', resultID);
  //   console.log('2: ', point);
  //   const updateScore = async () => {
  //     try {
  //       const response = await axiosCodify.put(`${match.url}/results/${resultID}`, point);
  //       window.alert('Update point successfully!')
  //     } catch (error) {
  //       console.log('Error: ', error);
  //     }
  //   }
  //   updateScore();
  // }, [resultID]);

  const updateScore = async (resultID) => {
    try {
      console.log('1: ', match.url);
      console.log('2: ', resultID);
      console.log('2: ', point);
      const response = await axiosCodify.put(`${match.url}/results/${resultID}`, point);
      window.alert('Update point successfully!')
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <>
      <div className={classes.btn}>
        <Button
          fullWidth
          variant="contained"
          size="small"
          color="primary"
          className={classes.submit}
          style={{ marginTop: 12 }}
          onClick={handleClickOpen}
        >
          StudentWork
        </Button>
      </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={{ backgroundColor: state.isDarkMode ? '#212121' : '#ffffff' }}
        >
          <Toolbar style={{ minHeight: 45, paddingRight: 7 }}>
            <Tooltip title="Exit">
              <IconButton edge="start" color="primary" onClick={handleClose} aria-label="close">
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h6"
              component="h3"
              className={classes.title}
              style={{ color: state.isDarkMode ? '#ffffff' : '#65676b' }}
            >
              {props.exercise.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent">
          <span className={classes.tabTitleTop}>
            <Typography className={classes.tabTitleUserTop}>
              <PeopleIcon className={classes.icon} />
              Students
            </Typography>
            <Typography className={classes.tabTitlePointTop}>
              Point(100)
            </Typography>
          </span>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            className={classes.tabs}
            // variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
            style={{ borderBottom: state.isDarkMode ? '1px solid #595959' : '1px solid #e0e0e0', }}
          >
            {props.exerciseResult.map((item, index) => (
              <Tab
                label={
                  <span className={classes.tabTitle}>
                    <div
                      className={classes.tabTitleUser}
                    >
                      <Avatar style={{ backgroundColor: '#3c87c0', height: 32, width: 32, marginRight: 10, }} >
                        {item.student.firstName.charAt(0)}
                      </Avatar>
                      {item.student.firstName} {item.student.lastName}
                    </div>
                    <div className={classes.tabTitlePoint} key={item._id} style={{ borderLeft: state.isDarkMode ? '1px solid #595959' : '1px solid #e0e0e0', }}>
                      <TextField
                        defaultValue={item.score}
                        onChange={e => setPoint({ ...point, "score": e.target.value })}
                      />
                      {/* <IconButton onClick={() => setResultID(item._id)}> */}
                      <IconButton onClick={() => updateScore(item._id)}>
                        <Tooltip title="Save">
                          <SaveIcon />
                        </Tooltip>
                      </IconButton>
                    </div>
                  </span>
                }
                className={classes.tab}
                style={{ borderTop: state.isDarkMode ? '1px solid #595959' : '1px solid #e0e0e0', }}
              />
            ))}

            {props.studentList.map((item, index) => (
              props.exerciseResult.some(result => result.student._id === item.student._id) ? (
                <></>
              ) : (
                  <Tab
                    label={
                      <span className={classes.tabTitle}>
                        <div
                          className={classes.tabTitleUser}
                        >
                          <Avatar style={{ backgroundColor: '#3c87c0', height: 32, width: 32, marginRight: 10, }} >
                            {item.student.firstName.charAt(0)}
                          </Avatar>
                          {item.student.firstName} {item.student.lastName}
                        </div>
                        <div className={classes.tabTitlePoint} style={{ borderLeft: state.isDarkMode ? '1px solid #595959' : '1px solid #e0e0e0', paddingRight: 20 }}>
                          Unfinished
                        </div>
                      </span>
                    }
                    disabled
                    className={classes.tab}
                    style={{ borderTop: state.isDarkMode ? '1px solid #595959' : '1px solid #e0e0e0', }}
                  />
                )))}
          </Tabs>
        </Drawer>
        <div className={classes.root} style={{ backgroundColor: state.isDarkMode ? '#353535' : '#f0f2f5' }}>
          <div className={classes.content}>
            {props.exerciseResult.map((item, index) => (
              <TabPanel value={value} index={index}>
                <StudentWorkResult exerciseResult={item} />
              </TabPanel>
            ))}
            {/* {(props.exerciseResult.length == 0) ? (
              props.studentList.map((item, index) => (
                <TabPanel value={value} index={index}>
                  <Grid container spacing={2} className={classes.grid}>
                    <Grid item xs={6}>
                      <Paper className={classes.paperRight}>
                        <Typography><strong>{item.student.firstName} {item.student.lastName}</strong></Typography>
                        <Typography color="secondary">Unfinished</Typography>
                        <Typography><strong>Due:</strong> {new Date(props.exercise.expiredTime).toLocaleString()}</Typography>
                        <Typography style={{ marginTop: 20 }}><strong>Content:</strong></Typography>
                        {ReactHtmlParser(props.exercise.content)}
                      </Paper>
                    </Grid>
                  </Grid>
                </TabPanel>
              ))
            ) : (
                props.studentList.map((item, index) => (
                  props.exerciseResult.map((item1, index1) => (
                    item.student._id == item1.student._id) ? (
                      <TabPanel value={value} index={index}>
                        <StudentWorkResult exerciseResult={item1} />
                      </TabPanel>
                    ) : (
                      <TabPanel value={value} index={index}>
                        <Grid container spacing={2} className={classes.grid}>
                          <Grid item xs={6}>
                            <Paper className={classes.paperRight}>
                              <Typography><strong>{item.student.firstName} {item.student.lastName}</strong></Typography>
                              <Typography color="secondary">Unfinished</Typography>
                              <Typography><strong>Due:</strong> {new Date(props.exercise.expiredTime).toLocaleString()}</Typography>
                              <Typography style={{ marginTop: 20 }}><strong>Content:</strong></Typography>
                              {ReactHtmlParser(props.exercise.content)}
                            </Paper>
                          </Grid>
                        </Grid>
                      </TabPanel>
                    ))))
              )} */}
          </div>
        </div>
      </Dialog>
    </>
  );
}
