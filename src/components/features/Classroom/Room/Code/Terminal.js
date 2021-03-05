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
import axiosCodify from "../../../../../api/axios";
import { useStateValue } from "../../../../../context/StateProvider";

const useStyles = makeStyles((theme) => ({
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

export default function Terminal(props) {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();
  const params = useParams();
  const [valueTerminal, setValueTerminal] = useState(0);
  const handleChangeTerminal = (event, newValue) => {
    setValueTerminal(newValue);
  };

  const [valueTestCase, setValueTestCase] = useState(0);
  const handleChangeTestCase = (event, newValue) => {
    setValueTestCase(newValue);
  };
  const [dataResponse, setDataResponse] = useState([]);
  const runCode = async () => {
    try {
      setValueTerminal(1);
      const response = await axiosCodify.post("/code/run", props.runData);
      setDataResponse(response);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const saveCode = (newValue) => {
    props.setSubmitData({
      exerciseId: params._id,
      code: props.runData.code,
      language: props.runData.language,
      compiler: props.runData.compiler,
      input: props.runData.input,
    });
    console.log(props.runData);
    console.log(props.submitData);
  };

  return (
    <>
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
                  {props.testCases.map((item, index) => (
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
                {props.testCases.map((item, index) => (
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
          <TabPanel value={props.valueTerminal} index={1}>
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
            props.setRunData({ ...props.runData, input: e.target.value })
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
    </>
  );
}
