import express from "express";
import cors from "cors"; //Enabling Cross-Origin Requests: By using cors(), you allow your Express server to accept requests from other origins (like your front-end running on a different port). This is essential for applications where the client and server are running on different origins during development.
import db from './db.js';

const app=express();
const port =5000;
app.use(cors()); //app.use() is a method in Express that applies middleware to all incoming requests to your server.
//cors() is a function that adds the necessary HTTP headers to your responses, allowing browsers to accept cross-origin requests from other domains or ports.
app.use(express.json()); //express.json() is built-in middleware that automatically parses JSON data from the body of incoming requests and makes it available in req.body


app.get("/todos", async (req, res) =>
{
    try{
        const allTodos= await db.query("select * from todo");
        res.json(allTodos.rows);
    }
    catch(err)
    {
        console.error(err.message);
    }
})

app.get("/todos/:id" ,async (req,res)=>
{
    try{
        const {id} =req.params;
        const aTodo= await db.query("select * from todo where todo_id=$1", [id]);
        res.json(aTodo.rows[0]);
        console.log(req.params);
    }
    catch(err)
    {
        console.error(err.message);
    }
})

app.put("/todos/:id", async (req,res)=>
{
    try
    {
    const {id}= req.params;
    const {description}= req.body;

    console.log(`Updating todo with ID: ${id}`);
    console.log(`New description: ${description}`);
    
    const updateTodo=await db.query("Update todo SET description= $1 where todo_id=$2",[description,id]) ;
    res.json("todo was updated");

    }

    catch(err)  
    {
        console.error(err.message);
    }
})



app.post("/todos", async (req,res) =>
{
    try{
        const {description} =req.body;
        const newTodo= await db.query("Insert into todo (description) values ($1) RETURNING * ", [description])
        res.json(newTodo.rows[0]);
    }
    catch(err){
            console.error(err.message);
    }
})

app.delete("/todos/:id", async(req,res)=>
{
    try{
    const {id} =req.params;
    const delTodo=await db.query("Delete from todo where todo_id=$1",[id]);
    res.json("todo was deleted");
    }
    catch(err)
    {
        console.error(err.message);
    }
})

app.listen(port, () =>
{
    console.log(`Server is running on port :${port}`);
}
);