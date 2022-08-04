import React from 'react'
import { useState, useEffect } from 'react';
import {
    Flex,
    Image,
    Box,
    Icon,
    Button,
    Input,
  } from '@chakra-ui/react';
import "@fontsource/fira-sans"
import "@fontsource/roboto"

import {Link} from 'react-router-dom'
import {FaImage, FaFileAudio} from 'react-icons/fa'

const ImageIcon = () =>{
    return(
        <Icon as = {FaImage} w = {10} h = {10} color = 'gray.300' alignSelf='center'>
        </Icon>
    )
}

const AudioIcon = () =>{
    return(
        <Icon as = {FaFileAudio} w = {9} h = {9} color = 'gray.300' ml = {3} mr = {10} alignSelf='center'>
        </Icon>
    )
}

export default function PostBox({createNewPost}){
    const assetsFolder = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({})

    return(
        <Flex 
            cursor = 'pointer'
            mt = {5}
            mb = {8}
            ml = {4}
            mr = {6}
            fontSize = 'xl' 
            flexDirection='column'
            borderRadius = '10px'
            border= '3px solid #9AE6B4'
            bg = '#212229'
            h = '80px'
            onClick={createNewPost}
        > 
            <Flex flexDirection='row'  h = '100%'>
                <Box display = {['none', 'none','inline','inline']} alignSelf = 'center'>
                    <Link to = {`/profile/${user.username}`}>
                        <Image src={user.profilePic || assetsFolder+"users/defaultAvatar.jpg"} objectFit = 'cover' minW = {['50px','50px','60px','60px']} maxW = {['50px','50px','60px','60px']} h = {['50px','50px','60px','60px']} borderRadius = '50%' ml = {5}/>
                    </Link>
                </Box>

                <Flex flexDirection = 'column'>
                    <Button
                        variant = 'link'
                        fontSize= {['md', 'md', 'lg', 'lg']}
                        fontFamily =  {`'roboto', sans-serif`} 
                        fontWeight = '500' 
                        ml = {4}
                    >   
                        <Link to = {`/profile/${user.username}`}>
                            {user.username}
                        </Link>
                    </Button>
                </Flex>
                <Input cursor = 'pointer' alignSelf='center' ml = '-25px' mr = {5} h = '45px' fontSize = 'lg' placeholder='Create a new post...' color='white' bg = 'blackAlpha.400'></Input>
                <ImageIcon/>
                <AudioIcon/>
            </Flex>



        </Flex>

    )
}