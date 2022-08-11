import React from 'react'
import { useState, useEffect } from 'react';
import {
    Flex,
    Image,
    Text,
    Box,
    Icon,
    Button,
    IconButton
  } from '@chakra-ui/react';
import "@fontsource/fira-sans"
import "@fontsource/roboto"

import {Link} from 'react-router-dom'


import {BiCommentDetail, BiLike} from 'react-icons/bi'
import { FaShare } from 'react-icons/fa';

import axios from 'axios'
import {format} from "timeago.js"

const PostButton = (type, color, req) =>{
    let icon = <Icon as = {BiCommentDetail} w = {6} h = {6} color = '#8E8F90' ml = {3}/>
    if(type =='like'){
        console.log('wtfwtf')
    }
    return(
        icon
    )
}


export default function Post({post}){
    const assetsFolder = process.env.REACT_APP_PUBLIC_FOLDER

    const [bgColor, setBgColor] = useState('#212229')
    const [user, setUser] = useState({})

    useEffect(() =>{
        const getUser = async () =>{
            const res = await axios.get(`users/${post.userId}`)
            console.log(res)
            setUser(res.data)
        }
        getUser()
        
    },[post.userId])

    const handleMouseEnter = () =>{
        setBgColor('gray.700')
    }
    const handleMouseLeave = () =>{
        setBgColor('#212229')
    }


    return(
        <Link to = '/'>
            <Flex 
                fontSize = 'xl' 
                flexDirection='column'
                borderRadius = '10px'
                border= '1px solid #90CDF4'
                
                bg = {bgColor}
                onMouseEnter = {handleMouseEnter}
                onMouseLeave = {handleMouseLeave}
                mt = {1}
                mb = {1}
                ml = {4}
                mr = {8}
            > 
            {/* i have braindamage */}
                <Flex flexDirection='row' mt = {4}>
                    <Box display = {['none', 'none','inline','inline']}>
                        <Link to = {`/profile/${user.username}`}>
                            <Image src={user.profilePic || assetsFolder+"users/defaultAvatar.jpg"} objectFit = 'cover' minW = {['50px','50px','60px','60px']} maxW = {['50px','50px','60px','60px']} h = {['50px','50px','60px','60px']} borderRadius = '50%' ml = {5}/>
                        </Link>
                    </Box>

                    <Flex flexDirection = 'column'>
                        <Flex>
                            <Button
                                variant = 'link'
                                fontSize= {['md', 'md', 'md', 'md']}
                                fontFamily =  {`'roboto', sans-serif`} 
                                fontWeight = '500' 
                                ml = {4}
                            
                            >   
                                <Link to = {`/profile/${user.username}`}>
                                    {user.username}
                                </Link>
                            </Button>

                            <Text
                                fontSize= {['xs','xs','sm','sm']}
                                fontFamily =  {`'roboto', sans-serif`} 
                                fontWeight = '500' 
                                ml = {4}
                                
                                color = '#8E8F90'
                            >
                                {format(post.createdAt)}
                            </Text>
                        </Flex>
                        <Text
                            fontSize= {['md', 'md', 'xl', 'xl']}
                            fontFamily =  {`'roboto', sans-serif`} 
                            fontWeight = '600' 
                            ml = {4}
                        >
                            {post.title}
                        </Text>
                        <Text
                            fontSize= {['sm','sm','md','md']}
                            fontFamily =  {`'roboto', sans-serif`} 
                            fontWeight = '500' 
                            ml = {4}
                            mt = {1}
                            color = 'white'
                        >   
                            {post.description}
                        </Text>
                        <Flex alignItems = 'center' ml = {4} marginTop = 'auto' mb = {3} paddingTop = {3}>
                            <Icon as = {BiCommentDetail} w = {6} h = {6} color = '#8E8F90' />
                            <Text
                                fontSize= {['xs','xs','sm','sm']}
                                fontFamily =  {`'roboto', sans-serif`} 
                                fontWeight = '500' 
                                ml = {1}
                                color = '#8E8F90'
                            > 
                                {post.comments.length} {post.comments.length === 1? 'comment': 'comments'}
                            </Text>

                            <PostButton type = "like"/>

                            <Text
                                fontSize= {['xs','xs','sm','sm']}
                                fontFamily =  {`'roboto', sans-serif`} 
                                fontWeight = '500' 
                                ml = {1}
                                color = '#8E8F90'
                            > 
                                {post.likes.length} {post.likes.length ===1? 'like': 'likes'}
                            </Text>
                        </Flex>
                    </Flex>
                    <Box h = '100%' alignItems='center' marginLeft = 'auto' mr = {7}>
                        <Image src={assetsFolder+post.image} maxW = '1000px' h = {['120px','120px','150px','150px']} borderRadius = '8px' marginBottom={4}/>
                    </Box>
                </Flex>
            </Flex>
        </Link>
    )
}