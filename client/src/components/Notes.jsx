import React, { useState, useEffect } from 'react';
import ContactsServices from '../Firebase/services';



export default function Notes( contactId ) {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes();
    },[]);

    const getNotes = async () => {
        const data = await ContactsServices.getNotes(contactId.data);
        setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

    console.log(notes)
    
    const deleteHandler = async (id) => {
        await ContactsServices.deleteNote(id,contactId.data)
        getNotes()
    }
    
  return (
    <>
        <div><h1>Notes</h1></div>
        <div>
            <table>
                <tbody>
        {notes.map((doc, index) =>{
                return(
                        <tr key={doc.id}>
                            <td key={"id"+doc.id}>{doc.id}</td>
                            <td key={"note"+doc.id}>{doc.note}</td>
                            <td key={"delete"+doc.id}>
                            <button onClick={(e)=>deleteHandler(doc.id)}>DELETE</button>  
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>

    </>
  )
}

