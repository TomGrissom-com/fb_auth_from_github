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

    deleteData=(id)=>{
      const deletedoc = doc(db,contacts,id)
      return deleteDoc(deletedoc)
    }

}

export default new ContactsServices()
