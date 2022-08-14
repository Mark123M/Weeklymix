import React, {useState, useRef, useEffect} from 'react'
import {
    Flex,
    Image,
    Box,
    Button,
    Text,
    Input,
    FormLabel,
  } from '@chakra-ui/react';
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/fira-sans"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Register(){
    const emailRef = useRef()
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        axios.post('/auth/register', {
            username: username,
            email: email,
            password: password
        })
        .then((res)=>{
            navigate('/login', { replace: true })
            console.log(res);
        })

        setUsername('')
        setEmail('')
        setPassword('')
        console.log(`user registered ${username} ${email} ${password}`)
    }

    return(
        <Flex 
            overflow='auto' 
            bg = '#1b1c22' 
            position = 'fixed' 
            width = '100%' 
            height = '100%'  
            backgroundImage=''  
            backgroundSize='100vh' 
            backgroundRepeat='no-repeat' 
            backgroundPosition='bottom right'
            alignItems='center'
            justifyContent= 'center'
            flexDirection={['column', 'column', 'row', 'row']}
        >
            <Flex flexDirection = 'column'>
                <Box>
                    <Image src = 'assets/sitelogo.png'/>
                </Box>
                <Text 
                    fontFamily={`'roboto',san-serif`} 
                    fontWeight = '600' 
                    fontSize={[ 'xl' ,'2xl', '3xl', '3xl' ]}
                    ml = {3}
                >
                    The best place for musicians to
                </Text>

                <Flex ml = {3}>
                    <Text 
                        fontFamily={`'roboto',san-serif`} 
                        fontWeight = '600' 
                        fontSize={[ 'xl' ,'2xl', '3xl', '3xl' ]}
                        color = 'orange.300'
                        textDecoration= 'underline dotted #f6ad55 5px'
                        textUnderlineOffset={5}
                    >
                        create
                    </Text>
                    <Text
                        fontFamily={`'roboto',san-serif`} 
                        fontWeight = '600' 
                        fontSize={[ 'xl' ,'2xl', '3xl', '3xl' ]}
                        marginLeft = '0.75rem'
                    >
                        and  
                    </Text>
                    <Text
                        fontFamily={`'roboto',san-serif`} 
                        fontWeight = '600' 
                        fontSize={[ 'xl' ,'2xl', '3xl', '3xl' ]}
                        marginLeft = '0.75rem'
                        color = 'purple.300'
                        textDecoration= 'underline dotted #b794f4 5px'
                        textUnderlineOffset={5}
                    >
                        improve  
                    </Text>
                </Flex>
            </Flex> 
            
            <Flex 
                ml = {[0,0,10, 24]} 
                flexDirection = 'column'
                height= '450px'
                w = '400px'
                padding= '20px'
                backgroundColor= 'blackAlpha.300'
                borderRadius= '10px'

            >
                <form onSubmit={handleRegister}>
                    <FormLabel fontSize = 'md' color = 'gray.400'>Username:</FormLabel>
                    <Input onChange={(e) => setUsername(e.target.value)} value = {username} required height = '45px' fontSize = 'md'/>

                    <FormLabel fontSize = 'md' color = 'gray.400' mt = {4}>Email:</FormLabel>
                    <Input onChange={(e) => setEmail(e.target.value)} value = {email} type = 'email' required ref = {emailRef} height = '45px' fontSize = 'md'/>
                    
                    <FormLabel fontSize = 'md' color = 'gray.400' mt = {4} >Password:</FormLabel>
                    <Input onChange={(e) => setPassword(e.target.value)} value = {password} type = 'password' required height = '45px' fontSize = 'md'/>


                    <Button variant = 'solid' type = 'submit' colorScheme='green' mt = {8}>Register</Button>
                    <Text fontSize='sm' mt = {2} color = '#707070'>don't forget your password!</Text>
                    <Link to = "/login">
                        <Button variant = 'link' colorScheme='green' mt = 'auto'>
                            Log in to existing account
                        </Button>
                    </Link>
                </form>
                
            </Flex>

        </Flex>
    )
}