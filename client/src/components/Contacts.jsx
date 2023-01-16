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
        const [email, setEmail]= useState('')
        const [first_name, setFirst_name]= useState('')
        const [last_name, setLast_name]= useState('')
        const [phone_number01, setPhone_number01]= useState('')
        const [phone_number02, setPhone_number02]= useState('')
        const [loading, setLoading] = useState('')
        const [err, setErr] = useState('')
        const timestamp = new Date();
        const [alert, setAlert] = useState('')
        const {user} = UserAuth();

        useEffect(() => {
            if(user.uid){
                getContacts();
            }
        },[props]);
        
        const userID = user.uid
        const uid = userID

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading("Loading")
            setErr('')
            
            const newdata = {
                email,
                first_name,
                last_name,
                phone_number01,
                phone_number02,
                timestamp,
                lastUpdated: timestamp,
                uid,
            }
            
            if(!first_name || !last_name){
                setErr("MUST HAVE FIRST AND LAST NAME")
            }else{
                try {
                    await ContactsServices.addData(newdata);
                } catch (e) {
                    setErr(e.message);
                } 
                setEmail('')
                setFirst_name('')
                setLast_name('')
                setPhone_number01('')
                setPhone_number02('')
                setErr('')
                alarm('Contact Added')
                getContacts()
            }
            setLoading("")
        }
    
        const alarm = (msg)=>{
            setAlert(msg)
            setTimeout(()=>{setAlert('')},2900)
        }

        const getContacts = async () => {
            const q = query(contactsCollection, where("uid","==", userID), orderBy("last_name"))
            const data = await ContactsServices.getAllUserData(q);
            setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            }


        const deleteHandler = async (id) => {
            await ContactsServices.deleteData(id)
            getContacts()
        }


    return (<>
            <div className='grid_addContacts'>
                <div id="toast" className={!alert ? "" : "show"}>{alert}</div>
                <div className="card_plain p8">
                    <div>
                        <h2>Add Contact</h2>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="m5 p5 border_rounded" 
                                type="text" 
                                placeholder="First Name"
                                value={first_name}
                                onChange={(e) => setFirst_name(e.target.value)}
                                disabled={!loading ? "":"disabled"}>
                            </input>
                            <input 
                                className="m5 p5 border_rounded"
                                type="text"
                                placeholder="Last Name"
                                value={last_name}
                                onChange={(e) => setLast_name(e.target.value)}
                                disabled={!loading ? "":"disabled"}>
                            </input><br/>
                            <input 
                                className="m5 p5 border_rounded"
                                type="text" 
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!loading ? "":"disabled"}>
                            </input>
                            <input 
                                className="m5 p5 border_rounded"
                                type="text"
                                placeholder="Main Phone"
                                value={phone_number01}
                                onChange={(e) => setPhone_number01(e.target.value)}
                                disabled={!loading ? "":"disabled"}>
                            </input><br/>
                            <input 
                                className="m5 p5 border_rounded"
                                type="text"
                                placeholder="Secondary Phone"
                                value={phone_number02}
                                onChange={(e) => setPhone_number02(e.target.value)}
                                disabled={!loading ? "":"disabled"}>
                            </input>   
                            <br></br>
                            <input id='submit' className="m5 p5 border_rounded" type="submit" value="Submit" disabled={!loading ? "":"disabled"}></input>
                        </form>
                        {!err ? '':<a className="txtRED">{err}</a>}
                </div>
                </div>
            </div>

            <div className='grid_contacts'>
                <div>
                    <div>
                        <div className='tableContainer'>
                            <table>
                                        <thead>
                                            <tr key='table'>
                                                <td key='viewButton'>VIEW</td>
                                                <td key='first_name'>FIRST NAME</td>
                                                <td key='last_name'>LAST NAME</td>
                                                <td key='email'>EMAIL</td>
                                                <td key='phone_number01'>MAIN PHONE</td>
                                                <td key='phone_number02'>SECONDARY PHONE</td>
                                                <td key='created'>CREATED</td>
                                                <td key='delButton'>DELETE</td>
                                            </tr>
                                        </thead>
                                {list.map((doc, index) =>{
                                    return(
                                        <tbody key={doc.id+"body"}>
                                            <tr id={index} key={doc.id}>
                                                <td><Link className='aTag_Button table_button p5' to="/account/contact" state={{from: doc.id}}>View</Link></td>
                                                <td key={doc.first_name}><Link className='reset' to="/account/contact" state={{from: doc.id}} >{doc.first_name}</Link></td>
                                                <td key={doc.last_name}><Link className='reset' to="/account/contact" state={{from: doc.id}} >{doc.last_name}</Link></td>
                                                <td key={doc.email}><a className='reset' href={'mailto:'+doc.email} target="blank">{doc.email}</a></td>
                                                <td key={doc.phone_number01}>{doc.phone_number01}</td>
                                                <td key={doc.phone_number02}>{doc.phone_number02}</td>
                                                <td key={new Date(doc.timestamp.seconds * 1000).toLocaleDateString("en-US")}>{moment(new Date(doc.timestamp.seconds * 1000)).format("MM/DD/yy  h:mm a")}</td>
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
            </div>
            
    </>
    )
    }
    export default Contacts


    //stopped after adding useState this component is going to be used
    //for getting all contacts from the database