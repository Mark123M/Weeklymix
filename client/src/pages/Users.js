import React, { useState, useEffect} from 'react'
import {
    Flex,
    Box,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Wrap,
    Input,
    Icon,
    Button,
    Center,
    Spinner,
    Text
  } from '@chakra-ui/react';
import "@fontsource/fira-sans"
import "@fontsource/roboto"
import Navbar from '../components/Navbar'
import ProfileCard from '../components/ProfileCard';
import Post from '../components/Post'
import ProfileCardMini from '../components/ProfileCardMini';
import axios from "axios"
import {useParams} from "react-router"
import {GiPerspectiveDiceSixFacesOne} from 'react-icons/gi'
import {ImDice} from 'react-icons/im'

const UserFollowers = () =>{
   
}

export default function Profile() {
    const {username} = useParams()
    const [users, setUsers] = useState([])
    const [userIndex, setUserIndex] = useState(10)
    const [search, setSearch] = useState()

    useEffect(()=>{
        const getUsers = async() =>{
            const res = await axios.get(`/users/`)
            setUsers(res.data)
        }
        getUsers()
    }, [])

    useEffect(()=>{
        console.log('followers: ',users)
    }, [users])
    
 
       
    

    

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    const handleScroll = async (e) =>{
        console.log('scrolling', e.target.scrollHeight - e.target.scrollTop, e.target.clientHeight)
        if(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <= 50 ){ //tolerance value for how far user scrolls down to load posts
            //alert('youve hit bottom')
            await delay(1000) //allows current page to all load before moving on to the next
            setUserIndex(userIndex+10)
        }
    } 
    

    return (
        <Box
            overflowY='auto'
            overflowX = 'auto'
            bg = '#131417' 
            position = 'fixed'
            width = '100%' 
            height = '100%'  
            backgroundImage=''  
            backgroundSize='100vh' 
            backgroundRepeat='no-repeat' 
            backgroundPosition='bottom right'
            
            onScroll={handleScroll}
        >
            <Navbar/>

            

            <Flex flexDirection='column' mt = {4} justifyContent = 'center' >
                <Flex 
                    fontSize = 'xl' 
                    flexDirection='column'
                    borderRadius = '10px'
                    border= '2px solid #9AE6B4'
                    bg = '#24262d'
                    h = '70px'
                    mt = '100px'
                    maxW = '1200px'
                    ml = {[2,4,5,16]}
                > 
                    <Flex flexDirection='row'  h = '100%' alignItems = 'center'>
                        {/*<Icon as = {BsSearch} w = {8} h = {8} ml = {2}/> */}
                        <Input alignSelf='center' ml = {3} mr = {5} h = '45px' fontSize = 'lg' placeholder='Search for a user...' color='white' bg = 'blackAlpha.400'></Input>
                        <Button variant = 'solid' size = 'md' fontSize = 'lg' colorScheme = 'green'>Search</Button>
                        <Flex><Button variant = 'link' size = 'lg' ml = {10} mr = {2}> Meet someone new</Button></Flex>
                        <Flex><Icon as={GiPerspectiveDiceSixFacesOne} w = {12} h = {12} mr = {3}/></Flex>
                    </Flex>
                </Flex>
                <Wrap spacing = '15px' mt={7} justify = 'center'>
                    {users.map((u)=>( //mapping the data of each follower into a card component
                        <ProfileCardMini id = {u._id}/>
                    ))}
        
                </Wrap>
            </Flex>
        </Box>
    )
}
