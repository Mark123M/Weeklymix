import React, {useState, useContext} from 'react'
import {
    Flex,
    Image,
    Text,
    Center
  } from '@chakra-ui/react';
import {Link} from 'react-router-dom'
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/fira-sans"
import {HamburgerIcon, CloseIcon, ChevronDownIcon} from '@chakra-ui/icons'

import { UserContext } from '../UserContext';

export default function UserMenu(){
    const assetsFolder = process.env.REACT_APP_PUBLIC_FOLDER
    const [menuOpened, setMenuOpened] = useState(false)
    const [menuMargin, setMenuMargin] = useState(0)

    const{value: user, setValue: setUser} = useContext(UserContext)

    const handleClick = () =>{
        console.log('menu')
        setMenuOpened(!menuOpened)
        setMenuMargin(menuMargin===0?'8.7rem':0)
    }
    const handleLogout = () =>{
        console.log('logged out')
        setUser(null)
    }
    
    if(!user) return null
    return(
        <Flex flexDirection='column' alignSelf='center' mt = {menuMargin}>
            <Flex 
                h = '55px' 
                bg = 'whiteAlpha.200' 
                border='2px none gray' 
                borderRadius = '5px' 
                justifyContent='center' 
                alignItems = 'center' 
                cursor = 'pointer'
                onClick={handleClick}
            >
                <Image ml = {2} src={user.profilePic || assetsFolder+"users/defaultAvatar.jpg"} objectFit = 'cover' minW = '40px' maxW = '40px' h = '40px' borderRadius = '50%'/>
                <Flex flexDirection = 'column' mr = {3} display = {['none','none','none','inline']}>
                    <Text
                        fontSize= {['md', 'md', '1.14rem', '1.14rem']}
                        fontFamily =  {`'fira sans', sans-serif`} 
                        fontWeight = '500' 
                        ml = {2}
                    >   
                        {user.username}
                    </Text>
                    <Text
                        fontSize= 'xs'
                        fontFamily =  {`'roboto', sans-serif`} 
                        fontWeight = '500' 
                        ml = {2}
                        color = '#A2A4A4'
                    >
                        {user.followers.length} Followers
                    </Text>
                </Flex>
                <ChevronDownIcon w = {6} h = {6} />
            </Flex>
            <Flex flexDirection='column' fontSize='sm' bg = '#1F1F1F' display = {menuOpened?'inline':'none'}>
                <Link to ={`/profile/${user.username}`}>
                    <Center h = '35px' borderStyle = 'none none none solid' borderWidth = '7px' borderColor = '#f6ad55'>
                        My Profile
                    </Center>
                </Link>
                <Link to ={`/profile/${user.username}/edit`}>
                    <Center h = '35px' borderStyle = 'none none none solid' borderWidth = '7px' borderColor = '#f6ad55'>
                        Edit Profile
                    </Center>
                </Link>
                <Link to ={`/`}>
                    <Center h = '35px' borderStyle = 'none none none solid' borderWidth = '7px' borderColor = '#f6ad55'>
                        Inbox
                    </Center>
                </Link>
                <Link to ={`/login`} onClick = {handleLogout}>
                    <Center h = '35px' borderStyle = 'none none none solid' borderWidth = '7px' borderColor = '#f6ad55'>
                        Logout
                    </Center>
                </Link>
            </Flex>
            
        </Flex>
    )
}