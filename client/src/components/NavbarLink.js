import React from 'react'
import {
    Center,
  } from '@chakra-ui/react';

import "@fontsource/fira-sans"


export default function NavbarLink({text}){
    return(
        <Center
            paddingLeft = {[2,'0vw','0.7vw',6]}
            paddingRight = {[2,'0vw','0.7vw',6]}
            height = '80px'
            fontFamily = {`'Raleway', sans-serif`}
            fontSize = '1.1rem'
            fontWeight = '700'
        >
            {text}
        </Center>
    )
}