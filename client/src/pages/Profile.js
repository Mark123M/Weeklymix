import React, { useState, useEffect, useContext } from 'react'
import {
    Flex,
    Image,
    Text,
    Box,
    Icon,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Wrap
  } from '@chakra-ui/react';
import "@fontsource/fira-sans"
import "@fontsource/roboto"
import Navbar from '../components/Navbar'
import ProfileCard from '../components/ProfileCard';
import {Posts} from "../DummyData"
import {Users} from "../DummyData"
import Post from '../components/Post'
import ProfileCardMini from '../components/ProfileCardMini';

import axios from "axios"

import {useParams} from "react-router"
import { UserContext } from '../UserContext';

export default function Profile() {
    const{value, setValue} = useContext(UserContext)
    console.log(value)
    
    const [posts, setPosts] = useState([])
    
    const {username} = useParams()

    useEffect(() =>{
        const getUserPosts = async () =>{
            const res = await axios.get(`/posts/user/${username}`)
            console.log(res)
            setPosts(res.data)
        }
        getUserPosts()
    },[])

    
    return (
        <Box
            overflowY='auto'
            overflowX = 'auto'
            bg = '#1b1c22' 
            position = 'fixed' 
            width = '100%' 
            height = '100%'  
            backgroundImage=''  
            backgroundSize='100vh' 
            backgroundRepeat='no-repeat' 
            backgroundPosition='bottom right'
            
        >
            <Navbar/>
            <Flex flexDirection='row'>

                <Tabs size = {['md','md','lg','lg']} variant = 'line' colorScheme = 'purple' w = '100vw' fontFamily =  {`'fira sans', sans-serif`} mt = '80px'  >
                    <TabList bg = '#24252E' justifyContent='center' mt = {1}>
                        <Tab mr = {[0,0,10,10]} borderWidth = '5px' borderStyle='none none solid none'>Posts</Tab>
                        <Tab mr = {[0,0,10,10]} borderWidth = '5px' borderStyle='none none solid none'>Followers</Tab>
                        <Tab mr = {[0,0,10,10]} borderWidth = '5px' borderStyle='none none solid none'>Submissions</Tab>
                        <Tab mr = {[0,0,10,10]} borderWidth = '5px' borderStyle='none none solid none'>Awards</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Flex flexDirection={['column', 'column', 'row', 'row']}>
                                <ProfileCard username = {username} /* passing the routing parameters to component*//>
                                <Flex flexDirection='column' ml = {['0px','0px',5,5]} mt = {2}  > {/*posts box */}
                                    {posts.map((p)=>( //mapping the data of each post into a Post component
                                        <Post id = {p.id} post = {p}/>
                                    ))}
                                </Flex>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex flexDirection={['column', 'column', 'row', 'row']}>
                                <ProfileCard username = {username}/>
                                <Wrap spacing = '20px' ml = {7} mt={2}>
                                    {Users.map((u)=>( //mapping the data of each post into a Post component
                                        <ProfileCardMini/>
                                    ))}
                                </Wrap>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                  
                        </TabPanel>
                        <TabPanel>
                   
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                
            </Flex>
            


         
            
        </Box>
    )
}
