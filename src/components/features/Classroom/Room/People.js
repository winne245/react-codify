import { Avatar, Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useRouteMatch } from "react-router-dom";
import { useStateValue } from "../../../../context/StateProvider";



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    padding: '15px 30px 0px 30px',
    marginBottom: 20,
  },
  nested: {
    width: '95%',
    marginLeft: theme.spacing(5.5),
  },
}));

export default function People(props) {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  const match = useRouteMatch();

  // const [studentList, setStudentList] = useState([]);
  // useEffect(() => {
  //   if (state.isSignIn) {
  //     const studentList = async () => {
  //       try {
  //         const response = await axiosCodify.get(`/classrooms/${props.classroom.alias}/attend`);
  //         setStudentList(response);
  //       } catch (error) {
  //         console.log('Error: ', error);
  //       }
  //     }
  //     studentList();
  //   }
  // }, [state.isSignIn]);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <Typography variant="h5" component="h1" color="primary">
                Teachers
              </Typography>
            </ListSubheader>
          }
          className={classes.root}
        >
          <Divider />
          <ListItem>
            <Avatar style={{ backgroundColor: '#3c87c0', marginRight: 12 }} >
              {props.classroom.teacher?.firstName.charAt(0)}
            </Avatar>
            {props.classroom.teacher?.firstName} {props.classroom.teacher?.lastName}
          </ListItem>
        </List>
      </Paper>

      <Paper className={classes.paper}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <Typography variant="h5" component="h1" color="primary">
                Students
              </Typography>
            </ListSubheader>
          }
          className={classes.root}
        >
          <Divider />
          {props.studentList.map((item, index) => (
            <ListItem>
              <Avatar style={{ backgroundColor: '#3c87c0', marginRight: 12 }} >
                {item.student.firstName.charAt(0)}
              </Avatar>
              {item.student.firstName} {item.student.lastName}
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}