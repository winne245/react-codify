import { Tab, Tabs } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link, useRouteMatch } from "react-router-dom";
import { useStateValue } from "../../../context/StateProvider";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingLeft: 18,
  },
  contentTitle: {
    marginBottom: 10,
  },
  card: {
    position: 'relative',
    maxWidth: 285,
    height: 285,
    display: 'inline-flex',
    marginRight: 15,
    marginBottom: 15,
  },
  cardTeacher: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardContent: {
    height: 145,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardTitleContent: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardDescriptionContent: {
    height: 80,
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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

export default function AllClass(props) {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const match = useRouteMatch();

  return (
    <div className={classes.root}>
      {!state.isSignIn ? (
        <main className={classes.content}>
          This is Classrooms
        </main>
      ) : (
          <>
            <main className={classes.content}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                className={classes.contentTitle}
              >
                <Tab label="Teaching" />
                <Tab label="Enrolled" />
              </Tabs>
              <TabPanel value={value} index={0}>
                {props.createdClassroom.map((item, index) => (
                  <div key={item._id} className={classes.card}>
                    <Card
                      to={`${match.url}/${item.alias}/stream`}
                      component={Link}
                      style={{ textDecoration: 'none' }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="140"
                          image={require('../../../assets/images/classroom.jpg')}
                          title="Contemplative Reptile"
                        />
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.cardTeacher} >
                          <strong>{item.teacher.firstName}  {item.teacher.lastName}</strong>
                        </Typography>
                        <CardContent className={classes.cardContent}>
                          <Typography variant="h5" component="h2" className={classes.cardTitleContent}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p" className={classes.cardDescriptionContent}>
                            {item.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                ))}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {props.attendedClassroom.map((item, index) => (
                  <div key={item._id} className={classes.card}>
                    <Card
                      to={`${match.url}/${item.classroom.alias}/stream`}
                      component={Link}
                      style={{ textDecoration: 'none' }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt
                          ="Contemplative Reptile"
                          height="140"
                          image={require('../../../assets/images/classroom.jpg')}
                          title="Contemplative Reptile"
                        />
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.cardTeacher} >
                          <strong>{item.classroom.teacher.firstName}  {item.classroom.teacher.lastName}</strong>
                        </Typography>
                        <CardContent className={classes.cardContent}>
                          <Typography variant="h5" component="h2" className={classes.cardTitleContent}>
                            {item.classroom.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p" className={classes.cardDescriptionContent}>
                            {item.classroom.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                ))}
              </TabPanel>
            </main>
          </>
        )}
    </div>
  );
}