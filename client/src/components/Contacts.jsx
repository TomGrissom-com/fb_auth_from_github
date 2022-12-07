    import React, { useState, useEffect } from 'react';
    import ContactsServices from '../Firebase/services';
    import { collection, query, where } from 'firebase/firestore';
    import { db } from '../Firebase/firebase'
    import { UserAuth } from '../context/AuthContext';

    const contactsCollection = collection(db,'contacts')
    
    const Contacts = ({props}) => {
        const [list, setList] = useState([])
        const {user} = UserAuth();
        
        const userID = user.uid

        useEffect(() => {
            getContacts();
        },[props]);

        const getContacts = async () => {
            const q = query(contactsCollection, where("uid","==", userID))
            const data = await ContactsServices.getAllUserData(q);
            setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            }

        console.log(list)

        const deleteHandler = async (id) => {
            await ContactsServices.deleteData(id)
            getContacts()
        }


    return (<>
        <div>
            <h2>Contacts</h2>
        </div>
        <div>
                    <thead>
                        <tr key='table'>
                            <th key='docID'>ID</th>
                            <th key='created'>Created</th>
                            <th key='first_name'>First Name</th>
                            <th key='last_name'>last Name</th>
                            <th key='phone_number01'>Phone Number01</th>
                            <th key='phone_number02'>Phone Number02</th>
                            <th key='delButton'></th>
                        </tr>
                    </thead>
            {list.map((doc, index) =>{
                return(
                    <tbody>
                        <tr key={doc.id}>
                            <td key={"id"+doc.id}>{doc.id}</td>
                            <td key={new Date(doc.timestamp.seconds * 1000).toLocaleDateString("en-US")}>{new Date(doc.timestamp.seconds * 1000).toLocaleDateString("en-US")}</td>
                            <td key={doc.first_name}>{doc.first_name}</td>
                            <td key={doc.last_name}>{doc.last_name}</td>
                            <td key={doc.phone_number01}>{doc.phone_number01}</td>
                            <td key={doc.phone_number02}>{doc.phone_number02}</td>
                            <td>
                            <button onClick={(e)=>deleteHandler(doc.id)}>DELETE</button>  
                            </td>
                            <td><a href={"account/contact?id="+doc.id}>View</a></td>
                        </tr>
                    </tbody>
                )
            })}
        </div>
    </>
    )
    }
    export default Contacts


    //stopped after adding useState this component is going to be used
    //for getting all contacts from the database