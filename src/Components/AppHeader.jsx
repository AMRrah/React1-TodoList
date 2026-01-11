import React, { useState } from "react";
import Button, { SeletecButton } from "./Button";
import style from "../styles/modules/app.module.scss";

import TodoModel from "./TodoModel";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterstatus } from "../slices/TodoSlice";
// import { useDispatch, useSelector } from "react-redux";

const AppHeader = () => {
  const [openmodel, setopenmodel] = useState(false);
  const filterstatus = useSelector((state) => state.todo.filterstatus);

  const dispatch = useDispatch();
  const updateStatus = (e) => {
    dispatch(updateFilterstatus(e.target.value));
  };

  return (
    <div className={style.appHeader}>
      <Button variant="primary" onClick={() => setopenmodel(true)}>
        Add Task
      </Button>
      <SeletecButton
        id="status"
        value={filterstatus}
        onChange={(e) => updateStatus(e)}>
        <option value="All">All</option>
        <option value="InComplete">InComplete</option>
        <option value="Complete">Complete</option>
      </SeletecButton>
      <TodoModel
        type="add"
        openmodel={openmodel}
        setopenmodel={setopenmodel}></TodoModel>
    </div>
  );
};
export default AppHeader;
