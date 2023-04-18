import React from 'react';
import Signin from './views/Signin';
import Signup from './views/SignupRedirect';
import SignupAdmin from './views/Signup';
import Dashboard from './views/Dashboard';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import { Main } from './views/Main';
import ContactView from './views/ContactView'
import ContactsView from './views/ContactsView';
import ProjectView from './views/ProjectView';

function App() {
  return (
    <div>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signupAdmin' element={<SignupAdmin />} />
              <Route path='/Dashboard' element={
                  <ProtectedRoutes>
                    <Dashboard/>
                  </ProtectedRoutes>
                  
                  }/>
              <Route path='/account/contact' element={
                  <ProtectedRoutes>
                    <ContactView />
                  </ProtectedRoutes>
                  
                  }/>
              <Route path='/account/contacts' element={
                  <ProtectedRoutes>
                    <ContactsView />
                  </ProtectedRoutes>
                  }/>
              <Route path='/account/project' element={
                  <ProtectedRoutes>
                    <ProjectView />
                  </ProtectedRoutes>
                  }/>
          </Routes>
        </AuthContextProvider>
    </div>
  );
}

export default App;
