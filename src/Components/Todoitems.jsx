import styles from "../styles/modules/todoItem.module.scss";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { getClasses } from "../utils/getClass";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { DeleteTodo, UpdateTodo } from "../slices/TodoSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import TodoModel from "./TodoModel";
import CheckButton from "./CheckButton";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Todoitems = ({ todo }) => {
  const Dispatch = useDispatch();
  const [updatemodel, setUpdatemodel] = useState(false);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (todo.status === "Complete") {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [todo.status]);

  const handleDelete = () => {
    Dispatch(DeleteTodo(todo.id));
    toast.success("Todo Deleted Successfully");
  };
  const handleUpdate = () => {
    setUpdatemodel(true);
  };
  const handlecheck = () => {
    setCheck(!check);
    Dispatch(
      UpdateTodo({ ...todo, status: check ? "InComplete" : "Complete" })
    );
  };
  // const date = new Date().toISOString();
  // const formatDate = format(date, " MM/dd/yyyy,p");
  return (
    <>
      <div
        className={getClasses([
          styles.item,
          todo.status === "Complete" && styles[`item--completed`],
        ])}
        variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton check={check} handlecheck={handlecheck} />
          <div className={styles.texts}>
            <p className={styles.todoText}>{todo.title}</p>
            <p className={styles.time}>
              {format(new Date(todo.createdAt), "p, MM/dd/yyyy")}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button">
            <MdDeleteOutline />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button">
            <MdEdit />
          </div>
        </div>
      </div>
      <TodoModel
        type="update"
        todo={todo}
        openmodel={updatemodel}
        setopenmodel={setUpdatemodel}
      />
    </>
  );
};
export default Todoitems;
