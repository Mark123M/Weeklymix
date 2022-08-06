import React from 'react'
import {
    Button,
  } from '@chakra-ui/react';

import "@fontsource/fira-sans"


export default function ChannelBtn({bg, handleClick, text}){
    return(
        <Button
            colorScheme = 'gray'
            variant = 'ghost' 
            textColor = 'white'
            mt = {7} 
            fontSize= {[ 'xs' ,'sm', 'lg', 'lg' ]} 
            fontFamily =  {`'fira sans', sans-serif`} 
            fontWeight = '500' 
            onClick={handleClick}

            textDecoration = 'underline'
            textDecorationColor = {bg}
            textDecorationThickness={4}
            textUnderlineOffset={6}
        >
            {text}
        </Button>
    )
}