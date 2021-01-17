import { Accordion, AccordionDetails, AccordionSummary, Paper } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CodeIcon from '@material-ui/icons/Code';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { EditorState } from 'draft-js';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useStateValue } from "../context/StateProvider";
// import axiosCodify, { setClientToken } from '../../../api/axios';

const useStyles = makeStyles((theme) => ({
    btn: {
        marginTop: 18,
        // marginLeft: -10,
        // borderRadius: 25,
        // textTransform: 'none',
        float: 'right',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: 18,
        flex: 1,
    },
    paper: {
        padding: 10,
        marginBottom: 16,
    },
    contentArea: {
        marginTop: 15,
        display: 'flex',
        justifyContent: 'space-between'
    },
    submitArea: {
        marginTop: 15,
        display: 'flex',
        justifyContent: 'flex-end'
    },
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

export default function CreateWork() {
    const classes = useStyles();
    const [state, dispatch] = useStateValue();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onChange = (newState) => {
        setEditorState(newState);
    };

    const [post, setPost] = useState({
        content: "",
    });
    const handleSubmit = () => {
        window.alert(editorState);
        // const signIn = async () => {
        //   try {
        //     const response = await axiosCodify.post('/signin', user);
        //     if (response.accessToken) {
        //       localStorage.setItem("accessToken", response.accessToken);
        //       dispatch({ type: ACTION_TYPE.SIGN_IN });
        //       // window.location.reload();
        //     }
        //   } catch (error) {
        //     console.log('Error: ', error);
        //   }
        // }
        // signIn();
    };

    return (
        <>

            <div>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Assignment
              </Typography>
                        <Button autoFocus color="inherit" type="submit">
                            Save
            </Button>
                    </Toolbar>
                </AppBar>
                <main style={{ padding: 18, minHeight: '91.4vh', backgroundColor: state.isDarkMode ? '#353535' : '#f0f2f5' }}>
                    <Grid container spacing={2} className={classes.grid}>
                        <Grid item xs={7}>
                            <Paper className={classes.paper}>
                                <Typography variant="h6">
                                    Title
                  </Typography>
                                <TextField id="standard-basic" fullWidth />
                            </Paper>
                            <Paper className={classes.paper}>
                                <Typography variant="h6">
                                    Content
                  </Typography>
                                <Editor
                                    editorState={editorState}
                                    // toolbar={{
                                    //   options: ['history', 'inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove']
                                    // }}
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
                        </Grid>
                        <Grid item xs={5} >
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ height: 60 }}>
                                    <CodeIcon />
                                    <Typography style={{ marginLeft: 10 }}>
                                        Test case 1
                    </Typography>
                                </AccordionSummary>
                                <Divider />
                                <AccordionDetails style={{ paddingTop: 0 }}>
                                    <form noValidate style={{ width: '100%' }}>
                                        <div className={classes.contentArea}>
                                            <TextField id="input1" label="Input" variant="filled" />
                                            <TextField id="output1" label="OutPut" variant="filled" />
                                            <TextField id="grades1" label="Grades" variant="filled" style={{ width: 120 }} />
                                        </div>
                                        <div className={classes.submitArea}>
                                            <Button
                                                // type="submit"
                                                variant="outlined"
                                                color="secondary"
                                                className={classes.submit}
                                                style={{ marginRight: 10 }}
                                            >
                                                Clear
                        </Button>
                                            <Button
                                                // type="submit"
                                                variant="contained"
                                                color="secondary"
                                                className={classes.submit}
                                            >
                                                Delete
                        </Button>
                                        </div>
                                    </form>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ height: 60 }}>
                                    <CodeIcon />
                                    <Typography style={{ marginLeft: 10 }}>
                                        Test case 2
                    </Typography>
                                </AccordionSummary>
                                <Divider />
                                <AccordionDetails style={{ paddingTop: 0 }}>
                                    <form noValidate style={{ width: '100%' }}>
                                        <div className={classes.contentArea}>
                                            <TextField id="input2" label="Input" variant="filled" />
                                            <TextField id="output2" label="OutPut" variant="filled" />
                                            <TextField id="grades2" label="Grades" variant="filled" style={{ width: 120 }} />
                                        </div>
                                        <div className={classes.submitArea}>
                                            <Button
                                                // type="submit"
                                                variant="outlined"
                                                color="secondary"
                                                className={classes.submit}
                                                style={{ marginRight: 10 }}
                                            >
                                                Clear
                        </Button>
                                            <Button
                                                // type="submit"
                                                variant="contained"
                                                color="secondary"
                                                className={classes.submit}
                                            >
                                                Delete
                        </Button>
                                        </div>
                                    </form>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ height: 60 }}>
                                    <CodeIcon />
                                    <Typography style={{ marginLeft: 10 }}>
                                        Test case 3
                    </Typography>
                                </AccordionSummary>
                                <Divider />
                                <AccordionDetails style={{ paddingTop: 0 }}>
                                    <form noValidate style={{ width: '100%' }}>
                                        <div className={classes.contentArea}>
                                            <TextField id="input3" label="Input" variant="filled" />
                                            <TextField id="output3" label="OutPut" variant="filled" />
                                            <TextField id="grades3" label="Grades" variant="filled" style={{ width: 120 }} />
                                        </div>
                                        <div className={classes.submitArea}>
                                            <Button
                                                // type="submit"
                                                variant="outlined"
                                                color="secondary"
                                                className={classes.submit}
                                                style={{ marginRight: 10 }}
                                            >
                                                Clear
                        </Button>
                                            <Button
                                                // type="submit"
                                                variant="contained"
                                                color="secondary"
                                                className={classes.submit}
                                            >
                                                Delete
                        </Button>
                                        </div>
                                    </form>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ height: 60 }}>
                                    <CodeIcon />
                                    <Typography style={{ marginLeft: 10 }}>
                                        Test case 4
                    </Typography>
                                </AccordionSummary>
                                <Divider />
                                <AccordionDetails style={{ paddingTop: 0 }}>
                                    <form noValidate style={{ width: '100%' }}>
                                        <div className={classes.contentArea}>
                                            <TextField id="input4" label="Input" variant="filled" />
                                            <TextField id="output4" label="OutPut" variant="filled" />
                                            <TextField id="points4" label="Points" variant="filled" style={{ width: 120 }} />
                                        </div>
                                        <div className={classes.submitArea}>
                                            <Button
                                                // type="submit"
                                                variant="outlined"
                                                color="secondary"
                                                className={classes.submit}
                                                style={{ marginRight: 10 }}
                                            >
                                                Clear
                        </Button>
                                            <Button
                                                // type="submit"
                                                variant="contained"
                                                color="secondary"
                                                className={classes.submit}
                                            >
                                                Delete
                        </Button>
                                        </div>
                                    </form>
                                </AccordionDetails>
                            </Accordion>
                            <Button
                                // type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                style={{ marginTop: 16 }}
                            >
                                Add
                </Button>
                        </Grid>
                    </Grid>
                </main>
            </div>
        </>
    );
}
