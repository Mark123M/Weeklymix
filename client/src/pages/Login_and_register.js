import React, {useState} from 'react'
import {
    Flex,
    Image,
    Box,
    Button,
    Text,
    Input,
  } from '@chakra-ui/react';
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/poppins"
import "@fontsource/fira-sans"
import "@fontsource/open-sans"

export default function Login_and_register(){
    const [formState, setFormState] = useState('login')

    const handleClick = () =>{
        setFormState(formState === 'login'?'register':'login')
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
                height= '300px'
                w = '400px'
                padding= '20px'
                backgroundColor= 'blackAlpha.300'
                borderRadius= '10px'
                display = {formState==='login'?'flex':'none'}

            >
                <Input placeholder="Email" height = '45px' fontSize = 'md'/>
                <Input placeholder="Password" height = '45px' fontSize = 'md' mt = {3}/>
                <Button variant = 'solid' colorScheme='green' mt = {8}>Log In</Button>
                <Text fontSize='sm' mt = {2} color = '#707070'>Forgot your password? too bad!!!</Text>
                <Button variant = 'link' colorScheme='green' mt = 'auto' onClick={handleClick}>Create a new account</Button>
            </Flex>

            <Flex 
                ml = {[0,0,10, 24]} 
                flexDirection = 'column'
                height= '360px'
                w = '400px'
                padding= '20px'
                backgroundColor= 'blackAlpha.300'
                borderRadius= '10px'
                display = {formState==='register'?'flex':'none'}

            >
                <Input placeholder="Username" height = '45px' fontSize = 'md'/>
                <Input placeholder="Email" height = '45px' fontSize = 'md' mt = {3}/>
                <Input placeholder="Password" height = '45px' fontSize = 'md' mt = {3}/>
                <Button variant = 'solid' colorScheme='green' mt = {8}>Register</Button>
                <Text fontSize='sm' mt = {2} color = '#707070'>Don't forget your password!</Text>
                <Button variant = 'link' colorScheme='green' mt = 'auto' onClick={handleClick}>Log in to account</Button>
            </Flex>


        </Flex>
    )
}