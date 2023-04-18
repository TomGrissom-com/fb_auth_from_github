import React, { useEffect, useState } from 'react'
import ContactsServices from '../Firebase/services'
import { useLocation, Link } from 'react-router-dom'
import NotesProject from './NotesProject'
import AddNoteProject from './AddNoteProject'
import Contact from './Contact'

export default function Project() {
//data import
  const [projectData, setProjectData] = useState([])
  const location = useLocation()
  const {contactName, contactID, projectId} = location.state
  const contactId = contactID
  const id = projectId
  const [loading, setLoading] = useState('Loading...')
  const lastUpdated = new Date();
  const [projectDescData, setProjectDescData] = useState('')
  const [editProjectDesc, setEditProjectDesc] = useState(false)
  const [projectTitleData, setProjectTitleData] = useState('')
  const [editProjectTitle, setEditProjectTitle] = useState(false)
  

//General
  const [alert, setAlert] = useState('')

useEffect(()=>{
    getProject();
  },[])
  
  const getProject = async ()=>{
    const data = await ContactsServices.getSingleProject(id,contactId); 
    setProjectData(data.data())
    setProjectDescData(data.data().projectDesc)
    setProjectTitleData(data.data().projectTitle)
  setLoading("")
}

  const updateProject = async ()=>{
    setEditProjectDesc(false)
    setEditProjectTitle(false)
    const dataToUpdate = {
      projectDesc : projectDescData,
      projectTitle : projectTitleData
    }
     await ContactsServices.updateSingleProject(contactId,id,dataToUpdate)
     getProject()
  }

const alarm = (msg)=>{
  setAlert(msg)
  setTimeout(()=>{setAlert('')},2900)
}

return (
  <>
      <div className='grid4x4'>
        <div className='grid_contact_table'>
        <Link to="/account/contact" state={{from: contactId}}><p>← back</p></Link>
          <div id="toast" className={!alert ? "" : "show"}>{alert}</div>
        <div>
            {!editProjectTitle? 
              <>                
                <a 
                  onClick={(e)=>setEditProjectTitle(true)}
                  style={{color:"black"}} 
                  title="click to change"
                >
                  <h1>{projectData.projectTitle}</h1>
                </a>
              </>
              :
              <>
                <input type='text' value={projectTitleData} onChange={(e)=>setProjectTitleData(e.target.value)}></input>
                <button onClick={(e)=>updateProject()}>Submit</button>
              </>
            }
            
            <p>Contact: <Link to="/account/contact" state={{from: contactId}}>{contactName}</Link></p>
            {!editProjectDesc ? 
              <>
                <a 
                  onClick={(e)=>setEditProjectDesc(true)}
                  style={{color:"black"}} 
                  title="click to change">
                  <p>{!projectData.projectDesc ? "No Description":projectData.projectDesc}</p>
                </a>
              </>
              :
              <>
                <textarea 
                  style={{width:'100%',height:'150px'}} 
                  value={projectDescData} 
                  onChange={(e)=>setProjectDescData(e.target.value)}
                />
                <button onClick={(e)=>updateProject()}>Submit</button>
              </>
            }

        </div>
        </div>
        <div className='grid_addNote'>
          <AddNoteProject data={contactId} projectID={id}/>
        </div>
        <div className='notes'>
          <NotesProject data={contactId} projectID={id}/>
        </div>
      </div>
    </>
  )
}
