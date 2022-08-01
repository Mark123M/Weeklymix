import React from 'react'
import {
    Flex,
    Center,
    Image,
    Box,
    Button,
    IconButton,
    Text,
    calc
  } from '@chakra-ui/react';
import {useState} from 'react'
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/poppins"
import "@fontsource/fira-sans"
import "@fontsource/open-sans"
import Navbar from '../components/Navbar'

export default function Home(){
    return(
        <Box 
            overflowX='hidden' 
            bg = '#1b1c22' 
            position = 'fixed' 
            width = '100%' 
            height = '100%'  
            backgroundImage='https://i.imgur.com/8wxV3Hr.png'  
            backgroundSize='100vh' 
            backgroundRepeat='no-repeat' 
            backgroundPosition='bottom right'
        >

            <Navbar/>

            <Flex flexDirection={['column', 'column', 'row', 'row']} justifyContent={[null, null, 'center', 'center']} alignItems={['center','center','flex-start','flex-start']} >
                <Flex flexDirection='column'  w = {['90vw','90vw','50vw','50vw']}>
                    <Text 
                        fontFamily={`'roboto',san-serif`} 
                        fontWeight = '700' 
                        fontSize={[ 'xl' ,'2xl', '4xl', '4xl' ]}
                        mt = '7vh' 
                       
                    >
                       Home of challenges for producers
                    </Text>
                    <Text 
                        fontFamily={`'open sans',san-serif`} 
                        fontWeight = '500' 
                        fontSize={[ 'md' ,'md', 'xl', 'xl' ]}
                        mt = '2vh' 
                    >
                        The best place for musicians to create and improve. A new challenge opens every week with a unique theme or idea.
                        Create your best work, step out of your comfort zone, and discuss with the other artists.
                    </Text> 
                    <Flex>
                        <Button colorScheme='orange' variant='solid' fontSize='1.2rem' h = '50px' mt = {6} >
                            Learn More 
                        </Button>
                    </Flex>
                </Flex>
                <Flex 
                    w = {['90vw','90vw','34vw','34vw']}
                    flexDirection='column'  
                    fontFamily={`'roboto',san-serif`} 
                    fontWeight = '700' 
                    fontSize={[ 'md' ,'md', '3xl', '3xl' ]}
                    mt = '7vh'
                >
                    <Text ml = {20}>
                        356 registered musicians
                    </Text>
                    <Text ml = {20}>
                        5 challenges
                    </Text>
                    <Text ml = {20}>
                        56 track submissions
                    </Text>
                    <Text>
                    </Text>
                </Flex>
                
            </Flex> 
            <Flex flexDirection='column' alignItems='center' mt = {10} >
                <Flex flexDirection='row'>
                    <Text>
                        Featured Tracks
                    </Text>
                </Flex>

            </Flex>

        </Box>
    )
}