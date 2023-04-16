import React, {useEffect, useState} from 'react';
import ContactServices from '../Firebase/services';

export default function AddProject( contactId ) {
    const [openCreate, setOpenCreate] = useState(false)
    const [projectTitle, setProjectTitle] = useState('')
    const [projectDesc, setProjectDesc] = useState('')
    const timestamp = new Date();

    const handleSubmitProject = async (e)=>{
        e.preventDefault();
        const projectData={
            projectTitle,
            projectDesc,
            timestamp,
        }
        await ContactServices.createProject(projectData,contactId.id)
    }

  return (
  <>
    <div style={{backgroundColor: "lightgray", margin: 5, padding: 5}}>
            <p>
                <a onClick={()=>setOpenCreate((openCreate) => !openCreate)}>{!openCreate?"↓ Open":"↑ Close"} Create New Project</a>
            </p>
        {openCreate === true ?
        <>
            <form>
                <label>Project Title</label><br/>
                <input
                    className='m10 p8 border_rounded' 
                    type="text" 
                    placeholder="Project Title"
                    value={projectTitle}
                    onChange={(e) => {setProjectTitle(e.target.value)}}>
                </input><br/>
                <label>Description</label><br/>
                <textarea
                    className='m10 p8 border_rounded' 
                    type="text" 
                    placeholder="Project Description"
                    value={projectDesc}
                    onChange={(e) => setProjectDesc(e.target.value)}>
                </textarea><br/>
                <input type="submit" value="Create Project" onClick={handleSubmitProject}></input>
            </form>
        </>
        :""}
    </div>
  </>
  )
}
