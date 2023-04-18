import React, { useState } from "react";
import ContactServices from '../Firebase/services';


export default function AddNoteProject( props ) {
    const [note, setNote] = useState("")
    const timestamp = new Date();

    const handleSubmitNote = async (e) => {
        e.preventDefault();
        
        const newdata = {
            note,
            timestamp,
        }
        await ContactServices.addProjectNote(newdata,props.data, props.projectID)
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
