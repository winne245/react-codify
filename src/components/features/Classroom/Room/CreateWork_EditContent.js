import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { convertToRaw, EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import axiosCodify, { setClientToken } from '../../../api/axios';
import "../../../../assets/styles/editText.css";
import { useStateValue } from "../../../../context/StateProvider";

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


  useEffect(() => {
    props.callbackContent(convertToRaw(editorState.getCurrentContent()));
  }, [props.open]);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onChange = (newState) => {
    setEditorState(newState);
  };

  return (
    <>
      {/* <div className={classes.btn}>
        <Button variant="contained" color="secondary" size="small" onClick={handleClickOpen}>
          Edit content
        </Button>
      </div> */}
      <Dialog maxWidth="lg" open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
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
                onClick={props.handleClose}
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
