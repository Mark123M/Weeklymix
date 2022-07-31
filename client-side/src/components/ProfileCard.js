import React, { useState } from 'react'
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


export default function ProfileCard() {
    const assetsFolder = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <Flex
            flexDirection='column'
            bg = '#2d2e39'
            w = {['375px','375px','375px','375px']}
            ml = {['0px','0px',5,5]}
            mt = {2}
            borderRadius = '10px 10px 10px 10px'
            height = 'fit-content'
        >
                
           {/* <Box h = '100%' alignItems='center' mr = {7} >
                <Image src='assets/guitar.jfif' objectFit='cover' minW = '400px' maxW = '400px' h = '150px' borderRadius = '20px 20px 0px 0px' marginBottom={4}/>
            </Box> */}

            <Flex bg = '#2d97e5' minW = '375px' maxW = '375px' h = '140px' borderRadius = '10px 10px 0px 0px' >
                <Box>
                    <Image src={assetsFolder+Users.filter(u=>u.id === 1)[0].profilePicture} objectFit = 'cover' minW = '120px' maxW = '120px' h = '120px' borderRadius = '5px' ml = {8} mt = {16} outline = '4px solid white'  />
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
                MetalMark
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
                    Toronto, Ontario, Canada
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
                I’m a friendly 20 year old guy who loves to play the guitar. I recently got into metal music and fillter fillter fillter fillter fillter fillter fillter fillter fillter fillter fillter fillter fillter fillter fillter fillter fillter fillter fillter   fillter  fillter  fillter  fillter  fillter  fillter  fillter fillter  fillter fillter  fillter fillter  fillter fillter  fillter fillter  fillter 

            </Text>


        </Flex>
    )
}
