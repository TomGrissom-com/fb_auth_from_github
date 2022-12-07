import { db } from './firebase'
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";

const contacts = 'contacts'
const contactsCollection = collection(db,contacts)

class ContactsServices {
  
  getAllData = () => {
    return getDocs(contactsCollection);
  } 
  
  getAllUserData = (uid) => {
    return getDocs(uid)
  }
  
  getSingleDoc = (id) => {
    const docRef = doc(db,contacts,id);
    return getDoc(docRef);
  }
  
  updateSingleDoc = (id) => {
    const docRef = doc(db,contacts,id);
    return updateDoc(docRef);
  }
  
  addData=(dataToAdd)=>{
    return addDoc(contactsCollection,dataToAdd)
  }

  getNotes(contactID){
    const contactNotes = collection(db,contacts+"/"+contactID+"/notes")
    return getDocs(contactNotes)
  }
  
  addNote=(dataToAdd,contactID)=>{
    const contactsNotes = collection(db,contacts+"/"+contactID+"/notes")
    return addDoc(contactsNotes,dataToAdd)
  }
  
  deleteData=(id)=>{
      const deletedoc = doc(db,contacts,id)
      return deleteDoc(deletedoc)
    }
  deleteNote=(id,contactID)=>{
      const deletedoc = doc(db,contacts+"/"+contactID+"/notes",id)
      return deleteDoc(deletedoc)
    }

}

export default new ContactsServices()
