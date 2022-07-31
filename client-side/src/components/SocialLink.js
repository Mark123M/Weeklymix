import React, { useState } from 'react'
import {
    Flex,
    Text,
    Icon,
  } from '@chakra-ui/react';
import "@fontsource/roboto"

export default function SocialLink({link, text, icon, iconColor, linkWidth}) {
    return (
        
          <Flex mt = {3} bg = 'white' w = {linkWidth} h = '35px' ml = {7} borderRadius = '30px' alignItems='center' justifyContent='center'>
            <a href = {link}>
              <Flex>
                <Icon as = {icon} w = {5} h = {5}  color = {iconColor}/>
                  <Text
                    fontSize= {['sm','sm','sm','sm']}
                    fontFamily =  {`'roboto', sans-serif`} 
                    fontWeight = '600' 
                    ml = {2}
                    color = '#3F4150'
                    display = 'inline-block'
                  >
                    {text}
                  </Text>
                </Flex>
            </a>
          </Flex>

    )
}
