import React, { useState } from "react";
import ContactServices from '../Firebase/services';


export default function AddNote( contactId ) {
    const [note, setNote] = useState("")

    const handleSubmitNote = async (e) => {
        e.preventDefault();
        
        const newdata = {
            note
        }
        await ContactServices.addNote(newdata,contactId.data)
        setNote("")
        window.location.reload(false)
    }

  return (
    <>
        <div>
            <form>
                <textarea 
                    type="text" 
                    placeholder="Write A Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}>
                </textarea><br/>
                <input type="submit" value="Add Note" onClick={handleSubmitNote}></input>
            </form>
        </div>
    </>
  )
}
