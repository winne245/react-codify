import { Button, Dialog, Slide, Tab, Tabs, Tooltip } from "@material-ui/core";
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
import React, { Fragment, useCallback, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useParams } from "react-router-dom";
import axiosCodify from "../../../../api/axios";
import { useStateValue } from "../../../../context/StateProvider";
import AceTextEditor from "./AceEditor";

export const defaultDrawerWidth = 620;
const minDrawerWidth = 70;
const maxDrawerWidth = 1470;

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
    right: -15,
    zIndex: 100,
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
  },
  zoom: {
    borderRadius: 5,
  },
  language: {
    marginLeft: 5,
    width: 150,
    height: 31,
    border: "none",
    borderRadius: 5,
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
    bottom: -15,
    zIndex: 100,
    transform: "rotate(90deg)",
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
    height: "100%",
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
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    padding: "5px 10px 5px 10px",
    boxShadow: "0px 0px 4px #424242",
  },
  txtInput: {
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
              <IconButton
                className={classes.zoom}
                size="small"
                onClick={handleFullSize}
                style={{
                  backgroundColor: state.isDarkMode ? "#353535" : "#D8DADF",
                }}>
                {fullSize ? (
                  <FilterNoneIcon style={{ height: 18 }} />
                ) : (
                  <ZoomOutMapIcon style={{ height: 18 }} />
                )}
              </IconButton>
              <select
                id="selectList"
                className={classes.language}
                onChange={(e) => {
                  var sel = document.getElementById("selectList");
                  console.log(sel.value);
                  if (sel.value == "c") {
                    setRunData({
                      ...runData,
                      language: "c",
                      compiler: "g++",
                    });
                  } else if (sel.value == "python") {
                    setRunData({
                      ...runData,
                      language: "py",
                      compiler: "python",
                    });
                  }
                  console.log(runData);
                }}
                style={{
                  backgroundColor: state.isDarkMode ? "#353535" : "#D8DADF",
                  color: state.isDarkMode ? "#ffffff" : "rgba(0, 0, 0, 0.54)",
                }}>
                <option value="c">C</option>
                {/* <option value="c++">C++</option> */}
                <option value="python">Python</option>
              </select>
            </div>
            <main>
              {props.result == null ? (
                <>
                  <AceTextEditor
                    drawerHeight={drawerHeight}
                    onChangeCode={onChangeCode}
                    exerciseResultCode=""
                  />
                </>
              ) : (
                <>
                  <AceTextEditor
                    drawerHeight={drawerHeight}
                    onChangeCode={onChangeCode}
                    exerciseResultCode={props.result.studentCode}
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
                    {dataResponse.map((item, index) =>
                      item.type == "success" ? (
                        <>
                          <strong>RUN TEST SUCCESS</strong>
                          <br />
                          <br />
                          <strong>Input:</strong> {item.input}
                          <br />
                          <br />
                          <strong>Output:</strong> {item.output}
                          <br />
                          <br />
                          <strong>Run time:</strong> {item.runTime} ms
                        </>
                      ) : (
                        <>
                          <strong>RUN TEST FAIL</strong>
                          <br />
                          <br />
                          <strong>Error:</strong>
                          <span style={{ color: "#ef7676" }}>
                            {" "}
                            {item.output}
                          </span>
                        </>
                      )
                    )}
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
              <textarea
                type="text"
                placeholder="Enter the input to run test.."
                onChange={(e) =>
                  setRunData({ ...runData, input: e.target.value })
                }
                className={classes.txtInput}
              />
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
