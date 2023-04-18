import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ContactsServices from '../Firebase/services';
import moment from 'moment';
import { useLocation, Link } from 'react-router-dom'

function Projects(props) {
    const contactId = props.contactId
    const contactName = props.contactname
    const [list, setList] = useState([])
    const [openCreate, setOpenCreate] = useState(false)
    const [projectTitle, setProjectTitle] = useState('')
    const [projectDesc, setProjectDesc] = useState('')
    const [err, setErr] = useState(false)
    const timestamp = new Date();
  
useEffect(()=>{
  getProjects()
},[])

    const getProjects = async () => {
            const data = await ContactsServices.getProjects(contactId);
            setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            }

    const handleSubmitProject = async (e)=>{
      e.preventDefault();
      const projectData={
          projectTitle,
          projectDesc,
          timestamp,
      }
      
      if(!projectTitle){
          setErr(true)
      }else{
          await ContactsServices.createProject(projectData,contactId)
          setErr(false)
          setProjectTitle('')
          setProjectDesc('')
          setOpenCreate(false)
        }
        getProjects()
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
                <label style={{color: !err ? '':'red'}}>Project Title</label><br/>
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
      {list.map((doc, index)=>{
        return(
          <React.Fragment key={index}>
            <div>
              <Link to="/account/project" state={{contactName: contactName, contactID: contactId, projectId: doc.id}}><p>{doc.projectTitle}</p></Link>
            </div>
          </React.Fragment>
        )
      })}
    </>
  )
}

export default Projects
