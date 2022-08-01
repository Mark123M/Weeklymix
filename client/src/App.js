import React from 'react';
import {
  ChakraProvider, CSSReset,
} from '@chakra-ui/react';

import Home from './pages/Home'
import Discussions from './pages/Discussions'
import Profile from './pages/Profile';
import Login_and_register from './pages/Login_and_register';

import {
  HashRouter, //using hashrouter for client side routing
  Routes,
  Route,
} from "react-router-dom";

import { myTheme } from './styles/theme';

function App() {
  return (
    <ChakraProvider theme={myTheme}>
      <HashRouter>
        <Routes>
          <Route path="/" element = {<Home />}></Route>
          <Route path="/discussions" element = {<Discussions />}></Route>
          <Route path="/profile/:username" element = {<Profile />}></Route>
          <Route path="/login" element = {<Login_and_register />}></Route>
          <Route path="/register" element = {<Login_and_register />}></Route>
          
        </Routes>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
