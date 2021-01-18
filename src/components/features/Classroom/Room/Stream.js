import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ChatIcon from "@material-ui/icons/Chat";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useStateValue } from "../../../../context/StateProvider";
import {
  initiateSocket,
  disconnectSocket,
  subscribeToComment,
  sendComment,
  loadOldComments,
} from "../../../../api/socketIO";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  grid: {
    justifyContent: "flex-end",
  },
  card: {
    position: "relative",
  },
  cardMedia: {
    height: 240,
    borderRadius: 4,
  },
  cardTitle: {
    position: "absolute",
    top: "20px",
    left: "20px",
  },
  paperLeft: {
    minHeight: 120,
    padding: 20,
  },
  paperLeftText: {
    display: "block",
    marginTop: 10,
    marginBottom: 10,
  },
  paperLeftLink: {
    color: "#3578E5",
    display: "flex",
    justifyContent: "flex-end",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  paperRight: {
    marginBottom: 16,
  },
  paperRightItem: {
    height: 60,
  },
  submitArea: {
    width: "100%",
    marginTop: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  paperRightBottom: {
    marginBottom: 10,
    padding: 16,
  },
  paperRightText: {
    display: "flex",
    marginTop: 10,
  },
}));

export default function Stream(props) {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  const [room, setRoom] = useState(props.classroom._id);
  const match = useRouteMatch();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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

  const [post, setPost] = useState({
    content: "",
    user: "",
    room: "",
  });

  useEffect(() => {
    console.log(state.user);
    initiateSocket(props.classroom._id);

    loadOldComments((err, data) => {
      if (err) return;
    });

    subscribeToComment((err, data) => {
      console.log(data);
    });

    return () => {
      disconnectSocket();
    };
  }, [state.isSignIn, props.classroom._id]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    sendComment(post);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardMedia
              component="img"
              className={classes.cardMedia}
              image={require("../../../../assets/images/classroom.jpg")}
            />
            <CardContent className={classes.cardTitle}>
              <Typography gutterBottom variant="h3" component="h1">
                {props.classroom.title}
              </Typography>
              <Typography component="p">
                {state.user.id == props.classroom.teacher?._id ? (
                  <>Class code: {props.classroom.joinId}</>
                ) : (
                  <></>
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paperLeft}>
            <Typography component="p">
              <strong>Upcoming</strong>
            </Typography>
            <Typography component="p" className={classes.paperLeftText}>
              No work due soon
            </Typography>
            <Link
              to={`/classrooms/${props.classroom.alias}/exercises`}
              className={classes.paperLeftLink}>
              View all
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={9} container spacing={0} className={classes.grid}>
          <Grid item xs={12}>
            <Paper className={classes.paperRight}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ height: 60 }}>
                  <Avatar
                    alt=""
                    src={require("../../../../assets/images/avatar.png")}
                  />
                  <Typography style={{ marginLeft: 12, paddingTop: 10 }}>
                    Announce something to your class
                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails style={{ paddingTop: 0 }}>
                  <form
                    noValidate
                    onSubmit={handlePostSubmit}
                    style={{ width: "100%" }}>
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
                      onChange={(e) =>
                        setPost({
                          ...post,
                          content: e.target.value,
                          user: state.user.id,
                          room: props.classroom._id,
                        })
                      }
                    />
                    <div className={classes.submitArea}>
                      <Button
                        // type="submit"
                        variant="outlined"
                        color="primary"
                        className={classes.submit}>
                        <AttachFileIcon
                          style={{ height: 20, marginLeft: -10 }}
                        />
                        Add
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={classes.submit}>
                        Post
                      </Button>
                    </div>
                  </form>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paperRight}>
              <ListItem
                button
                // to={`${match.url}/join-class`}
                // component={Link}
                className={classes.paperRightItem}>
                <AddBoxIcon className={classes.iconSidebar} />
                <ListItemText primary="Join class" />
              </ListItem>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paperRightBottom}>
              {state.user.id == props.classroom.teacher?._id ? (
                <>
                  <Typography variant="h5" component="h1">
                    Communicate with your class here
                  </Typography>
                  <div className={classes.paperRightText}>
                    <ChatIcon />
                    <Typography component="p" style={{ marginLeft: 10 }}>
                      Create and schedule announcements
                    </Typography>
                  </div>
                  <div className={classes.paperRightText}>
                    <ChatIcon />
                    <Typography component="p" style={{ marginLeft: 10 }}>
                      Respond to student posts
                    </Typography>
                  </div>
                </>
              ) : (
                <>
                  <Typography variant="h5" component="h1">
                    View class updates and connect with your class here
                  </Typography>
                  <div className={classes.paperRightText}>
                    <ChatIcon />
                    <Typography component="p" style={{ marginLeft: 10 }}>
                      See when new assignments are posted
                    </Typography>
                  </div>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
