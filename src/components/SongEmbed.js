import React from "react"
import {
    Flex,
    Center,
    Image,
    Box,
    Button,
    IconButton,
    Text,
    Divider,
    textDecoration
  } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/poppins"
import "@fontsource/fira-sans"
import "@fontsource/open-sans"

export function SongEmbed({link, title, username, description}) {
    

    return (
        <Flex mt = {4} width = {["300px","400px","80vw","1200px"]} flexDirection = {["column","column","row","row"]}>
            <Flex 
                as = "iframe" 
                width={["300px","400px","500px","500px"]} 
                height="300px" 
                src= {link} //"https://www.youtube.com/embed/yJW3ZEsDhg8" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </Flex>
            <Flex flexDirection = "column"  ml = {[0,0,5,5]} width={["300px","400px","500px","500px"]} >
                <Text 
                    fontFamily={`"raleway",san-serif`} 
                    fontWeight = "700" 
                    fontSize={[ "2xl" ,"3xl", "4xl", "4xl" ]}
                    mt = {[0,0,"-5px","-5px"]}
                >
                    {title}
                </Text>
                
                <Text>
                    {description}
                </Text>
                <Flex mt = "auto" mb = {5}>
                    <Text> Created by</Text>
                    <Link to={`/profile/${username}`}>
                        <Text 
                            fontFamily={`"raleway",san-serif`} 
                            fontWeight = "700" 
                            fontSize={[ "md" ,"md", "lg", "lg" ]}
                            ml = {2}
                            color = "orange.200"
                            _hover = {{textDecoration:"underline"}}
                        >
                            {username}
                        </Text>
                    </Link>
                </Flex>
                
            </Flex>
        </Flex>
    )
}
