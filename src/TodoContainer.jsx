import React from 'react'
import { ToastContainer } from 'react-toastify'
import Create from './components/Create'
import Login from './components/Login'
import TodoList from './components/TodoList'
import 'react-toastify/dist/ReactToastify.css';
import { Routes , Route} from 'react-router-dom'

function TodoContainer() {
  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-lg-6 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <ToastContainer/>
                        <Routes>
                            <Route element={<Login/>} path="/login" exact/>
                            <Route element={<><Create/><TodoList/></>} path="/todolist" exact/>
                        </Routes>
                    </div>    
                </div>    
            </div>
        </div>    
    </div>
  )
}

export default TodoContainer