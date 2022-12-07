import React, { useEffect, useState } from 'react'
import ContactsServices from '../Firebase/services'
import AddNote from '../components/AddNote'
import Notes from '../components/Notes'

export default function Contact(id) {
  const [contactData, setContactData] = useState([])
  const url = window.location.href
  const contactId = url.split("?id=")[1] 
  console.log(contactId)

   useEffect(()=>{
    getContact();
   },[])
  
   const getContact = async ()=>{
     const data = await ContactsServices.getSingleDoc(contactId);            
     setContactData(data.data())
  }

  return (
    <>
      <div>ContactView</div>
      <div className='innerBody'>
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
            <tr>
              <td style={{background: 'lightgray'}}><strong>Owner ID</strong></td>
              <td>{contactData.uid}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <AddNote data={contactId}></AddNote>
      <Notes data={contactId}></Notes>
    </>
  )
}
