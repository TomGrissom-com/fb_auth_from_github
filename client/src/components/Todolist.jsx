import React, {useState, useEffect} from 'react'
import ContactsServices from '../Firebase/services';
import trash from '../images/trash.png';
import { Link } from 'react-router-dom';


export default function Todolist() {
    const [todo, setTodo] = useState(null)
    const [todoList, setTodoList] = useState([])

    useEffect(()=>{
        getTodoList();
    },[])

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

    const handleTodoDelete = async (id) => {
        await ContactsServices.deleteTodo(id);
        setTodoList(prevTodoList => prevTodoList.filter(todo => todo.id !== id));
      };
      
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
                    <div className="todoContainer" key={doc.id}>
                        <div className='todoGrid-item'>
                            <Link className='table_button p5' onClick={(e)=>handleTodoDelete(doc.id)}>
                                <img alt='Trash Can Press to Delete' className='trashCan' src={trash}></img>
                            </Link> 
                        </div> 
                        <div className='todoGrid-item'>
                            <p>{doc.todo}</p>
                        </div>
                    </div>
                    )
            })}
    </div>
  )
}
