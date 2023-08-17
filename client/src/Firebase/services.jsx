import { db } from './firebase'
import {sendPasswordResetEmail} from "firebase/auth"
import { auth } from '../Firebase/firebase';
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

  resetPassword = (email) => {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then(() => resolve("EMAIL SUCCESSFULLY SENT"))
        .catch((err) => reject(err));
    });}

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
    
// ============================//
//FOR WORKING WITH PROJECTS//
// ============================//
  createProject=(dataToAdd, contactID)=>{
    const projectRef = collection(db, contacts+"/"+contactID+"/projects")
    return addDoc(projectRef,dataToAdd)
  }
  getProjects=(contactID)=>{
    const projectData = collection(db,contacts+"/"+contactID+"/projects")
    return getDocs(projectData)
  }
  deleteProject=(id,contactID)=>{
    const deletedoc = doc(db,contacts+"/"+contactID+"/projects",id)
    return deleteDoc(deletedoc)
  }
  getSingleProject = (id,contactID)=>{
    const docRef = doc(db,contacts+"/"+contactID+"/projects",id);
    return getDoc(docRef);
  }
  updateSingleProject = (contactID,id, dataToUpdate) => {
    const docRef = doc(db,contacts+"/"+contactID+"/projects",id);
    return updateDoc(docRef, dataToUpdate);
  }
  getProjectNotes(contactID, projectId){
    const contactNotes = collection(db,contacts+"/"+contactID+"/projects/"+projectId+"/notes")
    return getDocs(contactNotes)
  }
  addProjectNote=(dataToAdd,contactID, projectId)=>{
    const contactsNotes = collection(db,contacts+"/"+contactID+"/projects/"+projectId+"/notes")
    return addDoc(contactsNotes,dataToAdd)
  }
  deleteProjectNote=(id,contactID, projectId)=>{
    const deletedoc = doc(db,contacts+"/"+contactID+"/projects/"+projectId+"/notes",id)
    return deleteDoc(deletedoc)
  }
// ============================//
  

// ============================//
//FOR WORKING WITH TODO List//
// ============================//

addTodo=(datatoadd)=>{
  const addTodo = collection(db,"todoList")
  return addDoc(addTodo, datatoadd)
}

getTodoList=()=>{
  const list = collection(db,"todoList")
  return getDocs(list)
}

deleteTodo=(id)=>{
  const deleteTodoDoc = doc(db,"todoList",id)
  return deleteDoc(deleteTodoDoc)
}

deleteNote=(id,contactID)=>{
  const deletedoc = doc(db,contacts+"/"+contactID+"/notes",id)
  return deleteDoc(deletedoc)
}

}

export default new ContactsServices()
