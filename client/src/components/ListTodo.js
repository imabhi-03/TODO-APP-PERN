import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
    const [todos, setTodos] = useState([]);
    async function getTodos() {
        const res = await fetch("http://localhost:5000/todos");

        const todoArray = await res.json();

        setTodos(todoArray);
    }

    //Without useEffect, React doesn't know when to re-fetch the data after a change. The page reload triggers a fresh fetch and remounts the component, which is why changes appear only after reloading. With useEffect, React listens for state changes (like todosChange) and automatically re-fetches data, ensuring the UI updates dynamically without needing a reload.

    useEffect(() => {  //In the ListTodo component, it’s used to fetch the list of to-do items from the server when the component mounts, ensuring that the data is available for rendering without blocking the UI. 
        getTodos();
    }, []);

    async function deleteTodo(id)
    {
        try {
                const res= await fetch(`http://localhost:5000/todos/${id}`,
                    {
                        method:"DELETE"
                    }
                );

                setTodos(todos.filter(todo => todo.todo_id!==id));
        } catch (err) {
                console.error(err.message);
        }
    }

    return (
        <Fragment>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (  // //each todo from the todos array is passed as a prop to the EditTodo component(Child Component)
                        <tr key = {todo.todo_id}>
                            <td>{todo.description}</td> 
                            <td><EditTodo todo={todo} /></td> 
                           
                            <td> 
                                <button className="btn btn-danger" onClick = {() => deleteTodo(todo.todo_id)}>Delete</button>
                                </td>
                        </tr>
                    )
                    )
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodo;