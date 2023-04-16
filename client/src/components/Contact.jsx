import React, { useEffect, useState } from 'react'
import ContactsServices from '../Firebase/services'
import AddNote from '../components/AddNote'
import Notes from '../components/Notes'
import Project from '../components/Project'
import AddProject from '../components/AddProject'
import { useLocation, Link } from 'react-router-dom'
import moment from 'moment';

export default function Contact() {
//data import
  const [contactData, setContactData] = useState([])
  const location = useLocation()
  const {from} = location.state
  const contactId = from
//State changes to alter ui
  const [changeDataFirstName, setChangeDataFirstName] = useState('')
  const [changeDataLastName, setChangeDataLastName] = useState('')
  const [changeDataEmail, setChangeDataEmail] = useState('')
  const [changeDataPhone01, setChangeDataPhone01] = useState('')
  const [changeDataPhone02, setChangeDataPhone02] = useState('')
  const [changeDataCompany, setChangeDataCompany] = useState('')
  const [changeDataStatus, setChangeDataStatus] = useState('')
  const [changeDataWebsite, setChangeDataWebsite] = useState('')
  const [changeDataCustomBox01Title, setChangeDataCustomBox01Title] = useState('')
  const [changeDataCustomBox02Title, setChangeDataCustomBox02Title] = useState('')
  const [changeDataCustomBox01Content, setChangeDataCustomBox01Content] = useState('')
  const [changeDataCustomBox02Content, setChangeDataCustomBox02Content] = useState('')
  const [changeDataSocialMedia, setChangeDataSocialMedia] = useState('')
//data export  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone01, setPhone01] = useState('')
  const [phone02, setPhone02] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState('')
  const [website, setWebsite] = useState('')
  const [socialMedia, setSocialMedia] = useState('')
  const [customBox01Title, setCustomBox01Title] = useState('')
  const [customBox02Title, setCustomBox02Title] = useState('')
  const [customBox01Content, setCustomBox01Content] = useState('')
  const [customBox02Content, setCustomBox02Content] = useState('')
  const [loading, setLoading] = useState('Loading...')
  const lastUpdated = new Date();
//General
  const [alert, setAlert] = useState('')


useEffect(()=>{
  getContact();
},[])

const getContact = async ()=>{
  const data = await ContactsServices.getSingleDoc(contactId); 
  setContactData(data.data())
  setLoading("")
}

const updateContact = async (data, data2,data3)=>{
  const dataToUpdate = {
    [data]: data2,
    lastUpdated: lastUpdated,
  }
  await ContactsServices.updateSingleDoc(contactId, dataToUpdate).catch(err=>console.log(err))
  [data3]
  getContact()
  alarm("Contact Updated")
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
          <table>
          
            <tbody>
{/* STATUS */}              
              <tr>                
                <td style={{background: 'lightgray'}}><strong>Status</strong></td>
                <td>
                   
                    <>
                      <select value={contactData.status} onChange={(e)=>updateContact("status",e.target.value,setChangeDataStatus(""))}>
                        <option>Pending</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                      
                    </>
                  
                </td>               
              </tr>
{/* CREATED */}
              <tr>
                <td>Created</td>
                {loading ? loading :
                <td>{moment(new Date(contactData.timestamp.seconds * 1000)).format("MM/DD/YY  h:mm a")}</td>
                }
              
              </tr>
{/* Last Updated */}              
              <tr>
                <td>Last Updated</td>
                {loading ? loading :
                  <td>{moment(new Date(contactData.lastUpdated.seconds * 1000)).format("MM/DD/YY  h:mm a")}</td>
                }
              
              </tr>
{/* FIRST NAME */}
              <tr>
                <td style={{background: 'lightgray'}}><strong>First Name</strong></td>
                <td>
                  {!changeDataFirstName ? 
                    contactData.first_name 
                    : 
                    <>
                      <input type='text' value={firstName} onChange={(e)=>setFirstName(e.target.value)}>
                      </input>
                    </>
                  }
                </td>               
                <td>
                  {!changeDataFirstName ? 
                    <a onClick={(e)=>setChangeDataFirstName("1")}>Edit</a> 
                    :
                    <a onClick={!firstName ?
                       (e)=>setChangeDataFirstName("")
                       :
                       ()=>updateContact("first_name",firstName,setChangeDataFirstName(""))
                      }>update </a> 
                    }
                </td>
              </tr>
{/* LAST NAME */}              
              <tr>
                <td style={{background: 'lightgray'}}><strong>Last Name</strong></td>
                <td>
                  {!changeDataLastName ? 
                    contactData.last_name 
                    : 
                    <>
                      <input type='text' value={lastName} onChange={(e)=>setLastName(e.target.value)}>
                      </input>
                    </>
                  }
                </td>               
                <td>
                  {!changeDataLastName ? 
                    <a onClick={(e)=>setChangeDataLastName("1")}>Edit</a> 
                    :
                    <a onClick={!lastName ?
                       (e)=>setChangeDataLastName("")
                       :
                       ()=>updateContact("last_name",lastName,setChangeDataLastName(""))
                      }>update </a> 
                    }
                </td>
              </tr>
{/* EMAIL */}              
              <tr>
                <td style={{background: 'lightgray'}}><strong>Email</strong></td>
                <td>
                  {!changeDataEmail ? 
                    <a className='reset' href={'mailto:'+contactData.email} target='blank'>{contactData.email}</a> 
                    : 
                    <>
                      <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}>
                      </input>
                    </>
                  }
                </td>               
                <td>
                  {!changeDataEmail ? 
                    <a onClick={(e)=>setChangeDataEmail("1")}>Edit</a> 
                    :
                    <a onClick={!email ?
                       (e)=>setChangeDataEmail("")
                       :
                       ()=>updateContact("email",email,setChangeDataEmail(""))
                      }>update </a> 
                    }
                </td>
              </tr>
{/* MAIN PHONE */}              
              <tr>
                <td style={{background: 'lightgray'}}><strong>Main Phone</strong></td>
                <td>
                  {!changeDataPhone01 ? 
                    contactData.phone_number01 
                    : 
                    <>
                      <input type='text' value={phone01} onChange={(e)=>setPhone01(e.target.value)}>
                      </input>
                    </>
                  }
                </td>               
                <td>
                  {!changeDataPhone01 ? 
                    <a onClick={(e)=>setChangeDataPhone01("1")}>Edit</a> 
                    :
                    <a onClick={!phone01 ?
                       (e)=>setChangeDataPhone01("")
                       :
                       ()=>updateContact("phone_number01",phone01,setChangeDataPhone01(""))
                      }>update </a> 
                    }
                </td>
              </tr>
{/* SECONDARY PHONE */}              
              <tr>
                <td style={{background: 'lightgray'}}><strong>Secondary Phone</strong></td>
                <td>
                  {!changeDataPhone02 ? 
                    contactData.phone_number02 
                    : 
                    <>
                      <input type='text' value={phone02} onChange={(e)=>setPhone02(e.target.value)}>
                      </input>
                    </>
                  }
                </td>               
                <td>
                  {!changeDataPhone02 ? 
                    <a onClick={(e)=>setChangeDataPhone02("1")}>Edit</a> 
                    :
                    <a onClick={!phone02 ?
                       (e)=>setChangeDataPhone02("")
                       :
                       ()=>updateContact("phone_number02",phone02,setChangeDataPhone02(""))
                      }>update </a> 
                    }
                </td>
              </tr>
{/* COMPANY */}              
              <tr>
                <td style={{background: 'lightgray'}}><strong>Company</strong></td>
                <td>
                  {!changeDataCompany ? 
                    contactData.Company 
                    : 
                    <>
                      <input type='text' value={company} onChange={(e)=>setCompany(e.target.value)}>
                      </input>
                    </>
                  }
                </td>               
                <td>
                  {!changeDataCompany ? 
                    <a onClick={(e)=>setChangeDataCompany("1")}>Edit</a> 
                    :
                    <a onClick={!company ?
                       (e)=>setChangeDataCompany("")
                       :
                       ()=>updateContact("Company",company,setChangeDataCompany(""))
                      }>update </a> 
                    }
                </td>
              </tr>
{/* WEBSITE */}
              <tr>
                <td style={{background: 'lightgray'}}><strong>Website</strong></td>
                <td>
                  {!changeDataWebsite ? 
                    <a href={contactData.website} target="blank">{contactData.website}</a> 
                    : 
                    <>
                      <input type='text' value={website} onChange={(e)=>setWebsite(e.target.value)}>
                      </input>
                    </>
                  }
                </td>               
                <td>
                  {!changeDataWebsite ? 
                    <a onClick={(e)=>setChangeDataWebsite("1")}>Edit</a> 
                    :
                    <a onClick={!website ?
                       (e)=>setChangeDataWebsite("")
                       :
                       ()=>updateContact("website",website,setChangeDataWebsite(""))
                      }>update </a> 
                    }
                </td>
              </tr>
{/* SOCIAL MEDIA */}
              <tr>
                <td style={{background: 'lightgray'}}><strong>Social Media</strong></td>
                <td>
                  {!changeDataSocialMedia ? 
                    <a href={contactData.socialMedia} target="blank">{contactData.socialMedia}</a> 
                    : 
                    <>
                      <input type='text' value={socialMedia} onChange={(e)=>setSocialMedia(e.target.value)}>
                      </input>
                    </>
                  }
                </td>               
                <td>
                  {!changeDataSocialMedia ? 
                    <a onClick={(e)=>setChangeDataSocialMedia("1")}>Edit</a> 
                    :
                    <a onClick={!socialMedia ?
                       (e)=>setChangeDataSocialMedia("")
                       :
                       ()=>updateContact("socialMedia",socialMedia,setChangeDataSocialMedia(""))
                      }>update </a> 
                    }
                </td>
              </tr>
{/* CUSTOMBOX01 */}
              <tr>
                <td style={{background: 'lightgray'}}>
                  {!changeDataCustomBox01Title ? 
                    <strong><a className={!contactData.customBox01Title ? "":'reset' } onClick={()=>setChangeDataCustomBox01Title('1')}>{!contactData.customBox01Title?"click to change Title": contactData.customBox01Title}
                    </a></strong>
                    : 
                    <>
                      <input 
                        type='text'
                        id='customBox01Title' 
                        value={customBox01Title} 
                        onChange={(e)=>setCustomBox01Title(e.target.value)}
                        onKeyDown={(e)=>{
                          if(e.key === 'Enter'){
                            updateContact('customBox01Title',customBox01Title,setChangeDataCustomBox01Title(''))
                          }
                        }}
                        >
                        
                      </input>
                    </>
                  }
                  </td>
                <td>
                  {!changeDataCustomBox01Content ? 
                    contactData.customBox01Content 
                    : 
                    <>
                      <input 
                        type='text' 
                        value={customBox01Content} 
                        onChange={(e)=>setCustomBox01Content(e.target.value)}>
                      </input>
                    </>
                  }
                </td>               
                <td>
                  {!changeDataCustomBox01Content ? 
                    <a onClick={(e)=>setChangeDataCustomBox01Content("1")}>Edit</a> 
                    :
                    <a onClick={!customBox01Content ?
                       (e)=>setChangeDataCustomBox01Content("")
                       :
                       ()=>updateContact("customBox01Content",customBox01Content,setChangeDataCustomBox01Content(""))
                      }>update</a> 
                    }
                </td>
              </tr>
{/* CUSTOMBOX02 */}
              <tr>
                <td style={{background: 'lightgray'}}>
                  {!changeDataCustomBox02Title ? 
                    <strong><a className={!contactData.customBox02Title ? "":'reset' } onClick={()=>setChangeDataCustomBox02Title('1')}>{!contactData.customBox02Title?"click to change Title": contactData.customBox02Title}
                    </a></strong>
                    : 
                    <>
                      <input 
                        type='text'
                        id='customBox02Title' 
                        value={customBox02Title} 
                        onChange={(e)=>setCustomBox02Title(e.target.value)}
                        onKeyDown={(e)=>{
                          if(e.key === 'Enter'){
                            updateContact('customBox02Title',customBox02Title,setChangeDataCustomBox02Title(''))
                          }
                        }}
                        >
                        
                      </input>
                    </>
                  }
                  </td>
                <td>
                  {!changeDataCustomBox02Content ? 
                    contactData.customBox02Content 
                    : 
                    <>
                      <input 
                        type='text' 
                        value={customBox02Content} 
                        onChange={(e)=>setCustomBox02Content(e.target.value)}>
                      </input>
                    </>
                  }
                </td>               
                <td>
                  {!changeDataCustomBox02Content ? 
                    <a onClick={(e)=>setChangeDataCustomBox02Content("1")}>Edit</a> 
                    :
                    <a onClick={!customBox02Content ?
                       (e)=>setChangeDataCustomBox02Content("")
                       :
                       ()=>updateContact("customBox02Content",customBox02Content,setChangeDataCustomBox02Content(""))
                      }>update</a> 
                    }
                </td>
              </tr>

            </tbody>
          </table>
        <div>
          <AddProject id={contactId}></AddProject>
          <h1>Place Projects Section here</h1>
          <Project data={contactId}></Project>
        </div>
        </div>
        <div className='grid_addNote'>
          <AddNote data={contactId}></AddNote>
        </div>
        <div className='notes'>
          <Notes data={contactId}></Notes>
        </div>
      </div>
    </>
  )
}
