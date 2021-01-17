import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { EditorState } from 'draft-js';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useRouteMatch } from "react-router-dom";
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useStateValue } from "../../../../context/StateProvider";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
  },
  nested: {
    width: '95%',
    marginLeft: theme.spacing(5.5),
  },
}));

// function uploadImageCallBack(file) {
//   // return new Promise(
//   //   (resolve, reject) => {
//   //     resolve({ data: { link: "http://dummy_image_src.com" } });
//   //   }
//   // );
//   // long story short, every time we upload an image, we
//   // need to save it to the state so we can get it's data
//   // later when we decide what to do with it.

//   // Make sure you have a uploadImages: [] as your default state
//   let uploadedImages = this.state.uploadedImages;

//   const imageObject = {
//     file: file,
//     localSrc: URL.createObjectURL(file),
//   }

//   uploadedImages.push(imageObject);

//   this.setState({ uploadedImages: uploadedImages })

//   // We need to return a promise with the image src
//   // the img src we will use here will be what's needed
//   // to preview it in the browser. This will be different than what
//   // we will see in the index.md file we generate.
//   return new Promise(
//     (resolve, reject) => {
//       resolve({ data: { link: imageObject.localSrc } });
//     }
//   );
// }

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

export default function Grades() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

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

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (newState) => {
    setEditorState(newState);
  };


  // const [editorState1, setEditorState1] = useState(MUIEditorState.createEmpty(),
  // )
  // const onChange1 = newState => {
  //   setEditorState1(newState)
  // }

  const match = useRouteMatch();

  const [classroomList, setClassroomList] = useState([]);
  // useEffect(() => {
  //   if (state.isSignIn) {
  //     const fetchClassroomList = async () => {
  //     try {
  //       const response = await axiosCodify.get('/classroom');
  //       setClassroomList(response)
  //       console.log('Fetch successfully: ', response);
  //     } catch (error) {
  //       console.log('Error: ', error);
  //     }
  //   }
  //   fetchClassroomList();
  //   }
  // }, [state.isSignIn]);
  // useEffect(() => {
  //   const fetchClassroomList = async () => {
  //     try {
  //       const response = await axiosClient.get('/products');
  //       console.log('Fetch successfully: ', response);
  //     } catch (error) {
  //       console.log('Error: ', error);
  //     }
  //   }
  //   fetchClassroomList();
  // }, []);
  return (
    <div className={classes.root}>
      {/* <SwitchRouter>
              <Route exact path={match.url} />
              <Route path={`${match.url}/a`} component={Detail} />
              <Route path={`${match.url}/b`} component={Detail} />
              <Route path={`${match.url}/c`} component={Detail} />
              <Route path={`${match.url}/d`} component={Detail} />
              <Route path={`${match.url}/e`} component={Detail} />
              <Route component={NotFound} />
            </SwitchRouter> */}
      {/* <main className={classes.content}> */}
      <Paper className={classes.paper}>
        {/* <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              All classroom
                </ListSubheader>
          }
          className={classes.root}
        >
          <Divider />
          <ListItem button onClick={handle1Click}>
            <ListItemText primary="This week" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="This week" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handle2Click}>
            <ListItemText primary="Last week" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Last week" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handle3Click}>
            <ListItemText primary="Earlier" />
            {open3 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Earlier" />
              </ListItem>
            </List>
          </Collapse>
        </List> */}
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
      {/* <MUIEditor editorState={editorState1} onChange={onChange1} /> */}
    </div>
  );
}