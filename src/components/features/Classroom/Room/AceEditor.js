import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Ace editor configs
import AceEditor from "react-ace";
import "ace-builds";
import ace from "ace-builds/src-noconflict/ace";

import "ace-builds/src-min-noconflict/mode-c_cpp";
import "ace-builds/src-min-noconflict/theme-twilight";
import "ace-builds/src-min-noconflict/theme-dracula";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/ext-emmet";

ace.config.set(
  "basePath",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/"
);
ace.config.setModuleUrl(
  "ace/mode/javascript_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-javascript.js"
);

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
      theme="dracula"
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
      fontSize="14pt"
      className={classes.styles}
    />
  );
}

export default AceTextEditor;
