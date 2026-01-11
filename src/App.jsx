import React from "react";
import PageTitle from "./Components/PageTitle";
import AppHeader from "./Components/AppHeader";
import style from "./styles/modules/app.module.scss";
import { Toaster } from "react-hot-toast";
import AppContent from "./Components/AppContent";

function App() {
  return (
    <div className="container">
      <PageTitle></PageTitle>
      <div className={style.app__wrapper}>
        <AppHeader></AppHeader>
        <AppContent></AppContent>
        <Toaster
          position="bottom-right"
          toastOptions={{ style: { fontSize: "1.4rem" } }}></Toaster>
      </div>
    </div>
  );
}

export default App;
