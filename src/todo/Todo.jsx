import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, updateTodo } from "../reducers/todoSlice";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const Todo = () => {
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [id,setIsId] = useState(null)

  const dispatch = useDispatch();

  const todoHandler = () => {
    {
      edit?dispatch(updateTodo({id:id,text:input})) :  dispatch(addTodo(input));
    }

    setInput("");
  };

  const editHandler = (id) => {
    const existTodo = todos.filter(todo => todo.id === id)
    const {text} = existTodo[0]
    // console.log(text)
    setIsId(id)
    setInput(text)
  }


  const todos = useSelector((state) => state.todos);
  // console.log(todos);
  return (
    <>
      <div>
        <div className="w-[350px] mx-auto text-center">
          <div className="text-red-500 text-3xl font-semibold mt-5">
            Redux Todo-List
          </div>
          <div className="mx-auto w-[350px] flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="p-2 w-[300px] mt-4 border"
              placeholder="Write Something..."
            />
            <button
              className="bg-blue-600 ps-5 pe-5 mt-3 pt-2 pb-2 ms-4 rounded-lg text-white font-bold"
              onClick={todoHandler}
            >
              {edit ? "Save" : "Add"}
            </button>
          </div>
          <div className="w-full">
            {todos.map((d, i) => {
              return (
                <li
                  key={i}
                  className="flex bg-blue-500 text-white text-xl mt-3 pl-3 justify-between p-2 rounded-xl"
                >
                  {d.text}{" "}
                  <span className="me-3 flex gap-2">
                    <FaRegEdit
                      color="white"
                      size={25}
                      onClick={
                        (() => {
                          editHandler(d.id)
                          setEdit(true)
                        })
                      }
                    />
                    <AiFillDelete
                      color="red"
                      size={25}
                      onClick={() => dispatch(removeTodo(d.id))}
                    />
                  </span>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
