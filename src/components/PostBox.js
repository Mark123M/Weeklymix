import React from 'react'
import {useContext } from 'react';
import {
    Flex,
    Image,
    Icon,
    Input,
  } from '@chakra-ui/react';
import "@fontsource/fira-sans"
import "@fontsource/roboto"
import {FaImage, FaFileAudio} from 'react-icons/fa'
import { UserContext } from '../UserContext';

const ImageIcon = () =>{
    return(
        <Icon as = {FaImage} w = {7} h = {7} color = 'gray.300' alignSelf='center' display = {['none','none','inline','inline']}>
        </Icon>
    )
}

const AudioIcon = () =>{
    return(
        <Icon as = {FaFileAudio} w = {7} h = {7} color = 'gray.300' ml = {3} mr = {10} alignSelf='center' display = {['none','none','inline','inline']}>
        </Icon>
    )
}

export default function PostBox({createNewPost}){
    const assetsFolder = process.env.REACT_APP_PUBLIC_FOLDER
    const{value: user, setValue: setUser} = useContext(UserContext)

    return(
        <Flex 
            cursor = 'pointer'
            mt = {8}
            mb = {4}
            ml = {4}
            mr = {8}
            fontSize = 'xl' 
            flexDirection='column'
            borderRadius = '10px'
            border= '2px solid #9AE6B4'
            bg = '#24262d'
            h = '70px'
            onClick={createNewPost}
        > 
            <Flex flexDirection='row'  h = '100%'>
                <Flex display = {['none', 'none','inline','inline']} alignSelf = 'center'>
                    <Image src={(user!= null&&user.profilePic) || assetsFolder+"users/defaultAvatar.jpg"} objectFit = 'cover' minW = {['50px','50px','50px','50px']} maxW = {['50px','50px','50px','50px']} h = {['50px','50px','50px','50px']} borderRadius = '50%' ml = {5}/>
                </Flex>

               
                <Input cursor = 'pointer' alignSelf='center' ml = {5} mr = {5} h = '45px' fontSize = 'lg' placeholder='Create a new post...' color='white' bg = 'blackAlpha.400'></Input>
                <ImageIcon/>
                <AudioIcon/>
            </Flex>



        </Flex>

    )
}