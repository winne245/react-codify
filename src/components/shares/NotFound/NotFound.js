import React from "react";
import { NotFound } from "material-ui-not-found";
// import makeStyles from '@material-ui/core/styles';

function Scroll(props) {
	return (
		<div
			style={{
				minHeight: "100vh",
				justifyContent: "center",
				lineHeight: "100vh",
				textAlign: "center",
			}}>
			<h1>404 Not found</h1>
		</div>
	);
}

export default Scroll;
