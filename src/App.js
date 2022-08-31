import React, {useState} from "react";
import {
  ChakraProvider, CSSReset, propNames,
} from "@chakra-ui/react";

import Home from "./pages/Home"
import Discussions from "./pages/Discussions"
import Profile from "./pages/Profile";
import Login from "./pages/Login"
import Register from "./pages/Register"
import NewPost from "./pages/NewPost"
import EditPost from "./pages/EditPost"
import EditProfile from "./pages/EditProfile"
import ComingSoon from "./pages/ComingSoon"
import Users from "./pages/Users"
import { ColorModeSwitcher } from "./ColorModeSwitcher";

import {
  HashRouter, //using hashrouter for client side routing
  Routes,
  Route,
} from "react-router-dom";

import { myTheme } from "./styles/theme";
import { UserContext } from "./UserContext";

function App() {
  const[user, setUser] = useState(null)

  return (
    <UserContext.Provider value = {{value: user, setValue: setUser}}>
      <ChakraProvider theme={myTheme}>
        <ColorModeSwitcher/>
        <HashRouter>
          <Routes>
            <Route path="/" element = {<Home />}></Route>
            
            <Route path="/discussions" element = {<Discussions />}></Route>
            <Route path="/discussions/new-post" element = {<NewPost/>}></Route>
            <Route path="/discussions/:id/edit" element = {<EditPost/>}></Route>

            <Route path = "/challenge" element = {<ComingSoon/>}></Route>
            <Route path = "/users" element = {<Users/>}></Route>
            <Route path = "/about" element = {<ComingSoon/>}></Route>

            <Route path="/profile/:username" element = {<Profile/>}></Route>
            <Route path="/profile/:name/edit" element = {<EditProfile/>}></Route>

            <Route path="/login" element = {<Login />}></Route>
            <Route path="/register" element = {<Register />}></Route>
          </Routes>
        </HashRouter>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default App;
