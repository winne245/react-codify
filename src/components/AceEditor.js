import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/mode-c_cpp";
import "ace-builds/src-min-noconflict/theme-twilight";
import React, { useState } from "react";
// Ace editor configs
import AceEditor from "react-ace";
import axios from "../api/axios";

const useStyles = makeStyles((theme) => ({
  styles: {
    // marginTop: "
  },
}));

function AceTextEditor(props) {
  const classes = useStyles();
  const [data, setData] = useState("");
  const [result, setResult] = useState("");
  // This get value from Ace Editor
  const onChange = (newValue) => {
    setData(newValue);
  };

  // const run = async () => {
  //   try {
  //     // const response = await axios.post("/run", { code: data });
  //     // // Code result from server
  //     // setResult(response.data);
  //     alert("Hello");
  //   } catch (error) {
  //     alert(error.response.data);
  //   }
  // };

  const handleSubmit = () => {
    alert(data);
  };

  return (
    <>
      <AceEditor
        width="100%"
        height="80%"
        mode="c_cpp"
        theme="twilight"
        onChange={onChange}
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
      <Button Button onClick={run}>
        Run
      </Button>
      <p>{result}</p>
    </>
  );
}

export default AceTextEditor;
