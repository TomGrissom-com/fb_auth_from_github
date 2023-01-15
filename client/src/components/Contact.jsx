import React, { useEffect, useState } from 'react'
import ContactsServices from '../Firebase/services'
import AddNote from '../components/AddNote'
import Notes from '../components/Notes'
import { useLocation } from 'react-router-dom'
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
  //data export  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone01, setPhone01] = useState('')
  const [phone02, setPhone02] = useState('')
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
              <tr>
                <td>Created</td>
                {loading ? loading :
                <td>{moment(new Date(contactData.timestamp.seconds * 1000)).format("MM/DD/YY  h:mm a")}</td>
                }
              
              </tr>
              <tr>
                <td>Last Updated</td>
                {loading ? loading :
                  <td>{moment(new Date(contactData.lastUpdated.seconds * 1000)).format("MM/DD/YY  h:mm a")}</td>
                }
              
              </tr>

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
              
              <tr>
                <td style={{background: 'lightgray'}}><strong>Email</strong></td>
                <td>
                  {!changeDataEmail ? 
                    contactData.email 
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
              
              <tr>
                <td style={{background: 'lightgray'}}><strong>Main Phone</strong></td>
                <td>
                  {!changeDataPhone01 ? 
                    contactData.phone_number01 
                    : 
                    <>
                      <input type='email' value={phone01} onChange={(e)=>setPhone01(e.target.value)}>
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
              
              <tr>
                <td style={{background: 'lightgray'}}><strong>Secondary Phone</strong></td>
                <td>
                  {!changeDataPhone02 ? 
                    contactData.phone_number02 
                    : 
                    <>
                      <input type='email' value={phone02} onChange={(e)=>setPhone02(e.target.value)}>
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

              

            </tbody>
          </table>
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
