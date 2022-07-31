import React, { useState } from 'react'
import {
    Flex,
    Image,
    Text,
    Box,
    Icon,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Wrap
  } from '@chakra-ui/react';
import "@fontsource/fira-sans"
import "@fontsource/roboto"
import Navbar from '../components/Navbar'
import ProfileCard from '../components/ProfileCard';
import {Posts} from "../DummyData"
import {Users} from "../DummyData"
import Post from '../components/Post'
import ProfileCardMini from '../components/ProfileCardMini';

export default function Profile() {
    return (
        <Box
            overflowY='auto'
            overflowX = 'auto'
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
            
            <Flex flexDirection='row'>

                <Tabs size = {['md','md','lg','lg']} variant = 'line' colorScheme = 'purple' w = '100vw' fontFamily =  {`'fira sans', sans-serif`} mt = '80px'  >
                    <TabList bg = '#24252E' justifyContent='center' mt = {1}>
                        <Tab mr = {[0,0,10,10]} borderWidth = '5px' borderStyle='none none solid none'>Posts</Tab>
                        <Tab mr = {[0,0,10,10]} borderWidth = '5px' borderStyle='none none solid none'>Followers</Tab>
                        <Tab mr = {[0,0,10,10]} borderWidth = '5px' borderStyle='none none solid none'>Submissions</Tab>
                        <Tab mr = {[0,0,10,10]} borderWidth = '5px' borderStyle='none none solid none'>Awards</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Flex flexDirection={['column', 'column', 'row', 'row']}>
                                <ProfileCard/>
                                <Flex flexDirection='column' ml = {['0px','0px',5,5]} mt = {2}  > {/*posts box */}
                                    {Posts.map((p)=>( //mapping the data of each post into a Post component
                                        <Post id = {p.id} post = {p}/>
                                    ))}
                                </Flex>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex flexDirection={['column', 'column', 'row', 'row']}>
                                <ProfileCard/>
                                <Wrap spacing = '20px' ml = {7} mt={2}>
                                    {Users.map((u)=>( //mapping the data of each post into a Post component
                                        <ProfileCardMini/>
                                    ))}
                                </Wrap>

                                <Flex flexDirection='column' ml = {['0px','0px',5,5]} mt = {2}  > {/*posts box */}
                                   
                                </Flex>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <ProfileCard/>
                        </TabPanel>
                        <TabPanel>
                            <ProfileCard/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                
            </Flex>
            


         
            
        </Box>
    )
}
