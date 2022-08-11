import React, {useState, useRef, useContext} from 'react'

import {
    Flex,
    Image,
    Box,
    Button,
    Text,
    Input,
    FormLabel,
    Alert,
    AlertIcon,
  } from '@chakra-ui/react';
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/fira-sans"
import {Link} from 'react-router-dom' 
import axios from 'axios'
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

export default function Login(){
    
    const{value: user, setValue: setUser} = useContext(UserContext)
    console.log(user)


    const emailRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    console.log(email, password)

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(`logging in: ${email} ${password}`)

        axios.post('/auth/login', {
            email: email,
            password: password
        })
        .then((res)=>{
            setUser(res.data)
            navigate('/', { replace: true })
            console.log(res);
        })
        .catch(function(error){
            setError(true)
            console.log(error, 'The username and password do not match.')
        })
        setEmail('')
        setPassword('')
    }

    const handleEmailChange = (e) =>{
        setEmail(e.target.value)
        setError(false)
    }
    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
        setError(false)
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
                
                w = '400px'
                padding= '20px'
                backgroundColor= 'blackAlpha.300'
                borderRadius= '10px'

            >   
                <form onSubmit={handleLogin}>
                    <Flex mb = {5} flexDirection = 'row' display = {error?'inline-block':'none'}>   
                        <Alert status='error' variant='solid' bg = 'red.300'>
                            <AlertIcon />
                            Username and password do not match.
                        </Alert>
                    </Flex>
                    

                    <FormLabel fontSize = 'md' color = 'gray.400'>Email:</FormLabel>
                    <Input onChange={handleEmailChange} value = {email} type = 'email' required ref = {emailRef} height = '45px' fontSize = 'md'/>
                    
                    <FormLabel fontSize = 'md' color = 'gray.400'  mt = {4}>Password:</FormLabel>
                    <Input onChange={handlePasswordChange} value = {password} type = 'password' required height = '45px' fontSize = 'md'/>
                    <Button variant = 'solid' type = 'submit' colorScheme='green' mt = {8}>Log In</Button>
                    <Text fontSize='sm' mt = {2} color = '#707070'>Forgot your password? too bad!!!</Text>

                    <Link to = "/register">
                        <Button variant = 'link' colorScheme='green' mt = 'auto' paddingBottom={5}>
                            Create a new account
                        </Button>
                    </Link>
                       
                </form>
                
            </Flex>

        </Flex>
    )
}