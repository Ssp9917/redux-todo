import { createSlice, nanoid } from "@reduxjs/toolkit";

const todoSlicer = createSlice({
  name: "todo",
  initialState: { todos: [{ id: 1, text: "Hello Todo" }] },
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };

      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id != action.payload);
    },

    updateTodo: (state, action) => {
        const {id,text} = action.payload;

        const uuId = state.todos.find(todo => todo.id == id)

        if(uuId){
            uuId.text = text
        }
    },
  },
});

// export

export const { addTodo, removeTodo, updateTodo } = todoSlicer.actions;
export default todoSlicer.reducer;
