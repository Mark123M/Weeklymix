import React, { useState } from 'react'
import {
    Flex,
    Image,
    Text,
    Box,
    Button,
  } from '@chakra-ui/react';
import "@fontsource/fira-sans"
import "@fontsource/roboto"
import {Users} from '../DummyData'

export default function ProfileCardMini() {
    const assetsFolder = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <Flex
            flexDirection='column'
            bg = '#2d2e39'
            w = '160px'
            h = '290px'
            ml = {['0px','0px',5,5]}
            borderRadius = '10px 10px 10px 10px'
            alignItems='center'
        >
           {/* <Box h = '100%' alignItems='center' mr = {7} >
                <Image src='assets/guitar.jfif' objectFit='cover' minW = '400px' maxW = '400px' h = '150px' borderRadius = '20px 20px 0px 0px' marginBottom={4}/>
            </Box> */}

           
            <Box>
                <Image src={assetsFolder+Users.filter(u=>u.id === 2)[0].profilePicture} objectFit = 'cover' minW = '160px' maxW = '160px' h = '160px' borderRadius = '5px' border = '3px solid white'  />
            </Box>

            <Flex flexDirection='column' ml = {10} mt = {3} align = 'left' w = '100%'>
                <Text
                    fontSize= '2xl'
                    fontFamily =  {`'fira sans', sans-serif`} 
                    fontWeight = '500'  
                >
                    MetalMark
                </Text>

                <Text
                    fontSize= {['sm','sm','sm','sm']}
                    fontFamily =  {`'roboto', sans-serif`} 
                    fontWeight = '500' 
                    color = '#8E8F90'
                >
                    Ontario, Canada
                </Text>
                <Button colorScheme='orange' variant='solid' w = '120px' mt = {4} size = 'sm'>
                    Follow
                </Button>
            </Flex>
           
            

        

        </Flex>
    )
}
