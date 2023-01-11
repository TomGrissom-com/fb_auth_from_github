import React, { useEffect, useState } from 'react'
import ContactsServices from '../Firebase/services'
import AddNote from '../components/AddNote'
import Notes from '../components/Notes'
import { useLocation } from 'react-router-dom'

export default function Contact() {
  const [contactData, setContactData] = useState([])
  const url = window.location.href
  const location = useLocation()
  const {from} = location.state
  const contactId = from


   useEffect(()=>{
    getContact();
   },[])
  
   const getContact = async ()=>{
     const data = await ContactsServices.getSingleDoc(contactId);            
     setContactData(data.data())
  }

  return (
    <>
      <div className='grid4x4'>
        <div className='grid_contact_table'>
          <table>
            <tbody>
              <tr>
                <td style={{background: 'lightgray'}}><strong>First Name</strong></td>
                <td>{contactData.first_name}</td>
              </tr>
              <tr>
                <td style={{background: 'lightgray'}}><strong>Last Name</strong></td>
                <td>{contactData.last_name}</td>
              </tr>
              <tr>
                <td style={{background: 'lightgray'}}><strong>Email</strong></td>
                <td>{contactData.email}</td>
              </tr>
              <tr>
                <td style={{background: 'lightgray'}}><strong>Phone Main</strong></td>
                <td>{contactData.phone_number01}</td>
              </tr>
              <tr>
                <td style={{background: 'lightgray'}}><strong>Phone Secondary</strong></td>
                <td>{contactData.phone_number02}</td>
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
