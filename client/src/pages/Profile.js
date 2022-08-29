import React, { useState, useEffect} from 'react'
import {
    Flex,
    Box,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Wrap,
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

const UserPosts = ({index}) =>{
    const {username} = useParams()
    const [posts, setPosts] = useState([])
    

    useEffect(()=>{
        const getUserPosts = async () =>{
            const res = await axios.get(`/posts/user/${username}`)
            res.data.sort(function(a,b){return -1 * a.createdAt.localeCompare(b.createdAt);});
            setPosts(res.data)
        }   
        getUserPosts()
    }, [])

    return(
        posts.slice(0, index).map((p)=>( //mapping the data of each post into a Post component
            <Post id = {p.id} post = {p}/>
        ))
    )
}

const UserFollowers = () =>{
    const {username} = useParams()
    const [followers, setFollowers] = useState([])
    useEffect(()=>{
        const getFollowers = async() =>{
            const res = await axios.get(`/users/u/${username}`)
            setFollowers(res.data.followers)
        }
        getFollowers()
    }, [])
    useEffect(()=>{
        console.log('followers: ',followers)
    }, [followers])
    
    return(
        <Wrap spacing = '15px' ml = {7} mt={2}>
            {followers.map((f)=>( //mapping the data of each follower into a card component
                <ProfileCardMini id = {f}/>
            ))}
            {/*<ProfileCardMini username = 'LofiLarry'/>
            <ProfileCardMini username = 'ModalMatthew'/>
            <ProfileCardMini username = 'HiphopHubert'/>
            <ProfileCardMini id = '62ead0e9d1018dfe30f33fd9'/>*/}
        </Wrap>
    )
}

export default function Profile() {
   // const{value: user, setValue: setUser} = useContext(UserContext)
   // console.log(user)
    const {username} = useParams()
    const [postIndex, setPostIndex] = useState(10)
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    const handleScroll = async (e) =>{
        console.log('scrolling', e.target.scrollHeight - e.target.scrollTop, e.target.clientHeight)
        if(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <= 50 ){ //tolerance value for how far user scrolls down to load posts
            //alert('youve hit bottom')
            await delay(1000) //allows current page to all load before moving on to the next
            setPostIndex(postIndex+10)
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
            
            key ={window.location.href}
            onScroll={handleScroll}
        >
            <Navbar/>
            <Flex flexDirection='row' mt = '-10px'>

                <Tabs size = {['md','md','md','md']} variant = 'line' colorScheme = 'purple' w = '100vw' fontFamily =  {`'fira sans', sans-serif`} mt = '80px'  >
                    <TabList bg = '#24252E' justifyContent='center' mt = {1}>
                        <Tab mr = {[0,0,10,10]} borderWidth = '5px' borderStyle='none none solid none'>Posts</Tab>
                        <Tab mr = {[0,0,10,10]} borderWidth = '5px' borderStyle='none none solid none'>Followers</Tab>
                        <Tab mr = {[0,0,10,10]} borderWidth = '5px' borderStyle='none none solid none'>Submissions</Tab>
                        <Tab mr = {[0,0,10,10]} borderWidth = '5px' borderStyle='none none solid none'>Awards</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Flex flexDirection={['column', 'column', 'column', 'row']}>
                                <ProfileCard username = {username} /* passing the routing parameters to component*//>
                                <Flex flexDirection='column' ml = {['0px','0px',3,3]} mt = {2} w = '100%'> {/*posts box */}
                                    <UserPosts index = {postIndex}/>
                                    <Center w = '100%' h = '100px' >
                                        <Spinner size='xl' thickness='5px'/>
                                        <Text ml = {4} fontSize = '2xl'>
                                            Loading posts...
                                        </Text>        
                                    </Center>
                                </Flex>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex flexDirection={['column', 'column', 'row', 'row']}>
                                <ProfileCard username = {username}/>
                                <UserFollowers/>
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
