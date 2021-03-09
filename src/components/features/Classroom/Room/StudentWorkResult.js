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
import { useParams } from "react-router-dom";
import axiosCodify from "../../../../api/axios";
import ReactHtmlParser from 'react-html-parser';
import { useStateValue } from "../../../../context/StateProvider";
import AceTextEditor from "./Code/AceEditor";

const useStyles = makeStyles((theme) => ({
  terminalTestCase: {
    display: 'flex',
  },
  terminalTabTestCase: {
    minWidth: 160,
  },
  terminalTestCaseContent: {
    width: '100%',
    minHeight: 192,
    padding: 14,
    borderLeft: '1px solid #c1c1c1',
  },
  content: {
    borderTop: "1px solid #c1c1c1",
    marginTop: 10,
    marginBottom: -15,
    paddingTop: 10,
  },
  paperLeft1: {
    height: 430,
    overflow: 'auto',
    marginBottom: 16,
    padding: 16,
  },
  paperLeft2: {
    height: 192,
    overflow: 'auto'
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

export default function StudentWorkResult(props) {
  const classes = useStyles();
  const params = useParams();
  const [state, dispatch] = useStateValue();

  const [valueTestCase, setValueTestCase] = useState(0);
  const handleChangeTestCase = (event, newValue) => {
    setValueTestCase(newValue);
  };

  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid item xs={6}>
        <Paper className={classes.paperRight}>
          <Typography variant="h5"><strong>{props.exerciseResult.student.firstName} {props.exerciseResult.student.lastName}</strong></Typography>
          {props.exerciseResult.isLate == true ? (
            <Typography color="secondary">Late</Typography>
          ) : (
              <Typography color="primary">Finished</Typography>
            )}
          <Typography><strong>Due:</strong> {new Date(props.exerciseResult.exercise.expiredTime).toLocaleString()}</Typography>
          <Typography><strong>Commit day:</strong> {new Date(props.exerciseResult.submitTime).toLocaleString()}</Typography>
          <Typography className={classes.content}><strong>Content:</strong></Typography>
          {ReactHtmlParser(props.exerciseResult.exercise.content)}
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paperLeft1}>
          <Typography><strong>Student's Code:</strong></Typography>
          <AceTextEditor drawerHeight={"94%"} exerciseResultCode={props.exerciseResult.studentCode} />
        </Paper>
        <Paper className={classes.paperLeft2}>
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
                className={classes.terminalTabsTestCase}
              >
                {props.exerciseResult.testCases.map((item, index) => (
                  <Tab
                    label={
                      <Fragment>
                        <span style={{ fontSize: "smaller" }}>Test case {index + 1}</span>
                      </Fragment>
                    }
                    className={classes.terminalTabTestCase} />
                ))}
              </Tabs>
            </div>
            <div className={classes.terminalTestCaseContent}>
              {props.exerciseResult.testCases.map((item, index) => (
                <TabPanel value={valueTestCase} index={index}>
                  <strong>Input:</strong> {item.input}
                  <br />
                  <strong>Output:</strong> {item.output}
                  <br />
                  <strong>Time limit:</strong> {item.timeLimit} ms
                  <br />
                  <strong>Point:</strong> {item.point}
                  <br /><br />
                  {item.pass == false ? (
                    <Typography color="secondary">FAIL</Typography>
                  ) : (
                      <Typography color="primary">PASS</Typography>
                    )}
                </TabPanel>
              ))}
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
