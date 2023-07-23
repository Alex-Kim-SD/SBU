// /SBU/react-app/src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ModalProvider, Modal } from "./context/Modal";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import App from "./App";
import LoadingSpinner from "./context/LoadingSpinner";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

function LoadableApp() {
  const isLoading = useSelector(state => state.loading.isLoading);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <App />
      <Modal />
    </>
  );
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <LoadableApp />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
