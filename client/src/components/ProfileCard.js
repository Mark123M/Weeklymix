import React, { useState, useEffect } from 'react'
import {
    Flex,
    Image,
    Text,
    Box,
    Icon,
    Button,
    Wrap,
  } from '@chakra-ui/react';
import "@fontsource/fira-sans"
import "@fontsource/roboto"
import {Users} from '../DummyData'
import {BiImageAdd} from 'react-icons/bi'
import { FaFlagUsa, FaYoutube, FaSpotify, FaSoundcloud, FaBandcamp, FaDiscord, FaReddit} from 'react-icons/fa';
import SocialLink from './SocialLink';
import axios from 'axios'


export default function ProfileCard({username}) {
    const [user, setUser] = useState('')
    useEffect(() =>{
        const getUser = async () =>{
            const res = await axios.get(`/users/u/${username}`)
            console.log(res)
            setUser(res.data)
        }
        getUser()
    },[])


    const assetsFolder = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <Flex
            flexDirection='column'
            bg = '#24262D'
            w = {['400px','400px','400px','400px']}
            ml = {['0px','0px',5,5]}
            mt = {2}
            borderRadius = '10px 10px 10px 10px'
            height = 'fit-content'
        >

            <Flex bg = '#2d97e5' minW = '400px' maxW = '400px' h = '140px' borderRadius = '10px 10px 0px 0px' >
                <Box>
                    <Image src={user.profilePic || assetsFolder+"users/defaultAvatar.jpg"} objectFit = 'cover' minW = '120px' maxW = '120px' h = '120px' borderRadius = '5px' ml = {8} mt = {16} outline = '4px solid white'  />
                </Box>
                <Icon as = {BiImageAdd} w = {12} h = {12} color = '#FFFFFF' ml='auto' mt = 'auto' mr = {2} mb = {2}/>
            </Flex>
            <Text
                fontSize= '2xl'
                fontFamily =  {`'fira sans', sans-serif`} 
                fontWeight = '500' 
                ml = {7}
                mt = {14}   
            >
                {user.username}
            </Text>

            <Flex>
                <Icon as = {FaFlagUsa} w = {5} h = {5} ml = {7}/>
                <Text
                    fontSize= {['xs','xs','sm','sm']}
                    fontFamily =  {`'roboto', sans-serif`} 
                    fontWeight = '500' 
                    ml = {3}
                    color = '#8E8F90'
                >
                    {user.location}
                </Text>
                <Button colorScheme='orange' variant='solid' ml = 'auto' mr = {5} mt = '-24px'  >
                    Follow
                </Button>

            </Flex>
            
            <Wrap spacing = '10px' ml = {7} mt={5}>
                <SocialLink link = 'https://www.youtube.com/channel/UCNQe-ij8K8JgyuJFiP_tWOA' text = 'Youtube' icon = {FaYoutube} iconColor = '#ff0000' linkWidth='95px'/>
                <SocialLink link = 'https://soundcloud.com/aevyan' text = 'Soundcloud' icon = {FaSoundcloud} iconColor = '#ff5500' linkWidth='120px'/>
                <SocialLink link = 'https://open.spotify.com/artist/699OTQXzgjhIYAHMy9RyPD' text = 'Spotify' icon = {FaSpotify} iconColor = '#1ed760' linkWidth='95px'/>
                <SocialLink link = 'https://www.reddit.com/user/avyan1' text = 'Reddit' icon = {FaReddit} iconColor = '#ff4500' linkWidth='90px'/>
            </Wrap>

            <Text
                fontSize= {['sm','sm','md','md']}
                fontFamily =  {`'roboto', sans-serif`} 
                fontWeight = '500' 
                ml = {7}
                mt = {3}
                mr = {4}
                mb = {5}
                color = 'white'

            >
                {user.description}

            </Text>


        </Flex>
    )
}
