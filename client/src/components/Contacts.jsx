    import React, { useState, useEffect } from 'react';
    import ContactsServices from '../Firebase/services';
    import { collection, query, where, orderBy } from 'firebase/firestore';
    import { db } from '../Firebase/firebase'
    import { UserAuth } from '../context/AuthContext';
    import moment from 'moment';
    import { Link } from 'react-router-dom';
    import trash from '../images/trash.png'


    const contactsCollection = collection(db,'contacts')
    
    const Contacts = ({props}) => {
        const [list, setList] = useState([])
        const {user} = UserAuth();
        
        const userID = user.uid

        useEffect(() => {
            getContacts();
        },[props]);

        const getContacts = async () => {
            const q = query(contactsCollection, where("uid","==", userID), orderBy("last_name"))
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
                <div>
                    <div className='tableContainer'>
                        <table>
                                    <thead>
                                        <tr key='table'>
                                            <td key='created'>CREATED</td>
                                            <td key='first_name'>FIRST NAME</td>
                                            <td key='last_name'>LAST NAME</td>
                                            <td key='email'>EMAIL</td>
                                            <td key='phone_number01'>MAIN PHONE</td>
                                            <td key='phone_number02'>SECONDARY PHONE</td>
                                            <td key='viewButton'>VIEW</td>
                                            <td key='delButton'>DELETE</td>
                                        </tr>
                                    </thead>
                            {list.map((doc, index) =>{
                                return(
                                    <tbody>
                                        <tr id={index} key={doc.id}>
                                            <td key={new Date(doc.timestamp.seconds * 1000).toLocaleDateString("en-US")}>{moment(new Date(doc.timestamp.seconds * 1000)).format("MM/DD/yy  h:mm a")}</td>
                                            <td key={doc.first_name}>{doc.first_name}</td>
                                            <td key={doc.last_name}>{doc.last_name}</td>
                                            <td key={doc.email}>{doc.email}</td>
                                            <td key={doc.phone_number01}>{doc.phone_number01}</td>
                                            <td key={doc.phone_number02}>{doc.phone_number02}</td>
                                            <td><Link className='aTag_Button table_button p5' to="/account/contact" state={{from: doc.id}}>View</Link></td>
                                            <td>
                                                <Link className='table_button p5' onClick={(e)=>deleteHandler(doc.id)}>
                                                    <img alt='Trash Can Press to Delete' className='trashCan' src={trash}></img>
                                                </Link>  
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    </div>
                </div>
            </div>
    </>
    )
    }
    export default Contacts


    //stopped after adding useState this component is going to be used
    //for getting all contacts from the database