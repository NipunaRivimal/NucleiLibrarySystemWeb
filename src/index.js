import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";

import authReducer from "./pages/AuthStore/reducer";
import bookReducer from "./pages/BookStore/reducer";
import memberReducer from "./pages/UserStore/reducer";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//combine reducers and create store
const store = createStore(
  combineReducers({
    books: bookReducer,
    members: memberReducer,
    auth: authReducer,
  }),
  //combine redux devtools
  composeEnhancer(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
