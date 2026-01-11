import style from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getClasses } from "../utils/getClass";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { addTodo, UpdateTodo } from "../slices/TodoSlice";
import { AnimatePresence, transform, motion } from "framer-motion";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

const TodoModel = ({ type, openmodel, setopenmodel, todo }) => {
  const [title, setTitle] = useState("");
  //  type === "update " && todo ? todo.title : ""
  // const [date, setdate] = useState("");
  const [status, setStatus] = useState("Incomplete");
  //  type === "update " && todo ? todo.title : ""
  const dispatch = useDispatch();

  const handleonClick = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please Enter the Title");
      return;
    }
    if (title && status) {
      if (type === "add") {
        // console.log("Time", todo.item, typeof todo.time);

        dispatch(
          addTodo({
            id: uuid(),
            title,
            status: "InComplete",
            time: new Date().toLocaleDateString(),
          })
        );
        toast.success("Task Added Successfully");
      }
      if (type === "update") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(UpdateTodo({ ...todo, title, status }));
        } else {
          toast.error("no Change made");
        }
      }
      setopenmodel(false);
    }
  };
  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("Incomplete");
    }
  }, [type, todo, openmodel]);
  return (
    <AnimatePresence>
      {openmodel && (
        <motion.div
          className={style.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div
            className={style.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit">
            <motion.div
              className={style.closeButton}
              onClick={() => setopenmodel(false)}
              onKeyDown={() => setopenmodel(false)}
              tabIndex={0}
              role="button"
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}>
              <MdOutlineClose />
            </motion.div>
            <form className={style.form} onSubmit={(e) => handleonClick(e)}>
              <h1 className={style.formTitle}>
                {type === "add" ? "Add" : "update"} Task
              </h1>
              <label htmlFor="Title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              {/* <label htmlFor="Date">
              Date
              <input
                type="date"
                id="Date"
                value={date}
                onChange={(e) => setdate(e.target.value)}
              />
            </label> */}
              <label htmlFor="Status">
                status
                <select
                  id="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}>
                  <option value="Incomplete">Incomplete</option>
                  <option value="Complete">Complete</option>
                </select>
              </label>
              <div
                className={getClasses([
                  style.buttonContainer,
                  style.formbutton,
                ])}>
                <Button type="submit" variant="primary">
                  {type === "update" ? "update" : "Add"} Task
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setopenmodel(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default TodoModel;
