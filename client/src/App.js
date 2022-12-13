import React from 'react';
import Signin from './views/Signin';
import Signup from './views/Signup';
import Account from './views/Account';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import { Main } from './views/Main';
import ContactView from './views/ContactView'

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/account'
            element={
              <ProtectedRoutes>
                <Account />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/account/contact'
            element={
              <ProtectedRoutes>
                <ContactView />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
