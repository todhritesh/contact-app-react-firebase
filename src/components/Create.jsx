import React,{useState} from 'react'
import {db} from '../firebase-config'
import {push , set , ref} from 'firebase/database';

function Create() {
    const [todoInput , setTodoInput] = useState("")
    const todosRef = ref(db , 'todos');
    const newTodoRef = push(todosRef);
    function handleSubmit(){
        if(todoInput==='') return
        set(newTodoRef,{title:todoInput,status:false});
        setTodoInput('');
    }
    return (
    <div className="mb-3 d-flex">
        <input onChange={e=>setTodoInput(e.target.value)} value={todoInput} type="text" className="form-control" />
        <button onClick={handleSubmit} className="btn btn-success text-nowrap">Add Todo</button>
    </div>    
  )
}

export default Create