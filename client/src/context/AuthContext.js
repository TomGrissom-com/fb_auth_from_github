import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../Firebase/firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [emailVerified, setEmailVerified] = useState();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }

  const logout = () => {
      return signOut(auth)
  }

  const googleSignin = () =>{
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth,provider).then((res)=>{
        console.log(res)
      }).catch((e)=>console.log(e))
  }
  const googleSigninRedir = () =>{
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth,provider).then((res)=>{
        console.log(res)
      }).catch((e)=>console.log(e))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setEmailVerified(currentUser.emailVerified)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ googleSignin, createUser, user, logout, signIn, emailVerified, googleSigninRedir }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
