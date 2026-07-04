import { useEffect, useState, useCallback } from "react";

export default function Todo()
{

    const token = localStorage.getItem("token");
    console.log("Todo token:", token);
     const[title,setTitle] =useState("");
    const[description,setDescription] =useState("");
    const [todos,setTodos]=useState([]);
    const [error,setError]=useState("");
    const [message,setMessage]=useState("");
    const [editid,setEditId]=useState(-1);

    const[edittitle,setEditTitle] =useState("");
    const[editdescription,setEditDescription] =useState("");



    // const apiUrl="http://localhost:5000";
    const apiUrl = "https://todo-login-backend.onrender.com";
    
    
     const handlesubmit=()=>{
           setError("");
        if(title.trim()!=='' && description.trim()!=='')
        {
            fetch(apiUrl+"/todos",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                     'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify({title,description})
            }).then((res)=>{
                if(res.ok){

                    getitems();
                    setMessage("Item added successfully")
                    setTitle("");
setDescription("");
                    setTimeout(()=>{
                        setMessage("");
                    },3000)
                }
                else
                {
                    setError("Unable to create Todo item")
                }
            })
            .catch((err) => {
    console.error("Fetch error:", err);
    setError("Network error: Could not reach backend");
});
        }
         
     }
      
     

    const getitems = useCallback(() => {
    fetch(apiUrl + "/todos", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => res.json())
    .then((res) => {
        setTodos(res);
    });
}, [apiUrl, token]);

useEffect(() => {
    getitems();
}, [getitems]);

       const handleedit=(item)=>{
        setEditId(item._id);
        setEditTitle(item.title);
        setEditDescription(item.description)
       }

       const handleeditcancel = () => {
    setEditId(-1);
    setEditTitle("");
    setEditDescription("");
};
       const handleupdate=()=>{
 setError("");
        if(edittitle.trim()!=='' && editdescription.trim()!=='')
        {
            fetch(apiUrl+"/todos/"+editid,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json',
                     'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify({title:edittitle,description:editdescription})
            }).then((res)=>{
                if(res.ok){


                   getitems();
                    setMessage("Item updated successfully")
                    setTimeout(()=>{
                        setMessage("");
                    },3000)

                    setEditId(-1)
                }
                else
                {
                    setError("Unable to create Todo item")
                }
            })
            .catch((err) => {
    console.error("Fetch error:", err);
    setError("Network error: Could not reach backend");
});}
       }
const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
};

       const handledelete=(id)=>{

        if(window.confirm('Are you sure want to delete?'))
        {
            fetch(apiUrl+'/todos/'+id,{
                method:"DELETE",
                 headers:{
        'Authorization': `Bearer ${token}`
    }
            })
            .then(()=>{
                // const updatedtodo= todos.filter((item)=>item._id!==id)
                // setTodos(updatedtodo)
                getitems();

            })
        }

       }

    return <>

       <div className="row p-3 bg-success text-light">
          <h1>ToDo Project with MERN Stack</h1>
       </div>
       <div className="row">
        <h1>Add Item</h1>
        {message && <p className="text-success">{message}</p>}
        <div className="form-group d-flex gap-2">
                 <input onChange={(e)=> setTitle(e.target.value)} value={title}placeholder="Title" className="form-control" type="text" />
                 <input onChange={(e)=> setDescription(e.target.value)}  value={description}placeholder="Description" className="form-control" type="text" />
                 <button className="btn btn-dark" onClick={handlesubmit}>Submit</button>
        </div>
        {error &&<p className="text-danger">{error}</p>}
       </div>
      <div className="row mt-3">
      <h3>Tasks</h3>
      <ul className="list-group">

          {
            todos.map((item)=>    <li className="list-group-item bg-info d-flex justify-content-between align-items-center my-2">
            <div className="d-flex flex-column me-2">
                { 

                editid===-1 || String(editid) !== String(item._id)? <>
                <span className="fw-bold">{item.title}</span>
            <span>{item.description}</span>
                </> : <>
                  <div className="form-group d-flex gap-2">
                 <input onChange={(e)=> setEditTitle(e.target.value)} value={edittitle}placeholder="Title" className="form-control" type="text" />
                 <input onChange={(e)=> setEditDescription(e.target.value)}  value={editdescription}placeholder="Description" className="form-control" type="text" />
                 
        </div>

                </>
            
                }

            </div>
            
            <div className="d-flex gap-2">
{           
editid===-1 || String(editid) !== String(item._id)?<>
<button className="btn btn-warning" onClick={()=>handleedit(item)}>Edit</button>
            <button className="btn btn-danger" onClick={()=>handledelete(item._id)}>Delete</button>
</>:<>
<button className="btn btn-warning" onClick={handleupdate}>Update</button>
            <button className="btn btn-danger" onClick={handleeditcancel}>Cancel</button>

</>
}
            </div>

        </li>

            )
          }

    
      </ul>

      <button className="btn btn-danger" onClick={handleLogout}>
    Logout
</button>
      </div>
    </>
}