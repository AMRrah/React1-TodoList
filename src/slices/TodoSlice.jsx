import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
  const localTodoList = window.localStorage.getItem("todoList"); // ✅ define it

  if (localTodoList) {
    const parsed = JSON.parse(localTodoList);

    const fixed = parsed.map((todo) => ({
      ...todo,
      createdAt: todo.createdAt || new Date().toISOString(),
    }));

    window.localStorage.setItem("todoList", JSON.stringify(fixed));
    return fixed;
  }

  window.localStorage.setItem("todoList", JSON.stringify([]));
  return [];
};

// };
const initialValue = {
  filterstatus: "All",
  todoList: getInitialTodo(),
};
export const TodoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        ...action.payload,
        createdAt: new Date().toISOString(), // ✅ add time HERE
      };

      // 1️⃣ Update Redux state
      state.todoList.push(newTodo);

      // 2️⃣ Sync to localStorage
      window.localStorage.setItem("todoList", JSON.stringify(state.todoList));
      //   state.todoList.push(action.payload);
      //   const todoList = window.localStorage.getItem("todoList");
      //   if (todoList) {
      //     const todoListArr = JSON.parse(todoList);
      //     todoListArr.push({
      //       ...action.payload,
      //     });
      //     window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      //   } else {
      //     window.localStorage.setItem(
      //       "todoList",
      //       JSON.stringify([
      //         {
      //           ...action.payload,
      //         },
      //       ])
      //     );
      //   }
    },

    DeleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    UpdateTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.status = action.payload.status;
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = [...todoListArr];
      }
    },
    updateFilterstatus: (state, action) => {
      state.filterstatus = action.payload;
    },
  },
});
export const { addTodo, DeleteTodo, UpdateTodo, updateFilterstatus } =
  TodoSlice.actions;
export default TodoSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const getInitialTodo = () => {
//   const data = localStorage.getItem("todoList");
//   return data ? JSON.parse(data) : [];
// };

// const initialState = {
//   filterstatus: "all",
//   todoList: getInitialTodo(),
// };

// const TodoSlice = createSlice({
//   name: "todo",
//   initialState,
//   reducers: {
//     addTodo: (state, action) => {
//       state.todoList.push({
//         ...action.payload,
//         createdAt: new Date().toISOString(),
//       });

//       localStorage.setItem("todoList", JSON.stringify(state.todoList));
//     },

//     DeleteTodo: (state, action) => {
//       state.todoList = state.todoList.filter(
//         (todo) => todo.id !== action.payload
//       );

//       localStorage.setItem("todoList", JSON.stringify(state.todoList));
//     },

//     UpdateTodo: (state, action) => {
//       const { id, title, status } = action.payload;
//       const todo = state.todoList.find((todo) => todo.id === id);

//       if (todo) {
//         todo.title = title;
//         todo.status = status;
//       }

//       localStorage.setItem("todoList", JSON.stringify(state.todoList));
//     },

//     updateFilterstatus: (state, action) => {
//       state.filterstatus = action.payload;
//     },
//   },
// });

// export const { addTodo, DeleteTodo, UpdateTodo, updateFilterstatus } =
//   TodoSlice.actions;

// export default TodoSlice.reducer;
