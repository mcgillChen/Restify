import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



import Home from './pages/LandingPage';
import Login from './pages/LoginPage';
// import SignUpPage from './pages/SignUpPage';
import MyProperty from './pages/MyPropertyPage';
import CreateProp from './pages/CreatePropPage';
import MyReservationGuest from './pages/MyReservationPage';
import MyReservationHost from './pages/MyReservationPageHost';
import CreateReservationPage from './pages/CreateReservationPage';
import SignUpPage from './pages/SignUpPage';
import MyProfilePage from './pages/MyProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import EditProp from './pages/EditPropPage';
import ActivateProp from './pages/ActivatePropPage';
import DeleteProp from './pages/DeletePropPage'
import PropImage from './pages/PropImagePage';
import UserIcon from './pages/UserIconPage';

import { APIContext, useAPIContext } from './contexts/APIContexts';
import { useEffect, useState } from 'react';
import PropDetail from './pages/PropDetailPage';

function App() {

  // useEffect

  // const APIContext = useAPIContext();
  return (
  <APIContext.Provider value={useAPIContext()}>
    <BrowserRouter>
    
      <Routes>
        <Route path="/">
          <Route index element = {<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path='myprop' element={<MyProperty/>}/>
          {/* <Route path='createprop/:uid' element={CreateProp}/> */}
          <Route path='myresguest' element={<MyReservationGuest/>}/>
          <Route path='myreshost' element={<MyReservationHost/>}/>
          <Route path='createres' element={<CreateReservationPage/>}/>
          <Route path='createprop' element={<CreateProp/>}/>
          <Route path='myprofile' element={<MyProfilePage/>}/>
          <Route path='editprofile' element={<EditProfilePage/>}/>
          <Route path='editprop/:pid' element={<EditProp/>}/>
          <Route path='activateprop/:pid' element={<ActivateProp/>}/>
          <Route path='propdetail/:pid' element={<PropDetail/>}/>
          <Route path='deleteprop/:pid' element={<DeleteProp/>}/>
          <Route path='propimage/:pid' element={<PropImage/>}/>
          <Route path='usericon' element={<UserIcon/>}/>
          
          

        </Route>

      </Routes>


    </BrowserRouter>
   </APIContext.Provider>
  )

}

export default App;

