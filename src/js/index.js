//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import App from "./component/App";

//render your react application
ReactDOM.render(<App />, document.querySelector("#app"));
