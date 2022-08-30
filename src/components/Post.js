import React from 'react'
import { useState, useEffect, useContext } from 'react';
import {
    Flex,
    Image,
    Text,
    Box,
  } from '@chakra-ui/react';
import "@fontsource/fira-sans"
import "@fontsource/roboto"
import {Link} from 'react-router-dom'
import {BiCommentDetail} from 'react-icons/bi'
import { FaShare, FaEdit } from 'react-icons/fa';
import {MdThumbUp} from 'react-icons/md'
import axios from 'axios'
import {format} from "timeago.js"
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const PostLabel = ({text}) =>{
    return(
        <Text
            fontSize= {['sm','sm','0.90rem','0.90rem']}
            fontFamily =  {`'roboto', sans-serif`} 
            fontWeight = '500' 
            ml = {1}
            color = '#A2A4A4'
        >
            {text}
        </Text>
    )
}

export default function Post({post}){
    const assetsFolder = process.env.REACT_APP_PUBLIC_FOLDER

    const [bgColor, setBgColor] = useState('#24262d')
    const [postUser, setPostUser] = useState({})
    const{value: user, setValue: setUser} = useContext(UserContext)
    const [postLikes, setPostLikes] = useState(post.likes)
    const [likedState, setLikedState] = useState(false)

    const navigate = useNavigate()
  

    useEffect(() =>{
        const getPostUser = async () =>{
            const res = await axios.get(`users/${post.userId}`)
            ////console.log(res)
            setPostUser(res.data)
        }
        getPostUser()
        initLikedState()
    },[post.userId])

    const initLikedState = () =>{
        if(user===null){
            setLikedState(false)
        } 
        else{
        //    //console.log(user.likedPosts.includes(post._id), user.likedPosts)
            setLikedState(user.likedPosts.includes(post._id))
        }
    }

    const handleMouseEnter = () =>{
        setBgColor('gray.700')
    }
    const handleMouseLeave = () =>{
        setBgColor('#24262d')
    }
    const showEdit = () =>{
        if(!user){
            return false
        }
        return user._id==post.userId
        
    }

    const handleLikeClick = () =>{
        if(!user){
            navigate('/login', { replace: true })
        }

        if(likedState){
            setPostLikes(postLikes-1)
            setLikedState(false)
        } else {
            setPostLikes(postLikes+1)
            setLikedState(true)
        }

        axios.put(`/posts/${post._id}/like`, { //i tried to do axios.post and kept getting 404 because it was actually a put endpoint
            userId: user._id
        })
        .then((res)=>{
            ////console.log(res)
            //console.log('post liked')

            //update the user locally in Context API
            axios.get(`/users/${user._id}`)
            .then((res)=>{
                setUser(res.data)
                //console.log(res.data)
            })
        })
        .catch((err)=>{
            //console.log(err)
        })
    }

    const handleShare = () =>{
        //code here
    }

    const handleEdit = () =>{
        if(!user){
            navigate('/login', { replace: true })
        }
        else{
            navigate(`/discussions/${post._id}/edit`, { replace: true })
        }
    }
    


    return(
        <Flex 
            fontSize = 'xl' 
            flexDirection='column'
            borderRadius = '10px'
            border= '2px solid #90CDF4'
            
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
                <Box>
                    <Link to = {`/profile/${postUser.username}`}>
                        <Image src={postUser.profilePic || 'https://res.cloudinary.com/dyrwb96jv/image/upload/v1661549963/cdhmdf8rdxqotpfej5fh.webp'} objectFit = 'cover' minW = {['50px','50px','60px','60px']} maxW = {['50px','50px','60px','60px']} h = {['50px','50px','60px','60px']} borderRadius = '50%' ml = {5}/>
                    </Link>
                </Box>

                <Flex flexDirection = 'column'>
                    <Flex>
                        <Text
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
                        </Text>
                        
                        <Text
                            fontSize= {['xs','xs','sm','sm']}
                            fontFamily =  {`'roboto', sans-serif`} 
                            fontWeight = '500' 
                            ml = {4}
                            
                            color = '#A2A4A4'
                        >
                            {format(post.createdAt)}
                        </Text>
                    </Flex>
                    <Text
                        fontSize= {['md', 'md', '1.3rem', '1.3rem']}
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

                        <Flex onClick = {handleLikeClick} color = {likedState?'orange.300':'#A2A4A4'} _hover = {{color: 'orange.300'}} cursor = 'pointer'>
                            <MdThumbUp size={22}  />
                        </Flex>
                        <Text
                            fontSize= {['sm','sm','0.90rem','0.90rem']}
                            fontFamily =  {`'roboto', sans-serif`} 
                            fontWeight = '500' 
                            ml = {2}
                            color = {likedState?'whiteAlpha.900':'#A2A4A4'}
                            textDecoration = {likedState? 'underline 2px solid' :'initial'}
                            
                        > 
                            
                            {postLikes} {postLikes ===1? 'like': 'likes'}
                        </Text>

                        <Flex ml = {5}>
                            <BiCommentDetail size={22} color = '#A2A4A4' />
                            <PostLabel text ={`${post.comments.length} ${post.comments.length === 1? 'comment': 'comments'}`} />
                        </Flex>

                        
                        
                        <Flex ml = {4} onClick = {handleShare} color = '#A2A4A4'  _hover = {{color: 'white'}}  cursor = 'pointer'>
                            <FaShare size={20}  />
                            <PostLabel text = 'share'/>
                        </Flex>

                        

                        <Flex visibility = {showEdit()?'visible':'hidden'}  ml = {4} onClick = {handleEdit} color = '#A2A4A4'  _hover = {{color: 'blue.300'}}  cursor = 'pointer'>
                            <FaEdit size={20}  />
                            <PostLabel text = 'edit' />
                        </Flex>

                        
                        

                    </Flex>
                </Flex>
                <Box h = '100%' alignItems='center' marginLeft = 'auto' mr = {7} visibility = {['hidden','hidden','visible','visible']}>
                    <Image visibility={post.image===''?'hidden':'visible'} src={post.image} maxW = '300px' h = {['120px','120px','120px','165px']} borderRadius = '8px' marginBottom={4}/>
                </Box>
            </Flex>
        </Flex>

    )
}