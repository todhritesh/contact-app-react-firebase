import React, { useEffect, useState } from 'react'
import {onValue , ref} from 'firebase/database';
import {db} from '../firebase-config';


function TodoList() {
const [list , setList] = useState([])
const todosRef = ref(db , 'todos');
useEffect(()=>{
    onValue(todosRef , snap => {
        let data = [];
        // console.log(Object.keys(snap.val()))
        snap.forEach(child => {
            console.log(child.val())
            let value = child.val();
            data = [...data , value]
        })
        setList(data);
    })
},[])
  return (
    <div className="list-group mt-5 list-group-flush">
        {
            list.map((e,i)=>(
                <div key={i} className="list-group-item list-group-item-action">
                    {e.title}
                </div> 
            ))
        }
    </div>
  )
}

export default TodoList