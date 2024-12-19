import React, {Fragment, useState} from "react";



const EditTodo = ({todo}) => // In the EditTodo component, the todo prop is received as an argument in the function component. The todo prop is destructured directly in the function's parameter.This allows us to directly access properties of the todo object (like todo.description) within the component.

{  
   
    const[description,setDescription] =useState(todo.description);
    const[isModalOpen, setIsModalOpen]= useState(false);

    const toggleModal = () =>
    {
        setIsModalOpen(!isModalOpen);
        setDescription(todo.description);
    }

    const editText = async (id) =>
      {
          try {
                const body= {description};
                const res= await fetch(`http://localhost:5000/todos/${id}`,
                  {
                    method:"PUT",
                    headers:{ "Content-Type": "application/json"},
                    body: JSON.stringify(body)
                  }
                );
                toggleModal();
                window.location="/";
                
          } catch (err) {
              console.error(err.message);
          }
      }

    return <Fragment>
        <button type="button" className="btn btn-warning"  onClick={toggleModal}>
  Edit
</button>

{isModalOpen && (
    <div className="modal" id="myModal" style={{display:"block"}} tabIndex="-1" role="dialog">


  <div className="modal-dialog" role="document">
    <div className="modal-content">

    
      <div className="modal-header" >
        <h4 className="modal-title">Edit Todo</h4>
        <button type="button" className="btn-close" onClick={toggleModal}></button>
      </div>

      <div className="modal-body">
        <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
        
      </div>
      
    
      
      <div className="modal-footer">
      <button type="button" className="btn btn-warning" onClick={()=> editText(todo.todo_id)}>Edit</button>
        <button type="button" className="btn btn-danger"  onClick={toggleModal}>Close</button>
      </div>

    </div>
  </div>
</div>
)}
    </Fragment>
};

export default EditTodo;