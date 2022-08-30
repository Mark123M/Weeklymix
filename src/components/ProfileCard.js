import React, { useState, useEffect, useContext } from "react"
import {
    Flex,
    Image,
    Text,
    Box,
    Icon,
    Button,
    Wrap,
  } from "@chakra-ui/react";
import "@fontsource/fira-sans"
import "@fontsource/roboto"
import {BiPencil} from "react-icons/bi"
import { FaFlagUsa, FaYoutube, FaSpotify, FaSoundcloud,FaReddit} from "react-icons/fa";
import {HiUserGroup} from "react-icons/hi"
import {AiOutlineUserAdd} from "react-icons/ai"
import SocialLink from "./SocialLink";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function ProfileCard({username}) {
    const [profileUser, setProfileUser] = useState({
        followers:[],
    })
    const [followers, setFollowers] = useState()
    const [isFollowed, setIsFollowed] = useState(false)
    const navigate = useNavigate()
    const{value: user, setValue: setUser} = useContext(UserContext)

    useEffect(() =>{
        const getProfileUser = async () =>{
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/u/${username}`)
            //console.log(res)
            setProfileUser(res.data)
            setFollowers(res.data.followers.length)
            setIsFollowed(res.data.followers.includes(user._id))
            //console.log(res.data.followers.includes(user._id))
        }
        getProfileUser()
    },[isFollowed])

    const handleFollow = () =>{
        navigate("/login", {replace: true})
        axios.put(`${process.env.REACT_APP_SERVER_URL}/users/${profileUser._id}/follow`, {
            userId:user._id
        })
        .then((res)=>{
            setIsFollowed(!isFollowed)
            //console.log(res)
        })
    }

    const showEdit = () =>{
        if(!user){
            return false
        }
        return user.username==username
    }
   // //console.log(user)

    const assetsFolder = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <Flex
            flexDirection="column"
            bg = "#24262D"
            w = {["400px","400px","400px","400px"]}
            ml = {["0px","0px",5,5]}
            mt = {3}
            borderRadius = "10px 10px 10px 10px"
            height = "fit-content"
        >

            <Flex bg = "#2d97e5" minW = "400px" maxW = "400px" h = "140px" borderRadius = "10px 10px 0px 0px" backgroundImage = {profileUser.coverPic}>
                <Box>
                    <Image src={profileUser.profilePic || assetsFolder+"users/defaultAvatar.jpg"} objectFit = "cover" minW = "120px" maxW = "120px" h = "120px" borderRadius = "5px" ml = {8} mt = {16} outline = "4px solid white"  />
                </Box>
                <Button visibility = {showEdit()?"visible":"hidden"} mt = "155px" ml = "auto" mr = {5} colorScheme = "purple" onClick = {()=>navigate(`/profile/${profileUser.username}/edit`)}>
                    <BiPencil size = {30}/>
                    <Text fontSize = "md">
                        Edit profile
                    </Text>
                    
                </Button>
                
            </Flex>
            <Text
                fontSize= "2xl"
                fontFamily =  {`"fira sans", sans-serif`} 
                fontWeight = "500" 
                ml = {7}
                mt = {14}   
            >
                {profileUser.username}
            </Text>

            <Flex>

                <Flex flexDirection = "column">
                    <Flex>
                        <Icon as = {FaFlagUsa} w = {5} h = {5} ml = {7}/>
                        <Text
                            fontSize= {["xs","xs","sm","sm"]}
                            fontFamily =  {`"roboto", sans-serif`} 
                            fontWeight = "500" 
                            ml = {3}
                            color = "#A2A4A4"
                        >
                            {profileUser.location}
                        </Text>
                    </Flex>
                    
                    <Flex mt = {2}>
                        <Icon as = {HiUserGroup} w = {6} h = {6} ml = {7} color = "white"/>
                        <Text
                            fontSize= {["xs","xs","sm","sm"]}
                            fontFamily =  {`"roboto", sans-serif`} 
                            fontWeight = "500" 
                            ml = {3}
                            color = "#A2A4A4"
                            mt = {1}
                        >
                            {followers} followers 
                        </Text>
                    </Flex>
                    
                    
                </Flex>
                
                <Button colorScheme="orange" variant={isFollowed?"outline":"solid"} ml = "auto" mr = {5} mt = "-24px" onClick = {handleFollow} >
                    <Icon as = {AiOutlineUserAdd} w = {6} h = {6} color ={isFollowed?"orange.200":"black"}/>
                    {isFollowed?"Unfollow":"Follow"}
                </Button>
                
                

            </Flex>
            
            <Wrap spacing = "10px" ml = {7} mt={5}>
                <SocialLink link = "https://www.youtube.com/channel/UCNQe-ij8K8JgyuJFiP_tWOA" text = "Youtube" icon = {FaYoutube} iconColor = "#ff0000" linkWidth="95px"/>
                <SocialLink link = "https://soundcloud.com/aevyan" text = "Soundcloud" icon = {FaSoundcloud} iconColor = "#ff5500" linkWidth="120px"/>
                <SocialLink link = "https://open.spotify.com/artist/699OTQXzgjhIYAHMy9RyPD" text = "Spotify" icon = {FaSpotify} iconColor = "#1ed760" linkWidth="95px"/>
                <SocialLink link = "https://www.reddit.com/user/avyan1" text = "Reddit" icon = {FaReddit} iconColor = "#ff4500" linkWidth="90px"/>
            </Wrap>

            <Text
                fontSize= {["sm","sm","md","md"]}
                fontFamily =  {`"roboto", sans-serif`} 
                fontWeight = "500" 
                ml = {7}
                mt = {3}
                mr = {4}
                mb = {5}
                color = "white"

            >
                {profileUser.description}

            </Text>


        </Flex>
    )
}
