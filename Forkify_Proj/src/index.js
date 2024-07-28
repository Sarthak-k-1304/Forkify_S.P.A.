import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import { App } from "./App";

function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const root = document.getElementById("root");
createRoot(root).render(<Main />);
