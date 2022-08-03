import React, {useState} from 'react';
import {
  ChakraProvider, CSSReset,
} from '@chakra-ui/react';

import Home from './pages/Home'
import Discussions from './pages/Discussions'
import Profile from './pages/Profile';
import Login from './pages/Login'
import Register from './pages/Register'

import {
  HashRouter, //using hashrouter for client side routing
  Routes,
  Route,
} from "react-router-dom";

import { myTheme } from './styles/theme';
import { UserContext } from './UserContext';

function App() {
  const[value, setValue] = useState('hello from context')

  return (
    <UserContext.Provider value = {{value, setValue}}>
      <ChakraProvider theme={myTheme}>
        <HashRouter>
          <Routes>
            <Route path="/" element = {<Home />}></Route>
            <Route path="/discussions" element = {<Discussions />}></Route>
            <Route path="/profile/:username" element = {<Profile />}></Route>
            <Route path="/login" element = {<Login />}></Route>
            <Route path="/register" element = {<Register />}></Route>
          </Routes>
        </HashRouter>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default App;
