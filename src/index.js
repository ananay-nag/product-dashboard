import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/main.css";
import "./assets/css/custome.css";
import AppRouter from "./routes"
import store from './store.js';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
  document.getElementById("root")
);
