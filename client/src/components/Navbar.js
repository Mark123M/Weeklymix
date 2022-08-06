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
const assetsFolder = process.env.REACT_APP_PUBLIC_FOLDER


const UserMenu = ({user}) =>{
    if(!user) return null
    return(
        <Flex h = '55px' bg = 'whiteAlpha.200' alignSelf='center' border='2px none gray' borderRadius = '5px' justifyContent='center' alignItems = 'center'>
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
    )
}

export default function Navbar(){
     //responsive padding sizes
    const fontW = '700'
    const navColor = '#35363D'
    const{value: user, setValue: setUser} = useContext(UserContext)

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
            <Flex background = {navColor} w = '100vw' h = '70px'  outline = '3px solid' outlineColor='orange.200'  >
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

                    <UserMenu user = {user}/>
                    
                    
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