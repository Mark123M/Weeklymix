import React,{useState, useEffect, useContext} from 'react'
import {
    Flex,
    Image,
    Box,
    Button,
    Spinner,
    Center,
    Text
  } from '@chakra-ui/react';
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/poppins"
import "@fontsource/fira-sans"
import "@fontsource/open-sans"
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import ChannelBtn from '../components/ChannelBtn'
import PostBox from '../components/PostBox';
import Post from '../components/Post';

export default function Discussion(){
    
    const [postIndex, setPostIndex] = useState(10)
    const [posts, setPosts] = useState([])
    //const [loading, setLoading] = useState(true)
    //const [postFormDisplay, setPostFormDisplay] = useState(false)
    const{value: user, setValue: setUser} = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() =>{
        const getAllPosts = async () =>{
            const res = await axios.get("/posts/")
            console.log(res)
            res.data.sort(function(a,b){return -1 * a.createdAt.localeCompare(b.createdAt);});
            setPosts(res.data)
            //this.forceUpdate()   //had to use this since state hooks were kind of bugging out
        }
        getAllPosts()
    },[])

    const[channel, setChannel] = useState(1)
    const [channelColors, setChannelColors] = useState(['purple.300', 'transparent','transparent', 'transparent', 'transparent'])
    
    const switchChannel = (event, channelNum) => {
        console.log(event.target.innerText)
        channelHighlight(channelNum)    
        setChannel(channelNum)
    }

    const createNewPost = () =>{
        if(!user){
            navigate('/login', { replace: true })
        }
        else {
            console.log('new post created')
            //setPostFormDisplay(true)
            navigate('/discussions/new-post', {replace:true})
        }   
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



    const delay = ms => new Promise(res => setTimeout(res, ms));
    const handleScroll = async (e) =>{
       
        console.log('scrolling', e.target.scrollHeight - e.target.scrollTop, e.target.clientHeight)
        if(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <= 50 ){ //tolerance value for how far user scrolls down to load posts
           //alert('youve hit bottom')
            await delay(1000) //allows current page to all load before moving on to the next
            setPostIndex(postIndex+10)
        }
    }
    

    return(
        <Box 
            overflowX='hidden'
            overflowY = 'auto'
            bg = '#131417' 
            position = 'fixed' 
            width = '100%' 
            height = '100%'  
           // backgroundImage='https://i.imgur.com/8wxV3Hr.png'  
            backgroundSize='100vh' 
            backgroundRepeat='no-repeat' 
            backgroundPosition='bottom right'
            onScroll={handleScroll}
        >

            <Navbar/>

            <Flex 
                flexDirection='column' 
                h = '100vh'
                paddingLeft = {[1,2,4,4]}
                paddingRight = {[1,2,4,4]}
                position = 'fixed'
                paddingTop = {24}
                left = '0'
                top = '0'
                bg = '#131417'
            >
                <ChannelBtn bg = {channelColors[0]} text = 'All Posts' handleClick={(e)=>switchChannel(e,1)}/>
                <ChannelBtn bg = {channelColors[1]} text = 'Announcements' handleClick={(e)=>switchChannel(e,2)}/>
                <ChannelBtn bg = {channelColors[2]} text = 'Discussion' handleClick={(e)=>switchChannel(e,3)}/>
                <ChannelBtn bg = {channelColors[3]} text = 'Feedback' handleClick={(e)=>switchChannel(e,4)}/>
                <ChannelBtn bg = {channelColors[4]} text = 'Off Topic' handleClick={(e)=>switchChannel(e,5)}/>
                <Button 
                    variant = 'solid' 
                    mt = {10} 
                    colorScheme = 'orange' 
                    size = {['md','md','lg','lg']}
                    alignSelf='center'
                    onClick = {createNewPost}
                
                >
                    +new post
                </Button>
            </Flex>

            <Flex flexDirection='column' ml = {['140px','150px','200px', '200px']} mt = {16} bg = '#131417' paddingTop={4} paddingLeft = {6}> 
                <PostBox createNewPost={createNewPost}/>
                
                {posts.slice(0,postIndex).map((p)=>( //mapping the data of each post into a Post component
                    <Post id = {p._id} post = {p}/>
                ))} 
               
            </Flex>
            <Center w = '100%' h = '100px' >
                <Spinner size='xl' thickness='5px'/>
                <Text ml = {4} fontSize = '2xl'>
                    Loading posts...
                </Text>        
            </Center>
            
            
        </Box>
    )
}