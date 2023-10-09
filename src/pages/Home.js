import React,{useState, useEffect} from "react"
import {
    Flex,
    Box,
    Button,
    Text,
    Divider,
  } from "@chakra-ui/react";
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/poppins"
import "@fontsource/fira-sans"
import "@fontsource/open-sans"
import Navbar from "../components/Navbar"
import axios from "axios"
import { SongEmbed } from "../components/SongEmbed";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home(){
   /* const spotify = SpotifyCredentials()
    const [token, setToken] = useState("")

    useEffect(()=>{
        
        axios("https://accounts.spotify.com/api/token", {
            headers: {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Authorization" : "Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret)      
            },
            data: "grant_type=client_credentials",
            method: "POST"
        })
        .then(tokenResponse => { 
            //console.log(tokenResponse.data.access_token)
            setToken(tokenResponse.data.access_token)
        })
    },[])  */
    const [userNum, setUserNum] = useState()
    const [postNum, setPostNum] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        const getUserNum = async()=>{
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/`)
            //console.log(res.data.length)
            setUserNum(res.data.length)
        }
        const getPostNum = async()=>{
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/`)
            //console.log(res.data.length)
            setPostNum(res.data.length)
        }
        getUserNum()
        getPostNum()
    },[])

    return(
        <Box 
            overflowX="hidden"
            overflowY = "auto"
            bg = "#1b1c22" 
            position = "fixed" 
            width = "100%" 
            height = "100%"  
           // backgroundImage="https://i.imgur.com/8wxV3Hr.png"  
            backgroundSize="100vh" 
            backgroundRepeat="no-repeat" 
            backgroundPosition="bottom right"
        >

            <Navbar/>

            <Flex mt = "80px" flexDirection = "row"justifyContent = "center" >
                <Flex flexDirection="column" ml = {[2,2,12,20]}>
                    <Text 
                        fontFamily={`"raleway",san-serif`} 
                        fontWeight = "700" 
                        fontSize={[ "2xl" ,"3xl", "4xl", "4xl" ]}
                        mt = {9}
                    >
                        
                       Helping musicians create and improve
                    </Text>
                    <Text 
                        fontFamily={`"open sans",san-serif`} 
                        fontWeight = "500" 
                        fontSize={[ "md" ,"md", "lg", "lg" ]}
                        mt = {2} 
                    >
                        WeeklyMix is a place where musicians could discuss, give feedback, and inspire each other. There are
                        weekly challenges with unique themes which inspires musicians and lets them step out of their comfort zone. 
                    </Text> 
                    <Flex>
                        <Button onClick = {()=>navigate("/discussions")} colorScheme="orange" size = {["md","md","lg","lg"]} variant="solid"  h = "50px" mt = {6} >
                            Go to discussions
                        </Button>
                    </Flex>
                </Flex>
               
                <Flex 
                    display = {["none","none","flex","flex"]}
                    flexDirection="column"  
                    fontFamily={`"open sans",san-serif`} 
                    fontWeight = "600" 
                    fontSize="3xl"
                    mt = {9} 
                    w = "800px"
                    ml = {14}
                    
                >   <Link to = "/users">
                        <Text color = "orange.200">
                            {userNum} registered musicians
                        </Text>
                    </Link>
                    <Link to = "/discussions">
                        <Text>
                            {postNum} posts
                        </Text>
                    </Link>
                    <Link to = "/challenge">
                        <Text>
                            0 challenges
                        </Text>
                    </Link>
                </Flex>
                
            </Flex>
            <Divider mt = {9} colorScheme = "white"/> 
            <Flex flexDirection="column"  mt = {4} alignItems="center">
    
                <Text 
                    fontFamily={`"roboto",san-serif`} 
                    fontWeight = "500" 
                    fontSize={[ "lg" ,"xl", "2xl", "2xl" ]}
            
                    color = "green.200"
                >
                    Featured Tracks:
                </Text>
                <SongEmbed title = "Christmas Morning" link = "https://www.youtube.com/embed/yJW3ZEsDhg8" username = "MetalMark" 
                    description = "This is a beat I made. I used keyscape for the piano and rhodes, xpand for the strings and sax, serum for the bass, and samples for the drums. Im still an amateur at mixing so the sounds may be overcompressed. I am really proud of the chords and melody. I applied some of the knowledge I learned and also experimented with new ideas"
                />
           
            </Flex>

        </Box>
    )
}