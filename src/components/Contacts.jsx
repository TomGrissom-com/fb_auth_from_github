    import React, { useState, useEffect } from 'react';
    import ContactsServices from '../Firebase/services'
    
    const Contacts = ({props}) => {
        const [list, setList] = useState([])

        useEffect(() => {
            getContacts();
        },[]);

        const getContacts = async () => {
            const data = await ContactsServices.getAllData();
            setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        console.log(list)

    return (<>
        <div>
            <h1>Contacts</h1>
            <p>{props} "will be used later to id data ownership"</p> 
        </div>
        <div>
                    <div>
                        <tr key='table'>
                            <th>Index</th>
                            <th>Created</th>
                            <th>First Name</th>
                            <th>last Name</th>
                            <th>Phone Number01</th>
                            <th>Phone Number02</th>
                        </tr>
                    </div>
            {list.map((doc, index) =>{
                return(
                    <div>
                        <tr key={doc.id}>
                            <td>{index}</td>
                            <td>{new Date(doc.timestamp.seconds * 1000).toLocaleDateString("en-US")}</td>
                            <td>{doc.first_name}</td>
                            <td>{doc.last_name}</td>
                            <td>{doc.phone_number01}</td>
                            <td>{doc.phone_number02}</td>
                        </tr>
                    </div>
                )
            })}
        </div>
    </>
    )
    }
    export default Contacts


    //stopped after adding useState this component is going to be used
    //for getting all contacts from the database