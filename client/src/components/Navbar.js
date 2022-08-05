import React from 'react'
import {
    Flex,
    Center,
    Image,
    Box,
    Button,
    IconButton,
    Icon,
  } from '@chakra-ui/react';
import {FaDiscord, FaReddit, FaInstagram} from 'react-icons/fa'
import {Link} from 'react-router-dom'


import NavItem from './NavbarLink'
import {useState} from 'react'
import "@fontsource/raleway"
import {HamburgerIcon, CloseIcon} from '@chakra-ui/icons'

export default function Navbar(){
     //responsive padding sizes
    const fontW = '700'
    const navColor = '#35363D'

    const [display, setDisplay] = useState('none')

    const centerStyle = {
        paddingLeft: 32,
        paddingRight: 32,
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
            <Flex background = {navColor} w = '100vw' h = '80px'  outline = '3px solid' outlineColor='orange.200' justifyContent='center' >
                <Link to = '/'>
                    <Flex paddingRight={[0,0,4,7]} >
                            <Image src='https://i.imgur.com/JWiCcmR.png' alt = 'WeeklyMix Logo' maxW = '250px'  />
                    </Flex>
                </Link>
                
                <Flex display = {['none', 'none', 'none', 'flex'] }>
                    
                    <Link to = '/discussions'>
                        <NavItem text = 'Discussions'/>
                    </Link>
                    <NavItem text = 'Challenge'/>
                    <NavItem text = 'Users'/>
                    <NavItem text = 'More'/>

                    <Icon as={FaDiscord} alignSelf = 'center' ml = {5} w = {8} h = {8}/>
                    <Icon as={FaReddit} alignSelf = 'center' ml = {5} w = {8} h = {8}/>
                    <Icon as={FaInstagram} alignSelf = 'center' ml = {5} w = {8} h = {8}/>
                    
                   
                    
                    <Center style = {centerStyle}>
                        <Link to = '/login'>
                            <Button colorScheme='teal' variant='outline' fontSize='1.1rem' h = '45px'>
                                Login/Register
                            </Button>
                        </Link>
                    </Center>
                    
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
                    <NavItem text = 'More'/>

                    <Center style = {centerStyle}>
                        <Link to = '/login'>
                            <Button colorScheme='teal' variant='outline' fontSize='1.1rem' h = '45px'>
                                Login/Register
                            </Button>
                        </Link>
                    </Center>
                </Flex>
            </Flex>
        </Box>
    )
}