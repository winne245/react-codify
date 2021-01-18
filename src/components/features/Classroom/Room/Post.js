import {
  IconButton,

  Paper
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from "react";
import { useStateValue } from "../../../../context/StateProvider";

const useStyles = makeStyles((theme) => ({
  post: {
    padding: 15,
    marginBottom: 16,
  },
  postTitle: {
    display: 'flex',
  },
  postTitleContent: {
    display: 'flex',
    flexGrow: 1,
  },
  postContent: {
    padding: '10px 0px',
    wordWrap: 'break-word',
  },
  postComment: {
    display: 'flex',
    padding: '10px 0px',
  },
  postCommentContent: {
    padding: '8px 8px 8px 8px',
    marginLeft: 6,
    wordWrap: 'break-word',
    overflow: 'auto',
  },
  postReply: {
    display: 'flex',
    paddingTop: 10,
  },
  postReplyInput: {
    margin: '0px 0px 0px 6px',
  },
}));

export default function Post(props) {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  return (
    <Paper className={classes.post}>
      <div className={classes.postTitle}>
        <div className={classes.postTitleContent}>
          {/* <Avatar
            alt=""
            src={require("../../../../assets/images/avatar.png")}
          /> */}
          <Avatar style={{ backgroundColor: '#3c87c0' }} >
            {props.post.user.firstName.charAt(0)}
          </Avatar>
          <div style={{ marginLeft: 12 }}>
            <Typography>
              <strong>{props.post.user.firstName} {props.post.user.lastName}</strong>
            </Typography>
            {new Date(props.post.timeStamp).toLocaleString()}
          </div>
        </div>
        <IconButton style={{ padding: 10, marginRight: -10 }}>
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className={classes.postContent}>
        {props.post.content}
      </div>

      {/* <Divider />
      <div className={classes.postComment}>
        <Avatar
          alt=""
          src={require("../../../../assets/images/avatar.png")}
          style={{ height: 34, width: 34 }}
        />
        <Paper
          style={{ backgroundColor: state.isDarkMode ? "#3a3b3c" : "#f0f2f5", }}
          className={classes.postCommentContent}
        >
          <Typography>
            <strong>Announce something to your class</strong>
          </Typography>
          Announce something to your class
        </Paper>
      </div>

      <Divider />
      <div className={classes.postReply}>
        <Avatar
          alt=""
          src={require("../../../../assets/images/avatar.png")}
          style={{ height: 34, width: 34 }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          multiline
          id="content"
          name="content"
          label="Add class comment…"
          type="text"
          fullWidth
          className={classes.postReplyInput}
        />
      </div> */}
    </Paper>
  );
}