import React,{useState, useEffect} from 'react'
import {
    Flex,
    Center,
    Image,
    Box,
    Button,
    IconButton,
    Text,
    Divider,
    Wrap
  } from '@chakra-ui/react';
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/poppins"
import "@fontsource/fira-sans"
import "@fontsource/open-sans"
import Navbar from '../components/Navbar'
import axios from 'axios'
import SpotifyCredentials from '../apiCredentials/SpotifyCredentials'
import ReactPlayer from 'react-player'
import { SongEmbed } from '../components/SongEmbed';
import { useNavigate } from 'react-router-dom';

export default function Home(){
   /* const spotify = SpotifyCredentials()
    const [token, setToken] = useState('')

    useEffect(()=>{
        
        axios('https://accounts.spotify.com/api/token', {
            headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        })
        .then(tokenResponse => { 
            console.log(tokenResponse.data.access_token)
            setToken(tokenResponse.data.access_token)
        })
    },[])  */
    const [userNum, setUserNum] = useState()
    const [postNum, setPostNum] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        const getUserNum = async()=>{
            const res = await axios.get('/users/')
            console.log(res.data.length)
            setUserNum(res.data.length)
        }
        const getPostNum = async()=>{
            const res = await axios.get('/posts/')
            console.log(res.data.length)
            setPostNum(res.data.length)
        }
        getUserNum()
        getPostNum()
    },[])

    return(
        <Flex
            overflowX='hidden'
            overflowY = 'auto'
            bg = '#1b1c22' 
            position = 'fixed' 
            width = '100%' 
            height = '100%'  
           // backgroundImage='https://i.imgur.com/8wxV3Hr.png'  
            backgroundSize='100vh' 
            backgroundRepeat='no-repeat' 
            backgroundPosition='bottom right'
        >

            <Navbar/>

            
            <Flex w = '100%'  alignItems = 'center' justifyContent = 'center' flexDirection = 'column'>
                <Image src={'https://res.cloudinary.com/dyrwb96jv/image/upload/v1661552813/h16sisfqu3xpnbkpzvi6.jpg'} objectFit = 'cover' minW = '180px' maxW = '180px' h = '180px' borderRadius = '50%' ml = {5}/>
                <Text fontFamily =  {`'open sans', sans-serif`} fontSize = '4xl' >
                    I'm still working on it! :)
                </Text>
            </Flex>

        </Flex>
    )
}