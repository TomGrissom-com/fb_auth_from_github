import React, {useState, useEffect} from 'react'
import ContactsServices from '../Firebase/services';


export default function Todolist() {
    const [todo, setTodo] = useState(null)
    const [todoList, setTodoList] = useState([])

    useEffect(()=>{
        getTodoList();
    })

const getTodoList = async()=>{
    const data = await ContactsServices.getTodoList();
    setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
}


    const handleSetTodo =async (e)=>{
        e.preventDefault();
        const newData = {
            todo
        }
        await ContactsServices.addTodo(newData)
        setTodo('')
    }

    const handleTodoDelete = async (id)=>{
        await ContactsServices.deleteTodo(id)
        getTodoList();
    }

  return (
    <div className='card_plain p16'>
        <input 
            type="text"
            placeholder='Write A Todo'
            value={todo}
            onChange={(e)=> setTodo(e.target.value)}>
        </input>
        <input type="submit" value="Add Todo" onClick={handleSetTodo}></input>
        {todoList.map((doc, index)=>{
                return(
                    <div key={doc.id}>
                        <p>{doc.todo}</p>
                        <button onClick={(e)=>handleTodoDelete(doc.id)}>DELETE</button> 
                    </div>
                    )
            })}
    </div>
  )
}
