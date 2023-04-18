import React, { useEffect, useState } from 'react'
import ContactsServices from '../Firebase/services'
import { useLocation, Link } from 'react-router-dom'

export default function Project() {
//data import
  const [projectData, setProjectData] = useState([])
  const location = useLocation()
  const {contactName, contactID, projectId} = location.state
  const contactId = contactID
  const id = projectId
  const [loading, setLoading] = useState('Loading...')
  const lastUpdated = new Date();
//General
  const [alert, setAlert] = useState('')

useEffect(()=>{
    getProject();
},[])

const getProject = async ()=>{
  const data = await ContactsServices.getSingleProject(id,contactId); 
  setProjectData(data.data())
  setLoading("")
}

const alarm = (msg)=>{
  setAlert(msg)
  setTimeout(()=>{setAlert('')},2900)
}
return (
  <>
      <div className='grid4x4'>
        <div className='grid_contact_table'>
                <div id="toast" className={!alert ? "" : "show"}>{alert}</div>
        <div>
            <h1>{projectData.projectTitle}</h1>
            <p>Contact: <Link to="/account/contact" state={{from: contactId}}>{contactName}</Link></p>
            <p>{!projectData.projectDesc ? "No Description":projectData.projectDesc}</p>
        </div>
        </div>
        <div className='grid_addNote'>
        </div>
        <div className='notes'>
        </div>
      </div>
    </>
  )
}
