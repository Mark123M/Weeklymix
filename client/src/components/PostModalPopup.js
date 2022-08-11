import React, {useState, useContext} from 'react'
import {
    Flex,
    Box,
    Button,
    Text,
    Input,
    FormLabel,
    Center,
    IconButton,
    Textarea,
    Select
  } from '@chakra-ui/react';
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/fira-sans"
import {Link} from 'react-router-dom' 
import axios from 'axios'
import { UserContext } from '../UserContext';
import {CloseIcon, HamburgerIcon} from '@chakra-ui/icons'

export default function PostModalPopup({isOpened, setPostFormDisplay, getAllPosts}) {
    
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [postType, setPostType] = useState('')
    const{value: user, setValue: setUser} = useContext(UserContext)

    console.log(title,desc,postType)

    const submitNewPost = (e) =>{
        e.preventDefault()
        axios.post('/posts', {
            userId: user._id,
            postType: postType,
            title: title,
            description: desc,
        })
        .then((res)=>{
            console.log(res)
        })
        setTitle('')
        setDesc('')
        setPostType('')
        setPostFormDisplay(false)
        getAllPosts()
    }

    return (
        <Center
            position = 'fixed'
         
            w = '100%'
            h = '100%'
            top = '0'
            bottom='0'
            left = '0'
            right = '0'
            bg = 'rgba(0,0,0,0.7)'
            zIndex = '2'
            display = {isOpened?'flex':'none'}
        >
             <Flex
                alignSelf = 'center'
                justifySelf='center'
                flexDirection = 'column'
                height= '600px'
                w = '500px'
                padding= '20px'
                backgroundColor= '#17171d'
                borderRadius= '10px'
                
            >   
                <Flex w = '100%' mb = {2} flexDirection = 'column'>
                    
                    <Flex 
                        fontFamily={`'roboto',san-serif`} 
                        fontWeight = '600' 
                        fontSize={[ 'lg' ,'xl', '2xl', '2xl' ]}
                        color = 'gray.300'
                        
                        borderStyle = 'none none solid none'
                        borderWidth = '1px'
                        alignSelf='center'
                        
                    > 
                        Create new post:
                    
                    </Flex>
                    <IconButton
                        size="lg"
                        colorScheme = 'white'
                        icon={<CloseIcon/>}
                        marginLeft = 'auto'
                        variant = 'ghost'
                        marginTop = '-40px'
                        onClick = {()=>setPostFormDisplay(false)}
                    />
                </Flex>
                
                <form onSubmit={submitNewPost}>
                    <FormLabel fontSize = 'md' color = 'gray.400'>Title:</FormLabel>
                    <Input value = {title} onChange = {(e)=>setTitle(e.target.value)}  required height = '45px' fontSize = 'md' bg = 'blackAlpha.400'/>
                    
                    <FormLabel fontSize = 'md' color = 'gray.400'  mt = {4}>Description:</FormLabel>
                    <Textarea resize = 'none' value = {desc} onChange = {(e)=>setDesc(e.target.value)} required height = '200px' fontSize = 'md' bg = 'blackAlpha.400'/>

                    <Select value = {postType} onChange = {(e)=>setPostType(e.target.value)} outline = 'solid 1px #5E5B5A' variant = 'filled' colorScheme = 'blue' required mt = {7}>
                        <option value=''>Select a channel</option>
                        <option value='Announcements'>Announcements</option>
                        <option value='Discussion'>Discussion</option>
                        <option value='Feedback'>Feedback</option>
                        <option value='Off topic'>Off topic</option>
                    </Select>


                    <Button variant = 'solid' type = 'submit' colorScheme='orange' mt = {8}>Create Post</Button>
                    <Text fontSize='sm' mt = {2} color = '#707070'>Forgot your password? too bad!!!</Text>
                </form> 
            </Flex>
        </Center>
    )
}
