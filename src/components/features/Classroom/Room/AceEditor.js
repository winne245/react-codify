import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axiosCodify from "../../../../api/axios";

// Ace editor configs
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/mode-c_cpp";
import "ace-builds/src-min-noconflict/theme-twilight";
import "ace-builds/src-min-noconflict/ext-language_tools";
import { Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  styles: {
    // marginTop: "
  },
}));

function AceTextEditor(props) {
  const classes = useStyles();
  return (
    <AceEditor
      defaultValue={props.exerciseResultCode}
      width="100%"
      height={props.drawerHeight}
      mode="c_cpp"
      theme="twilight"
      onChange={props.onChangeCode}
      name="editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableEmmet: true,
        enableMultiselect: true,
        enableSnippets: true,
      }}
      className={classes.styles}
    />
  );
}

export default AceTextEditor;
