import DateFnsUtils from '@date-io/date-fns';
import { Accordion, AccordionDetails, AccordionSummary, Paper, Tooltip } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CodeIcon from '@material-ui/icons/Code';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import draftToHtml from 'draftjs-to-html';
import React, { useEffect, useState } from 'react';
// import { stateToHTML } from "draft-js-export-html";
import renderHTML from 'react-render-html';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axiosCodify from '../../../../api/axios';
import { useStateValue } from "../../../../context/StateProvider";
// import axiosCodify, { setClientToken } from '../../../api/axios';
import CreateWork_EditContent from "./CreateWork_EditContent";



const useStyles = makeStyles((theme) => ({
  btn: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: 18,
    flex: 1,
  },
  paper: {
    padding: '16px 16px 16px 16px',
    marginBottom: 15,
  },
  contentArea: {
    wordWrap: 'break-word',
    minHeight: 20,
    borderBottom: '1.5px solid #949494',
  },
  testCaseArea: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'space-between'
  },
  dueSwitch: {
    marginLeft: 8,

  },
  formControl: {
    marginLeft: 12,
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
      const data = new FormData();
      console.log(data);
      // eslint-disable-line no-undef
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    },
  );
}

export default function CreateWork(props) {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const [editorState, setEditorState] = useState();
  const callbackContent = (childData) => {
    setEditorState(childData);
  };

  const [testCase, setTestCase] = useState([
    {
      id: Math.floor(Math.random() * 10000),
      input: "",
      output: "",
      point: "",
    },
    {
      id: Math.floor(Math.random() * 10000),
      input: "",
      output: "",
      point: "",
    },
    {
      id: Math.floor(Math.random() * 10000),
      input: "",
      output: "",
      point: "",
    }
  ]);
  const onChangeTestCase = (id, sw) => (e) => {
    const newTestCase = testCase.map(i => {
      if (i.id == id) {
        if (sw == 1)
          return { ...i, input: e.target.value };
        else if (sw == 2)
          return { ...i, output: e.target.value };
        else
          return { ...i, point: e.target.value };
      }
      else return (i);
    });
    setTestCase(newTestCase);
    console.log(newTestCase);
  }

  const [work, setWork] = useState({
    title: "",
    content: "",
    testCase: [],
    point: "",
    expireTime: "",
  });

  // const saveCreateWork = () => {
  //   console.log('Error: ', work);
  // };

  const [selectedDate, handleDateChange] = useState("");
  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);
  const dateTimePicker = () => {
    setOpenDateTimePicker(!openDateTimePicker);
  }

  useEffect(() => {
    setWork({
      ...work,
      content: draftToHtml(editorState),
      testCase: testCase,
      point: 100,
      expireTime: selectedDate,
    });
    console.log('Error: ', work);
  }, [editorState, selectedDate, testCase]);

  const doneCreateWork = () => {
    const save = async () => {
      try {
        const response = await axiosCodify.post(`${props.match.url}/create`, work);
        window.alert('Create successfully!');
        props.callbackOpen();
        setOpen(false);
        setOpenDateTimePicker(false);
      } catch (error) {
        console.log('Error: ', error);
      }
    }
    save();
  };

  return (
    <>
      <div className={classes.btn}>
        <Button variant="contained" color="secondary" size="small" onClick={handleClickOpen}>
          create work
        </Button>
      </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <div>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Tooltip title="Exit">
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <ChevronLeftIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="h6" className={classes.title}>
                Assignment
              </Typography>
              {/* <Button autoFocus color="inherit" type="submit" onClick={saveCreateWork}>
                Save
              </Button> */}
              <Button autoFocus color="inherit" type="submit" onClick={doneCreateWork}>
                Submit
              </Button>
            </Toolbar>
          </AppBar>
          <main style={{ padding: 18, minHeight: '91.4vh', backgroundColor: state.isDarkMode ? '#353535' : '#f0f2f5' }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Paper className={classes.paper}>
                  <Typography variant="h6">
                    Title
                  </Typography>
                  <TextField
                    id="standard-basic"
                    fullWidth
                    onChange={e => setWork({ ...work, title: e.target.value })}
                  />
                </Paper>
                <Paper
                  className={classes.paper}
                  onClick={handleClickOpenEdit}
                  onChange={e => setWork({ ...work, content: draftToHtml(editorState) })}
                >
                  <Typography variant="h6">
                    Content
                  </Typography>
                  <div className={classes.contentArea}>
                    {/* {JSON.stringify((draftToHtml(editorState)))} */}
                    {renderHTML(draftToHtml(editorState))}
                  </div>
                </Paper>
                <CreateWork_EditContent open={openEdit} handleClose={handleCloseEdit} callbackContent={callbackContent} />
              </Grid>
              <Grid item xs={4} >
                <Grid container spacing={2}>
                  <Grid item xs={7} >
                    <Paper className={classes.paper}>
                      <Typography variant="h6">
                        Due
                        <Switch
                          color="primary"
                          value={openDateTimePicker}
                          onChange={dateTimePicker}
                          className={classes.dueSwitch}
                        />
                      </Typography>
                      {openDateTimePicker ? (
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDateTimePicker
                            // label="Due datetime picker"
                            value={selectedDate}
                            onChange={handleDateChange}
                            showTodayButton
                            format="MM/dd/yyyy hh:mm a"
                          />
                          {/* <KeyboardDatePicker
                          id="date-picker"
                          label="Due date picker"
                          value={selectedDate}
                          format="MM/dd/yyyy"
                          onChange={handleDateChange}
                        />
                        <KeyboardTimePicker
                          id="time-picker"
                          label="Due time picker"
                          value={selectedDate}
                          onChange={handleDateChange}
                        /> */}
                        </MuiPickersUtilsProvider>
                      ) : (<div />)}
                    </Paper>
                  </Grid>
                  <Grid item xs={5} >
                    <Paper className={classes.paper} style={{ display: 'flex', paddingBottom: 20 }} >
                      <Typography variant="h6">
                        Points : 100
                      </Typography>

                      {/* <FormControl size="small" variant="outlined" className={classes.formControl}>
                        <Select native>
                          <option value={10}>10</option>
                          <option value={100}>100</option>
                        </Select>
                      </FormControl> */}
                    </Paper>
                  </Grid>
                </Grid>
                <Paper className={classes.paper}>
                  <Typography variant="h6">
                    Test case
                  </Typography>
                  {testCase.map((item, index) => (
                    <div key={item.id}>
                      {/* {index}:{item.text} */}
                      <Accordion style={{ marginBottom: 5 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ height: 60 }}>
                          <CodeIcon />
                          <Typography style={{ marginLeft: 10 }}>
                            Test case {index + 1}
                          </Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails style={{ paddingTop: 0 }}>
                          <form noValidate style={{ width: '100%' }}>
                            <div className={classes.testCaseArea}>
                              <TextField
                                // id="input1"
                                label="Input"
                                variant="filled"
                                multiline
                                size="small"
                                style={{ width: 140 }}
                                onChange={onChangeTestCase(item.id, 1)}
                              />
                              <TextField
                                // id="output1"
                                label="Output"
                                multiline
                                variant="filled"
                                size="small"
                                style={{ width: 140 }}
                                onChange={onChangeTestCase(item.id, 2)}
                              />
                              <TextField
                                // id="grades1"
                                label="Point"
                                variant="filled"
                                size="small"
                                style={{ width: 70 }}
                                onChange={onChangeTestCase(item.id, 3)}
                              />
                              <Tooltip title="Delete">
                                <IconButton
                                  aria-label="delete"
                                  color="secondary"
                                  className={classes.submit}
                                  style={{ height: 50, width: 50 }}
                                  onClick={() => {
                                    const newTestCase = testCase.filter(prev => prev.id !== item.id);
                                    setTestCase(newTestCase);
                                  }}
                                >
                                  <DeleteIcon fontSize="large" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </form>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
                  <div className={classes.btn}>
                    <Button
                      // type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={() => {
                        const newItem = {
                          id: Math.floor(Math.random() * 10000),
                          input: "",
                          output: "",
                          point: "",
                        }
                        setTestCase((preList) => [...preList, newItem]);
                      }}
                    >
                      Add Test Case
                  </Button>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </main>
        </div>
      </Dialog>
    </>
  );
}
