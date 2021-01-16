import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CodeIcon from '@material-ui/icons/Code';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Slide from '@material-ui/core/Slide';
import { Accordion, AccordionDetails, AccordionSummary, Paper } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useStateValue } from "../../../../context/StateProvider";
import { ACTION_TYPE } from "../../../../reducers/reducer";
// import axiosCodify, { setClientToken } from '../../../api/axios';
import "../../../../assets/styles/editText.css";

const useStyles = makeStyles((theme) => ({
  btn: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  paper: {
    padding: 15,
  },
  btnSave: {
    marginTop: 18,
    display: 'flex',
    justifyContent: 'flex-end',
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

export default function CreateWork_EditContent(props) {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    props.callbackContent(convertToRaw(editorState.getCurrentContent()));
    setOpen(false);
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onChange = (newState) => {
    setEditorState(newState);
  };

  return (
    <>
      <div className={classes.btn}>
        <Button variant="contained" color="secondary" size="small" onClick={handleClickOpen}>
          Edit content
        </Button>
      </div>
      <Dialog maxWidth="lg" open={open} onClose={handleClose} TransitionComponent={Transition}>
        <div>
          <main style={{ padding: 18, minHeight: '91vh', minWidth: '70vh', backgroundColor: state.isDarkMode ? '#353535' : '#f0f2f5' }}>
            <Paper className={classes.paper}>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbar={{
                  image: {
                    uploadCallback: uploadImageCallBack,
                    previewImage: true,
                    alt: { present: true, mandatory: false },
                  },
                }}
                onEditorStateChange={onChange}
              />
            </Paper>
            <div className={classes.btnSave}>
              <Button
                // type="submit"
                variant="contained"
                color="primary"
                onClick={handleClose}
              >
                SAVE
              </Button>
            </div>
          </main>
        </div>
      </Dialog>
    </>
  );
}
