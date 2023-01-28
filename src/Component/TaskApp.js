import { useState } from "react";
import './task.css';
import React,{useEffect} from 'react';


function TaskApp() {
 
  const getLocalItem = () =>{
    //localStorage.clear();
    let listed = localStorage.getItem("list");
    if(listed){
      
      return JSON.parse(listed);
    }
    else{
      return [];
    }
  }
  const [newTitle,setNewTitle]=useState();
  const [newAbout,setNewAbout]=useState();
  const [info,setInfo]=useState(getLocalItem);
  const [toogle,setToogle]=useState(true);
  const [showEdit,setShowEdit]=useState(-1);
  const [todo,setTodo]=useState(-1);
  
  

useEffect(()=>{
  localStorage.setItem("list", JSON.stringify(info));
}, [info]);
   
  console.log(newTitle);

  function addItems(e){



    if(!newTitle || !newAbout){
      alert ("Please Fill your TAsk ")
      
      }
    else if(newTitle && newAbout && !toogle){
         setInfo(info.map((elem)=>{
             if(elem.id===showEdit){
              return {...elem,newTitle:newTitle,newAbout:newAbout}
             }
             return elem; 
         }))
         setNewAbout("");
         setNewTitle("");
         setToogle(true);
         setShowEdit(null);
    }
    else {
    
      const item=[{id:`${Date.now()}`,newTitle,newAbout},...info]
       setInfo(item);
       setNewTitle("");
       setNewAbout("");
       setTodo((t)=> t+1);  
    }
    if(info===[]){
       setTodo(-1);
    }
  }


  //Delete Task 
  function Delete(idx){
   const  newArr=info.filter((td) => td.id!==idx);
   console.log(info.filter((td) => td.id===idx));
    console.log(newArr);
    setInfo([...newArr]);
    setTodo((t)=> t-1);
    
  }

  const handleEdit = (id,ab,ti) => {
   
    const editTodo = info.find((i) => i.id === id);
    setNewAbout(editTodo.newAbout);
    console.log(newAbout);
    setNewTitle(editTodo.newTitle);
    console.log(newTitle);
    setToogle(false);
    setShowEdit(id);

 
  };

  return (
    <>
      <div className="Navbar">
        GYIZER <br></br>
        <span id="s">TO-DO App </span>
      </div>

      <div
        id="container"
        align="center"
      >
        <div className="header">
        <div className="inputdatas">
        <input
          id="inputdata"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter Your Title"
        />
        <input
          id="inputdata"
          value={newAbout}
          onChange={(e) => setNewAbout(e.target.value)}
          placeholder="Enter Your Report"
        />
        </div>
        <button
          id="bt1"
          type="submit"
          onClick={() => addItems()}
        >
         +
        </button>
        </div>
        <br />
        <br />
        <br />
      </div>
      <div
        id="List"
        
      >
      {todo!==-1?(
        <div id="task" >
          
          {info.map((id) => {
            return (
              <>
                <div id="content" className="headerx" key={id} >
                  <div className="datas" >
                     <span id="content1">{id.newTitle}</span>
                      
                     <span id="content2">{id.newAbout}</span>
                   
                
                  </div>
                  
                  <div >
                  <button  id="bt2"
                    onClick={() =>handleEdit(id.id,id.newAbout,id.newTitle)}
                  >✏️
                  </button>
                  <button id="bt3" key={id}
                    onClick={() =>Delete(id.id)}
                  > X
                  </button>
                  </div>
                  
                  
                 
                </div>
                <br />
              </>
            );
          })}
        </div>
      ): (
        <div className="NOTODO">
          <h1>  No TASK </h1>
        </div>
      )}  
        
      </div>
      
    </>
  );
}
export default TaskApp;
