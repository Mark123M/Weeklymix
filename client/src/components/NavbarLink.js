import React from 'react'
import {
    Center,
  } from '@chakra-ui/react';

import "@fontsource/fira-sans"


export default function NavbarLink({text}){
    return(
        <Center
            marginLeft = {[2,'0vw','0.7vw',5]}
            marginRight = {[2,'0vw','0.7vw',5]}
            height = '70px'
            fontFamily = {`'Raleway', sans-serif`}
            fontSize = '1.0rem'
            fontWeight = '700'
        >
            {text}
        </Center>
    )
}