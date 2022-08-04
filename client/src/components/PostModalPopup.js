import React, {useState, useContext} from 'react'
import {
    Flex,
    Image,
    Box,
    Button,
    Text,
    Input,
    FormLabel,
  } from '@chakra-ui/react';
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/fira-sans"
import {Link} from 'react-router-dom' 
import axios from 'axios'
import { UserContext } from '../UserContext';

export default function PostModalPopup({isOpened}) {
    
    if(!isOpened) return null
    return (
        <Box
            position = 'fixed'
         
            w = '100%'
            h = '100%'
            top = '0'
            bottom='0'
            left = '0'
            right = '0'
            bg = 'rgba(0,0,0,0.7)'
            zIndex = '2'
        >
            
        </Box>
    )
}
