import React from 'react'
import {
    Flex,
    Center,
    Image,
    Box,
    Button,
    IconButton,
    Icon,
    Text,
    Menu, MenuButton,MenuList, MenuItem
  } from '@chakra-ui/react';
import {FaDiscord, FaReddit, FaInstagram} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import NavItem from './NavbarLink'
import {useState, useContext} from 'react'
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/fira-sans"
import {HamburgerIcon, CloseIcon, ChevronDownIcon} from '@chakra-ui/icons'

import { UserContext } from '../UserContext';
import UserMenu from './UserMenu';




export default function Navbar(){
     //responsive padding sizes
    const fontW = '700'
    const navColor = '#35363D'
    const{value: user, setValue: setUser} = useContext(UserContext)
    const assetsFolder = process.env.REACT_APP_PUBLIC_FOLDER

    const [display, setDisplay] = useState('none')

    const centerStyle = {
        paddingLeft: 10,
        paddingRight: 10,
        height: '80px',
        fontFamily:`'Raleway', sans-serif`,
        fontSize: '1.1rem',
        fontWeight: fontW,
        
    }

    const handleMenuClick = () =>{
        console.log('menu clicked')
        setDisplay(display === 'none'? 'flex' : 'none')
    }

    return(
        <Box zIndex='1' position = 'fixed'>
            <Flex background = {navColor} w = '100vw' h = '73px'  borderStyle = 'none none solid none' borderWidth='2px' borderColor='orange.300'  >
                <Flex marginRight = 'auto' ml = {8}>
                    <Link to = '/'>
                        <Flex>
                                <Image src='https://i.imgur.com/JWiCcmR.png' alt = 'WeeklyMix Logo' maxW = '220px'  />
                        </Flex>
                    </Link>

                    <Flex display = {['none', 'none', 'none', 'flex'] } ml = {6}>
                        <Link to = '/discussions'>
                            <NavItem text = 'Discussions'/>
                        </Link>
                        <NavItem text = 'Challenge'/>
                        <NavItem text = 'Users'/>
                        <NavItem text = 'About'/>
                    </Flex>
                    
                </Flex>
                
                
                <Flex display = {['none', 'none', 'none', 'flex'] } flexDirection = 'row' justifyContent='center' ml = 'auto' mr = {12}>
                    
                    <Icon as={FaDiscord} alignSelf = 'center' mr = {5} w = {7} h = {7}/>
                    <Icon as={FaReddit} alignSelf = 'center' mr = {5} w = {7} h = {7}/>

                    <Flex style = {centerStyle} display = {user?'none':"initial"}>
                        <Link to = '/login'>
                            <Button colorScheme='teal' variant='outline' fontSize='1.1rem' h = '45px' mt = {4}>
                                Login/Register
                            </Button>
                        </Link>
                    </Flex>

                    <UserMenu/>
                    
                    
                </Flex>
                <Flex justifyContent='flex-end' objectFit='fill' flexGrow='1' display = {['flex', 'flex', 'flex', 'none']}>
                    <IconButton
                        size="lg"
                        icon={<HamburgerIcon/>}
                        marginRight = '7vw'
                        onClick = {handleMenuClick}
                        alignSelf = 'center'
                        colorScheme='teal'
                    />
                </Flex>
                
            </Flex>

            <Flex display={['flex','flex','flex','none']} background = {navColor}>
                <Flex flexDirection='column' align = 'center' w = '100vw' display = {display} >
                    
                    <Link to = '/discussions'>
                        <NavItem text = 'Discussions'/>
                    </Link>
                    <NavItem text = 'Challenge'/>
                    <NavItem text = 'Users'/>
                    <NavItem text = 'About'/>

                    <Flex style = {centerStyle} display = {user?'none':'inline'}>
                        <Link to = '/login'>
                            <Button colorScheme='teal' variant='outline' fontSize='1.1rem' h = '45px'>
                                Login/Register
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}