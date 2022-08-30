import React, { useState, useEffect, useContext } from 'react'
import {
    Flex,
    Image,
    Text,
    Box,
    Button,
    Icon
  } from '@chakra-ui/react';
import "@fontsource/fira-sans"
import "@fontsource/roboto"
import {Users} from '../DummyData'
import axios from 'axios'
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {AiOutlineUserAdd} from 'react-icons/ai'

export default function ProfileCardMini({username, id}) {
    const assetsFolder = process.env.REACT_APP_PUBLIC_FOLDER

    const [profileUser, setProfileUser] = useState({
        followers:[],
    })
    const [followers, setFollowers] = useState()
    const [isFollowed, setIsFollowed] = useState(false)
    const navigate = useNavigate()
    const{value: user, setValue: setUser} = useContext(UserContext)

    useEffect(() =>{
        const getProfileUser = async () =>{
            const res = username? await axios.get(`/users/u/${username}`): await axios.get(`/users/${id}`)
            console.log(res)
            setProfileUser(res.data)
            setFollowers(res.data.followers.length)
            setIsFollowed(res.data.followers.includes(user._id))
            console.log(res.data.followers.includes(user._id))
        }
        getProfileUser()
    },[isFollowed])

    const handleFollow = () =>{
        if(!user){
            navigate('/login', {replace: true})
        }
        axios.put(`/users/${profileUser._id}/follow`, {
            userId:user._id
        })
        .then((res)=>{
            setIsFollowed(!isFollowed)
            console.log(res)
        })
    }

    return (
        <Flex
            flexDirection='row'
            bg = '#24262d'
            w = '450px'
            
            ml = {['0px','0px',5,5]}
            borderRadius = '10px 10px 10px 10px'
            alignItems='center'
        >
           {/* <Box h = '100%' alignItems='center' mr = {7} >
                <Image src='assets/guitar.jfif' objectFit='cover' minW = '400px' maxW = '400px' h = '150px' borderRadius = '20px 20px 0px 0px' marginBottom={4}/>
            </Box> */}

           
            <Box>
                <Image src={profileUser.profilePic||'https://res.cloudinary.com/dyrwb96jv/image/upload/v1661549963/cdhmdf8rdxqotpfej5fh.webp'} objectFit = 'cover' minW = '160px' maxW = '160px' h = '160px' borderRadius = '5px' border = '3px solid white'  />
            </Box>

            <Flex flexDirection='column' align = 'left' w = '100%' mr = {5}>
                <Text
                    fontSize= '2xl'
                    fontFamily =  {`'fira sans', sans-serif`} 
                    fontWeight = '500'  
                    _hover = {{textDecoration: 'underline'}}
                    maxW = '200px'
                    marginLeft = 'auto'
                >
                    <Link 
                        to = {`/profile/${profileUser.username}`}
                    >
                        {profileUser.username}
                    </Link>
                </Text>

                <Text
                    fontSize= {['sm','sm','sm','sm']}
                    fontFamily =  {`'roboto', sans-serif`} 
                    fontWeight = '500' 
                    color = '#A2A4A4'
                    marginLeft = 'auto'
                >
                    {profileUser.location}
                </Text>
                <Text
                    fontSize= {['xs','xs','sm','sm']}
                    fontFamily =  {`'roboto', sans-serif`} 
                    fontWeight = '500' 
                    color = '#A2A4A4'
                    ml = 'auto'
                    mt = {1}
                >
                    {followers} followers 
                </Text>
                <Button onClick = {handleFollow} colorScheme='orange' variant={isFollowed?'outline':'solid'} mt = {4} w = '120px' size = 'sm' marginLeft = 'auto'>
                    <Icon as = {AiOutlineUserAdd} w = {6} h = {6} color ={isFollowed?'orange.200':'black'}/>
                    {isFollowed?'Unfollow':'Follow'}
                </Button>
            </Flex>
           
            

        

        </Flex>
    )
}
