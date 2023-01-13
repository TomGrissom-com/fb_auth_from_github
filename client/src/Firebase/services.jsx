import { db } from './firebase'
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    setDoc,
  } from "firebase/firestore";

const contacts = 'contacts'
const users = 'users'

class ContactsServices {

  //FOR USERS
  createUserAccount = (uid, dataToAdd) => {
    return setDoc(doc(db,users,uid),dataToAdd)
  }
  
  addUserData=(dataToAdd,UID)=>{
    const userData = collection(db,users+"/"+UID)
    return addDoc(userData,dataToAdd)
  }

  getUserData = (UID) => {
    const userData = doc(db,users,UID);
    return getDoc(userData);
  }

  updateUserData = (UID, data) => {
    const dataRef = doc(db,users,UID)
    return updateDoc(dataRef, data)
  }


//DATA CONTROL FROM FIRST INIT
  getAllData = () => {
    return getDocs(collection(db,contacts));
  } 
  
  getAllUserData = (uid) => {
    return getDocs(uid)
  }
  
  getSingleDoc = (id) => {
    const docRef = doc(db,contacts,id);
    return getDoc(docRef);
  }
  
  updateSingleDoc = (id, dataToUpdate) => {
    const docRef = doc(db,contacts,id);
    return updateDoc(docRef, dataToUpdate);
  }
  
  addData=(dataToAdd)=>{
    return addDoc(collection(db,contacts),dataToAdd)
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
