import { Button, Dialog, Slide, Tab, Tabs, TextField, Tooltip } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CodeIcon from "@material-ui/icons/Code";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import HelpIcon from "@material-ui/icons/Help";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useParams } from "react-router-dom";
import axiosCodify from "../../../../../api/axios";
import { useStateValue } from "../../../../../context/StateProvider";
import AceTextEditor from "./AceEditor";

export const defaultDrawerWidth = 620;
const minDrawerWidth = 70;
const maxDrawerWidth = 1172;

export const defaultDrawerHeight = 393;
const minDrawerHeight = 100;
const maxDrawerHeight = 630;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flex: 1,
    marginLeft: 18,
    display: "flex",
    alignItems: "center",
  },
  tabs: {
    paddingTop: 50,
  },
  tab: {
    minWidth: 70,
    minHeight: 55,
  },
  root: {
    display: "flex",
    height: "100%",
    paddingTop: 50,
  },
  description: {
    display: "flex",
  },
  descriptionTool: {
    overflow: "auto",
  },
  content: {
    padding: "10px 10px 0px 85px",
  },
  draggerWidth: {
    cursor: "col-resize",
    position: "relative",
    top: 0,
    right: 0,
    bottom: 0,
  },
  draggerWidthIcon: {
    cursor: "col-resize",
    position: "absolute",
    top: "45%",
    right: -14.8,
    zIndex: 100,
    border: "1px solid #c1c1c1",
  },
  code: {
    flexGrow: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  option: {
    padding: 5,
    display: "flex",
    justifyContent: 'space-between',
  },
  optionSon: {
    display: "flex",
  },
  zoom: {
    borderRadius: 5,
  },
  language: {
    marginLeft: 5,
    width: 132,
    height: 31,
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  frontSize: {
    marginLeft: 5,
    width: 45,
    height: 31,
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  draggerHeight: {
    cursor: "col-resize",
    position: "relative",
    left: 0,
    right: 0,
    bottom: 0,
  },
  draggerHeightIcon: {
    cursor: "row-resize",
    position: "absolute",
    right: "50%",
    bottom: -14.8,
    zIndex: 100,
    transform: "rotate(90deg)",
    border: "1px solid #c1c1c1",

  },
  terminalTabs: {
    width: "100%",
    minHeight: 30,
    boxShadow: "0px 0px 5px #424242",
  },
  terminalTab: {
    minWidth: 180,
    minHeight: 30,
    height: 30,
    fontWeight: 550,
  },
  terminalContent: {
    flexGrow: 1,
    width: "100%",
    overflow: "auto",
    padding: 10,
  },
  terminalPaper: {
    border: "1px solid #c1c1c1",
  },
  terminalTestCase: {
    display: "flex",
    minHeight: 144,
  },
  terminalTabsTestCase: {
    // borderRight: '1px solid #c1c1c1',
  },
  terminalTabTestCase: {
    minWidth: 160,
    // borderBottom: '1px solid #c1c1c1',
  },
  terminalTestCaseContent: {
    width: "100%",
    minHeight: "100%",
    padding: 14,
    borderLeft: "1px solid #c1c1c1",
  },
  consoleContent: {
    padding: 15,
    minHeight: 144,
    display: 'flex',
  },
  consoleInput: {
    padding: 15,
    width: '40%',
    borderRight: "1px solid #c1c1c1",

  },
  consoleOutput: {
    padding: 15,
    width: '60%',
  },
  consoleContent: {
    minHeight: 144,
    display: 'flex',
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    padding: "5px 10px 5px 10px",
    boxShadow: "0px 0px 4px #424242",
  },
  txtInput: {
  },
  txtOutput: {
    padding: 15,
    minHeight: 55,
    border: "1px solid #a6a8ac",
    borderRadius: 4,
  },
  txtInput1: {
    maxHeight: 30,
    maxWeight: 152,
    borderRadius: 5,
    border: "1px solid #3578E5",
  },
  btnAction: {
    maxHeight: 30,
    marginLeft: 10,
  },
}));

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <>{children}</>}</div>;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Code(props) {
  const classes = useStyles();
  const params = useParams();
  const [state, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setTestCases(props.exercise.testCases);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [valueTerminal, setValueTerminal] = useState(0);
  const handleChangeTerminal = (event, newValue) => {
    setValueTerminal(newValue);
  };

  const [valueTestCase, setValueTestCase] = useState(0);
  const handleChangeTestCase = (event, newValue) => {
    setValueTestCase(newValue);
  };

  const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);
  const handleMouseDown = (e) => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };
  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };
  const handleMouseMove = useCallback((e) => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setDrawerWidth(newWidth);
    }
  }, []);

  const [drawerHeight, setDrawerHeight] = useState(defaultDrawerHeight);
  const handleMouseDown1 = (e) => {
    document.addEventListener("mouseup", handleMouseUp1, true);
    document.addEventListener("mousemove", handleMouseMove1, true);
  };
  const handleMouseUp1 = () => {
    document.removeEventListener("mouseup", handleMouseUp1, true);
    document.removeEventListener("mousemove", handleMouseMove1, true);
  };
  const handleMouseMove1 = useCallback((e) => {
    const newHeight = e.clientY - 92 - document.body.offsetLeft;
    if (newHeight > minDrawerHeight && newHeight < maxDrawerHeight) {
      setDrawerHeight(newHeight);
    }
  }, []);

  const [fullSize, setFullSize] = useState(false);
  const handleFullSize = () => {
    if (fullSize) {
      setDrawerWidth(defaultDrawerWidth);
      setDrawerHeight(defaultDrawerHeight);
      setFullSize(false);
    } else {
      setDrawerWidth(minDrawerWidth + 1);
      setDrawerHeight(maxDrawerHeight);
      setFullSize(true);
    }
  };

  const [testCases, setTestCases] = useState([]);
  const [dataResponse, setDataResponse] = useState([]);
  const [runData, setRunData] = useState({
    code: "",
    language: "c",
    compiler: "g++",
    input: "",
  });
  const [submitData, setSubmitData] = useState({
    exerciseId: "",
    code: "",
    language: "c",
    compiler: "g++",
    input: "",
  });
  const onChangeCode = (newValue) => {
    setRunData({
      ...runData,
      code: newValue,
    });
  };

  const submitCode = async () => {
    try {
      const response = await axiosCodify.post("/code/submit", submitData);
      // setDataResponse(response);
      window.alert("Submit successfully!");
      setOpen(false);
      props.callbackOpen();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const runCode = async () => {
    try {
      setValueTerminal(1);
      const response = await axiosCodify.post("/code/run", runData);
      setDataResponse(response);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const saveCode = (newValue) => {
    setSubmitData({
      exerciseId: params._id,
      code: runData.code,
      language: runData.language,
      compiler: runData.compiler,
      input: runData.input,
    });
    console.log(runData);
    console.log(submitData);
  };

  const [mode, setMode] = useState('c_cpp');
  const [theme, setTheme] = useState('dracula');
  const [frontSize, setFrontSize] = useState('14pt');

  return (
    <>
      <div className={classes.btn}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          fullWidth
          style={{ marginTop: 17 }}
          onClick={handleClickOpen}>
          Code
        </Button>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={{ backgroundColor: state.isDarkMode ? "#212121" : "#ffffff" }}>
          <Toolbar style={{ minHeight: 45, paddingRight: 7 }}>
            <Tooltip title="Exit">
              <IconButton
                edge="start"
                color="primary"
                onClick={handleClose}
                aria-label="close">
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h6"
              component="h3"
              className={classes.title}
              style={{ color: state.isDarkMode ? "#ffffff" : "#65676b" }}>
              {props.exercise.title}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              onClick={submitCode}>
              Submit
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent">
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            className={classes.tabs}
            // variant="fullWidth"
            indicatorColor="none"
            textColor="primary"
            aria-label="icon tabs example">
            <Tab icon={<ImportContactsIcon />} className={classes.tab} />
            <Tab icon={<FormatListBulletedIcon />} className={classes.tab} />
            <Tab icon={<HelpIcon />} className={classes.tab} />
          </Tabs>
        </Drawer>
        <div
          className={classes.root}
          style={{ backgroundColor: state.isDarkMode ? "#353535" : "#f0f2f5" }}>
          <div className={classes.description}>
            <div
              className={classes.descriptionTool}
              style={{ width: drawerWidth }}>
              <div className={classes.content}>
                <TabPanel value={value} index={0}>
                  {ReactHtmlParser(props.exercise.content)}
                </TabPanel>
                <TabPanel value={value} index={1}>
                  list
                </TabPanel>
                <TabPanel value={value} index={2}>
                  ?
                </TabPanel>
              </div>
            </div>
            <div
              onMouseDown={(e) => handleMouseDown(e)}
              className={classes.draggerWidth}>
              <IconButton
                size="small"
                className={classes.draggerWidthIcon}
                style={{
                  backgroundColor: state.isDarkMode ? "#353535" : "#D8DADF",
                }}>
                <CodeIcon />
              </IconButton>
            </div>
          </div>
          <Paper className={classes.code}>
            <div className={classes.option}>
              <div className={classes.optionSon}>
                <IconButton
                  className={classes.zoom}
                  size="small"
                  onClick={handleFullSize}
                  style={{
                    backgroundColor: state.isDarkMode ? "#353535" : "#D8DADF",
                  }}>
                  {fullSize ? (
                    <FilterNoneIcon style={{ height: 15 }} />
                  ) : (
                      <ZoomOutMapIcon style={{ height: 18 }} />
                    )}
                </IconButton>
                <select
                  id="selectLangue"
                  className={classes.language}
                  defaultValue={mode}
                  onChange={(e) => {
                    var sel = document.getElementById("selectLangue");
                    console.log(sel.value);
                    if (sel.value == "c") {
                      setMode("c_cpp");
                      setRunData({
                        ...runData,
                        language: "c",
                        compiler: "g++",
                      });
                    } else if (sel.value == "python") {
                      setMode("python");
                      setRunData({
                        ...runData,
                        language: "py",
                        compiler: "python",
                      });
                    } else if (sel.value == "c#") {
                      setMode("csharp");
                      setRunData({
                        ...runData,
                        language: "c#",
                        compiler: "c#",
                      });
                    } else if (sel.value == "java") {
                      setMode("java");
                      setRunData({
                        ...runData,
                        language: "java",
                        compiler: "java",
                      });
                    }
                    console.log(runData);
                  }}
                  style={{
                    backgroundColor: state.isDarkMode ? "#353535" : "#D8DADF",
                    color: state.isDarkMode ? "#ffffff" : "rgba(0, 0, 0, 0.54)",
                  }}>
                  <option value="c">C</option>
                  <option value="python">Python</option>
                  <option value="c#">C#</option>
                  <option value="java">Java</option>
                </select>
              </div>
              <div className={classes.optionSon}>
                <select
                  id="selectFrontSize"
                  className={classes.frontSize}
                  defaultValue={frontSize}
                  onChange={(e) => {
                    var sel2 = document.getElementById("selectFrontSize");
                    console.log(sel2.value);
                    if (sel2.value == "8pt") {
                      setFrontSize('8pt');
                    } else if (sel2.value == "10pt") {
                      setFrontSize('10pt');
                    } else if (sel2.value == "12pt") {
                      setFrontSize('12pt');
                    } else if (sel2.value == "14pt") {
                      setFrontSize('14pt');
                    } else if (sel2.value == "16pt") {
                      setFrontSize('16pt');
                    }
                  }}
                  style={{
                    backgroundColor: state.isDarkMode ? "#353535" : "#D8DADF",
                    color: state.isDarkMode ? "#ffffff" : "rgba(0, 0, 0, 0.54)",
                  }}>
                  <option value="8pt">8</option>
                  <option value="10pt">10</option>
                  <option value="12pt">12</option>
                  <option value="14pt">14</option>
                  <option value="16pt">16</option>
                </select>

                <select
                  id="selectTheme"
                  className={classes.language}
                  defaultValue={theme}
                  onChange={(e) => {
                    var sel1 = document.getElementById("selectTheme");
                    console.log(sel1.value);
                    if (sel1.value == "dracula") {
                      setTheme('dracula');
                    } else if (sel1.value == "terminal") {
                      setTheme('terminal');
                    } else if (sel1.value == "sqlserver") {
                      setTheme('sqlserver');
                    } else if (sel1.value == "tomorrow_night_blue") {
                      setTheme('tomorrow_night_blue');
                    } else if (sel1.value == "solarized_light") {
                      setTheme('solarized_light');
                    }
                  }}
                  style={{
                    backgroundColor: state.isDarkMode ? "#353535" : "#D8DADF",
                    color: state.isDarkMode ? "#ffffff" : "rgba(0, 0, 0, 0.54)",
                  }}>
                  <option value="dracula">Dracula</option>
                  <option value="sqlserver">Light</option>
                  <option value="terminal">Dark</option>
                  <option value="tomorrow_night_blue">Blue</option>
                  <option value="solarized_light">Solarized</option>
                </select>
              </div>
            </div>
            <main>
              {props.result == null ? (
                <>
                  <AceTextEditor
                    drawerHeight={drawerHeight}
                    onChangeCode={onChangeCode}
                    exerciseResultCode=""
                    theme={theme}
                    frontSize={frontSize}
                    mode={mode}
                  />
                </>
              ) : (
                  <>
                    <AceTextEditor
                      drawerHeight={drawerHeight}
                      onChangeCode={onChangeCode}
                      exerciseResultCode={props.result.studentCode}
                      theme={theme}
                      frontSize={frontSize}
                      mode={mode}
                    />
                  </>
                )}
              <div
                onMouseDown={(e) => handleMouseDown1(e)}
                className={classes.draggerHeight}>
                <IconButton
                  size="small"
                  className={classes.draggerHeightIcon}
                  style={{
                    backgroundColor: state.isDarkMode ? "#353535" : "#D8DADF",
                  }}>
                  <CodeIcon />
                </IconButton>
              </div>
            </main>
            <Tabs
              value={valueTerminal}
              onChange={handleChangeTerminal}
              // variant="fullWidth"
              indicatorColor="none"
              textColor="secondary"
              aria-label="icon tabs example"
              className={classes.terminalTabs}
              style={{
                backgroundColor: state.isDarkMode ? "#212121" : "#ffffff",
              }}>
              <Tab label="Test case" className={classes.terminalTab} />
              <Tab label="Console" className={classes.terminalTab} />
            </Tabs>
            <div className={classes.terminalContent}>
              <Paper
                className={classes.terminalPaper}
                style={{
                  backgroundColor: state.isDarkMode ? "#353535" : "#D8DADF",
                  color: state.isDarkMode ? "#ffffff" : "rgb(31, 31, 32)",
                }}>
                <TabPanel value={valueTerminal} index={0}>
                  <div className={classes.terminalTestCase}>
                    <div>
                      <Tabs
                        orientation="vertical"
                        value={valueTestCase}
                        onChange={handleChangeTestCase}
                        // variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="secondary"
                        aria-label="icon tabs example"
                        className={classes.terminalTabsTestCase}>
                        {testCases.map((item, index) => (
                          <Tab
                            key={index}
                            label={
                              <Fragment>
                                <span style={{ fontSize: "smaller" }}>
                                  Test case {index + 1}
                                </span>
                              </Fragment>
                            }
                            className={classes.terminalTabTestCase}
                          />
                        ))}
                      </Tabs>
                    </div>
                    <div className={classes.terminalTestCaseContent}>
                      {testCases.map((item, index) => (
                        <TabPanel
                          value={valueTestCase}
                          index={index}
                          key={index}>
                          <strong>Input:</strong> {item.input}
                          <br />
                          <br />
                          <strong>Output:</strong> {item.output}
                          <br />
                          <br />
                          <strong>Time limit:</strong> {item.timeLimit} ms
                        </TabPanel>
                      ))}
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={valueTerminal} index={1}>
                  <div className={classes.consoleContent}>
                    <div className={classes.consoleInput}>
                      <strong>Input:</strong>
                      <br />
                      <TextField
                        variant="outlined"
                        multiline
                        fullWidth
                        id="input"
                        name="input"
                        type="text"
                        onChange={(e) =>
                          setRunData({ ...runData, input: e.target.value })
                        }
                        className={classes.txtInput}
                      />
                    </div>
                    <div className={classes.consoleOutput}>
                      <strong>Output:</strong>
                      <br />
                      <div className={classes.txtOutput}>
                        {dataResponse.map((item, index) => (
                          <>
                            <span style={{ color: item.type == "success" ? "#3578E5" : "#ef7676", }}>
                              {" "}
                              {item.output}
                            </span>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </Paper>
            </div>
            <div
              style={{
                backgroundColor: state.isDarkMode ? "#212121" : "#ffffff",
                borderTop: state.isDarkMode ? "none" : "1px solid #c1c1c1",
              }}
              className={classes.action}>
              {/* <textarea
                type="text"
                placeholder="Enter the input to run test.."
                onChange={(e) =>
                  setRunData({ ...runData, input: e.target.value })
                }
                className={classes.txtInput1}
              /> */}
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                onClick={runCode}
                className={classes.btnAction}>
                Run
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                onClick={saveCode}
                className={classes.btnAction}>
                Save
              </Button>
            </div>
          </Paper>
        </div>
      </Dialog>
    </>
  );
}
