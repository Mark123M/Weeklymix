import React, {useState, useEffect} from 'react'
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
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/poppins"
import "@fontsource/fira-sans"
import "@fontsource/open-sans"
import Navbar from '../components/Navbar'
import Post from '../components/Post'
import ChannelBtn from '../components/ChannelBtn'
import axios from "axios"


export default function Discussions(){
    const [posts, setPosts] = useState([])

    useEffect(() =>{
        const getAllPosts = async () =>{
            const res = await axios.get("/posts/")
            console.log(res)
            setPosts(res.data)
        }
        getAllPosts()
        
    },[])

    const[channel, setChannel] = useState(1)
    const [channelColors, setChannelColors] = useState(['purple.300', 'transparent','transparent', 'transparent', 'transparent'])
    const channelBtns = [
        <ChannelBtn bg = {channelColors[0]} text = 'All Posts' handleClick={(e)=>switchChannel(e,1)}/>,
        <ChannelBtn bg = {channelColors[1]} text = 'Announcements' handleClick={(e)=>switchChannel(e,2)}/>,
        <ChannelBtn bg = {channelColors[2]} text = 'Discussion' handleClick={(e)=>switchChannel(e,3)}/>,
        <ChannelBtn bg = {channelColors[3]} text = 'Feedback' handleClick={(e)=>switchChannel(e,4)}/>,
        <ChannelBtn bg = {channelColors[4]} text = 'Off Topic' handleClick={(e)=>switchChannel(e,5)}/>
    ]
    

    const switchChannel = (event, channelNum) => {
        console.log(event.target.innerText)
        channelHighlight(channelNum)    
        setChannel(channelNum)
        
    }
    const channelHighlight = (channelNum) =>{
        if(channelNum === 1){
            setChannelColors(['#b794f4', 'transparent', 'transparent', 'transparent', 'transparent'])
        }
        if(channelNum === 2){
            setChannelColors(['transparent', '#b794f4', 'transparent', 'transparent', 'transparent'])
        }
        if(channelNum === 3){
            setChannelColors(['transparent', 'transparent', '#b794f4', 'transparent', 'transparent'])
        }
        if(channelNum === 4){
            setChannelColors(['transparent', 'transparent', 'transparent', '#b794f4', 'transparent' ])
        }
        if(channelNum === 5){
            setChannelColors(['transparent', 'transparent', 'transparent', 'transparent', '#b794f4'])
        }
    }



    return(
        <Box 
            overflow='auto' 
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
            <Flex flexDirection='row' justifyContent='center' mt = '80px'> 
                <Flex 
                    flexDirection='column' 
                    h = '100vh'
                    paddingLeft = {[1,2,4,4]}
                    paddingRight = {[1,2,4,4]}
                    bg = '#131417'
                    position = 'fixed'
                    mt = {1}
                    left = '0px'
                >
                    <Text> CHANNELS</Text>
                   {channelBtns.map(b=>b)}
                </Flex>
                <Flex flexDirection='column' ml = '210px'  > {/*posts box */}
                    {posts.map((p)=>( //mapping the data of each post into a Post component
                        <Post id = {p.id} post = {p}/>
                    ))} 
                </Flex>
            
            </Flex>
        </Box>
    )
}