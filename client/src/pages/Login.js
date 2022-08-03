import React, {useState, useRef, useContext} from 'react'

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
import axios from 'axios'
import { UserContext } from '../UserContext';

export default function Login(){
    
    const{value, setValue} = useContext(UserContext)
    console.log(value)


    const emailRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(`logging in: ${email} ${password}`)

        axios.post('/auth/login', {
            email: email,
            password: password
        })
        .then(function (response) {
            setValue(response.data)
            console.log(response);
        })
        .catch(function(error){
            console.log(error)
        })
        setEmail('')
        setPassword('')
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
                height= '370px'
                w = '400px'
                padding= '20px'
                backgroundColor= 'blackAlpha.300'
                borderRadius= '10px'

            >
                <form onSubmit={handleLogin}>
                    <FormLabel fontSize = 'md' color = 'gray.400'>Email:</FormLabel>
                    <Input onChange={(e) => setEmail(e.target.value)} value = {email} type = 'email' required ref = {emailRef} height = '45px' fontSize = 'md'/>
                    
                    <FormLabel fontSize = 'md' color = 'gray.400'  mt = {4}>Password:</FormLabel>
                    <Input onChange={(e) => setPassword(e.target.value)} value = {password} type = 'password' required height = '45px' fontSize = 'md'/>
                    <Button variant = 'solid' type = 'submit' colorScheme='green' mt = {8}>Log In</Button>
                    <Text fontSize='sm' mt = {2} color = '#707070'>Forgot your password? too bad!!!</Text>

                    <Link to = "/register">
                        <Button variant = 'link' colorScheme='green' mt = 'auto'>
                            Create a new account
                        </Button>
                    </Link>
                       
                </form>
                
            </Flex>

        </Flex>
    )
}