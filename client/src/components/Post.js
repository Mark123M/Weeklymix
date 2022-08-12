import React from 'react'
import { useState, useEffect, useContext } from 'react';
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
import {MdThumbUp} from 'react-icons/md'

import axios from 'axios'
import {format} from "timeago.js"
import { UserContext } from '../UserContext';

export default function Post({post}){
    const assetsFolder = process.env.REACT_APP_PUBLIC_FOLDER

    const [bgColor, setBgColor] = useState('#212229')
    const [postUser, setPostUser] = useState({})
    const [liked, setLiked] = useState(false)
    const{value: user, setValue: setUser} = useContext(UserContext)

    useEffect(() =>{
        const getPostUser = async () =>{
            const res = await axios.get(`users/${post.userId}`)
            console.log(res)
            setPostUser(res.data)
        }
        getPostUser()
        
    },[post.userId])

    const handleMouseEnter = () =>{
        setBgColor('gray.700')
    }
    const handleMouseLeave = () =>{
        setBgColor('#212229')
    }

    const handleLikeClick = () =>{
        setLiked(!liked)
        axios.put(`/posts/${post._id}/like`, { //i tried to do axios.post and kept getting 404 because it was actually a put endpoint
            userId: user._id
        })
        .then((res)=>{
            console.log(res)
            console.log('post liked')
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    return(
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
                        <Link to = {`/profile/${postUser.username}`}>
                            <Image src={postUser.profilePic || assetsFolder+"users/defaultAvatar.jpg"} objectFit = 'cover' minW = {['50px','50px','60px','60px']} maxW = {['50px','50px','60px','60px']} h = {['50px','50px','60px','60px']} borderRadius = '50%' ml = {5}/>
                        </Link>
                    </Box>

                    <Flex flexDirection = 'column'>
                        <Flex>
                            <Flex
                                fontSize= {['md', 'md', 'md', 'md']}
                                fontFamily =  {`'roboto', sans-serif`} 
                                fontWeight = '500' 
                                ml = {4}
                                _hover = {{textDecoration: 'underline'}}
                            >
                                <Link 
                                    to = {`/profile/${postUser.username}`}
                                >
                                    {postUser.username}
                                </Link>
                            </Flex>
                            
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

                            <Flex onClick = {handleLikeClick} color = {liked?'orange.300':'#8E8F90'} _hover = {{color: 'orange.100'}} cursor = 'pointer'>
                                <MdThumbUp size={25}  />
                            </Flex>
                            <Text
                                fontSize= {['sm','sm','0.92rem','0.92rem']}
                                fontFamily =  {`'roboto', sans-serif`} 
                                fontWeight = '500' 
                                ml = {2}
                                color = {liked?'whiteAlpha.900':'#8E8F90'}
                                textDecoration = {liked? 'underline 2px solid' :'initial'}
                                
                            > 
                                {post.likes} {post.likes ===1? 'like': 'likes'}
                            </Text>

                            <Flex ml = {5}>
                                <BiCommentDetail size={25} color = '#8E8F90' />
                            </Flex>
                            <Text
                                fontSize= {['sm','sm','0.92rem','0.92rem']}
                                fontFamily =  {`'roboto', sans-serif`} 
                                fontWeight = '500' 
                                ml = {2}
                                color = '#8E8F90'
                            > 
                                {post.comments.length} {post.comments.length === 1? 'comment': 'comments'}
                            </Text>
                            
                            

                        </Flex>
                    </Flex>
                    <Box h = '100%' alignItems='center' marginLeft = 'auto' mr = {7}>
                        <Image src={assetsFolder+post.image} maxW = '1000px' h = {['120px','120px','150px','150px']} borderRadius = '8px' marginBottom={4}/>
                    </Box>
                </Flex>
            </Flex>

    )
}