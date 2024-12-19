import React, { Fragment, useState } from "react";


const InputTodo= () =>
{

    const[description, setDescription] = useState("");

    const onSubmitForm = async  (e) =>
    {
        e.preventDefault();
        try {
                const body={description}; //  a body object is created, which contains a property description. It holds the data you want to send to the server.
                const response=await fetch("http://localhost:5000/todos", //When developing a web application locally, you typically run your server on http://localhost or http://127.0.0.1. This is an unsecured connection, which is fine for local development. However, if you attempt to use https://localhost without having SSL (Secure Sockets Layer) properly configured, you'll encounter connection issues, such as the ERR_CONNECTION_REFUSED error.
                    {
                        method: "POST",
                        headers:{
                            "Content-Type" : "application/json" //The headers specify that the content being sent is in JSON format.
                        },
                        body: JSON.stringify(body)  // Convert the body object to a JSON string
                    }
                );
                console.log(response);   
                
        } catch (err) {
                console.error(err.message);
        }
    }

    return (
         <Fragment>
    <h1 className="text-center my-5"> Input Todo </h1>
    <form className="d-flex" onSubmit={onSubmitForm}>
        <input type="text" placeholder="Add Todo" className="form-control" 
        value={description} onChange={e=> setDescription(e.target.value)}>
        </input>
        <button className="btn btn-success">
            Add
        </button>
    </form>
    </Fragment>
    )
}

export default InputTodo;