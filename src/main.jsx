import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import "./styles/GlobalStyles.css";
import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { store } from "./app/store.jsx";
import { Provider } from "react-redux";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider  store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
