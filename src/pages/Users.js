import React, { useState, useEffect} from 'react'
import {
    Flex,
    Box,
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
import ProfileCardMini from '../components/ProfileCardMini';
import axios from "axios"
import {GiPerspectiveDiceSixFacesOne} from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';

export default function Users() {
    const [users, setUsers] = useState([])
    const [userIndex, setUserIndex] = useState(10)
    const [search, setSearch] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        const getUsers = async() =>{
            const res = await axios.get(`/users/`)
            setUsers(res.data)
            setFilteredUsers(res.data)
        }
        getUsers()
    }, [])
    
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    const handleScroll = async (e) =>{
       // //console.log('scrolling', e.target.scrollHeight - e.target.scrollTop, e.target.clientHeight)
        if(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <= 50 ){ //tolerance value for how far user scrolls down to load posts
            //alert('youve hit bottom')
            await delay(1000) //allows current page to all load before moving on to the next
            setUserIndex(userIndex+10)
        }
    } 
    
    const getRandomUser = () =>{
        const index = Math.floor(Math.random() * (users.length))
        navigate(`/profile/${users[index].username}`)
    }

    const handleUserSearch = () =>{
      setFilteredUsers(users.filter(u=>u.username.toLowerCase().includes(search.toLowerCase())))
       
    }
    useEffect(()=>{
        //console.log('filtered users',filteredUsers)
    }, [filteredUsers])

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
                        <Input value = {search} onChange = {(e)=>setSearch(e.target.value)} alignSelf='center' ml = {3} mr = {5} h = '45px' fontSize = 'lg' placeholder='Search for a user...' color='white' bg = 'blackAlpha.400'/>
                        <Button onClick = {handleUserSearch} variant = 'solid' size = 'md' fontSize = 'lg' colorScheme = 'green'>Search</Button>
                        <Flex display = {['none','none','flex','flex']}><Button onClick = {getRandomUser} variant = 'link' size = 'lg' ml = {7} mr = {2}> Random user</Button></Flex>
                        <Flex onClick = {getRandomUser} cursor = 'pointer'>
                            <Icon as={GiPerspectiveDiceSixFacesOne} w = {12} h = {12} mr = {3}/>
                        </Flex>
                    </Flex>
                </Flex>
                <Wrap spacing = '15px' mt={7} justify = 'center'>
                    {filteredUsers.slice(0, userIndex).map((u)=>( //mapping the data of each follower into a card component
                        <ProfileCardMini id = {u._id} key = {u._id}/>
                    ))}
        
                </Wrap>
                <Center w = '100%' h = '100px' >
                <Spinner size='xl' thickness='5px'/>
                <Text ml = {4} fontSize = '2xl'>
                    Loading users...
                </Text>        
            </Center>
            </Flex>
        </Box>
    )
}
