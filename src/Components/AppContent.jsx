import { useSelector } from "react-redux";
import Todoitems from "./Todoitems";
import styles from "../styles/modules/app.module.scss";
import { AnimatePresence, motion } from "framer-motion";
// import { getClasses } from "../utils/getClass";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerchildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const AppContent = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterstatus = useSelector((state) => state.todo.filterstatus);
  const sortedTodoList = [...todoList].sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  // const sortedTodoList = [...todoList];
  // sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));
  // const filteredTodoList = sortedTodoList.filter((item) => {
  //   if (filterstatus === "All") return true;
  //   return item.status === filterstatus.toLowerCase();
  // });

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterstatus === "All") {
      return true;
    }
    // if (filterstatus === "Complete") {
    //   return item.status.toLowerCase() === true;
    // }
    // if (filterstatus === "InComplete") {
    //   return item.status.toLowerCase() === false;
    // }

    return item.status === filterstatus;
  });
  console.log("filter:", filterstatus);
  console.log("Todos:", todoList);
  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible">
        <AnimatePresence>
      {filteredTodoList && filteredTodoList.length > 0 ? (
        filteredTodoList.map((todo) => (
          <Todoitems todo={todo} key={todo.id}></Todoitems>
        ))
      ) : (
        <p className={styles.emptyText} variants={child}>
          No Todo found
        </p>
      )}
      </AnimatePresence>
    </motion.div>
  );
};
export default AppContent;
