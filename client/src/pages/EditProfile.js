import React, {useState, useEffect, useContext} from 'react'
import {
    Flex,
    Box,
    Button,
    Text,
    Input,
    FormLabel,
    Center,
    IconButton,
    Textarea,
    Select
  } from '@chakra-ui/react';
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/fira-sans"
import {Link} from 'react-router-dom' 
import axios from 'axios'
import { UserContext } from '../UserContext';
import {CloseIcon, HamburgerIcon} from '@chakra-ui/icons'
import {BsImageFill} from 'react-icons/bs'
import {AiFillAudio} from 'react-icons/ai'
import { useNavigate, useParams} from 'react-router-dom';

export default function EditProfile() {
    const {name} = useParams()
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
 //   const [password, setPassword] = useState('')
    const [userId, setUserId] = useState('')
    
    const{value: user, setValue: setUser} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user){
            navigate('/login', {replace:true})
        } else if (user.username!=name){
            navigate(`/profile/${name}`, {replace:true})
        }
        const getOriginalUser = async()=>{
            const res = await axios.get(`/users/u/${name}`)
            console.log(res.data)
            await setUserId(res.data._id)
            await setUsername(res.data.username)
            await setDescription(res.data.description)
          //  await setPassword(res.data.password)
        }
        getOriginalUser()
    }, [])
    

    console.log(username,description)

    const submitProfileEdits = (e) =>{
        e.preventDefault()

        axios.put(`/users/${userId}`, {
            userId: user._id,
           // password: password,
            username: username,
            description: description,
        })
        .then((res)=>{
            console.log(res)
            let updatedUser = {
                ...user
            }
            //update the user changes locally in context api
            updatedUser.username = username
            updatedUser.description = description
            setUser(updatedUser)
            navigate(`/profile/${username}`,{replace:true})
        })
        
        setUsername('')
        setDescription('')
       // setPassword('')     
    }
    const handleDelete = () =>{
       // console.log(`THE dddddID OF THE USER IS ${user._id}`)

        axios.post(`/users/${userId}/delete`, {
            userId: user._id,
        })
        .then((res)=>{
            //console.log(res)
            navigate('/login',{replace:true})
        })
        .catch((err)=>{
            console.log(err)
            //console.log(`the id of logged in user is ${user._id}`)
            //console.log(`the post is ${post._id}`)
        })
    }

    return (
        <Flex
            overflow = 'auto'
            position = 'fixed'
            w = '100%'
            h = '100%'
            top = '0'
            bottom='0'
            left = '0'
            right = '0'
            bg = 'rgba(0,0,0,0.7)'
            flexDirection={['column','column','row','row']}
            justifyContent = 'center'
        >
             <Flex
                alignSelf = 'center'
                flexDirection = 'column'
                height= '640px'
                w = '500px'
                padding= '20px'
                backgroundColor= '#17171d'
                borderRadius= '10px'
                mt = {[0,0,0,0]}
            >   
                <Flex w = '100%' mb = {4} flexDirection = 'column'>
                    <IconButton
                        size="lg"
                        colorScheme = 'white'
                        icon={<CloseIcon/>}
                        marginRight = 'auto'
                        variant = 'ghost'
                      
                        onClick = {()=>navigate(`/profile/${user.username}`,{replace:true})}
                    />
                    <Flex 
                        fontFamily={`'raleway',san-serif`} 
                        fontWeight = '600' 
                        fontSize={[ 'lg' ,'xl', '2xl', '2xl' ]}
                        color = 'gray.300'
                        marginTop = '-40px'
                        borderStyle = 'none none solid none'
                        borderWidth = '1px'
                        alignSelf='center'
                        
                    > 
                        Edit profile:
                    
                    </Flex>
                   
                    
                </Flex>
                
                <form onSubmit={submitProfileEdits}>
                    <FormLabel fontSize = 'md' color = 'gray.400'>Username:</FormLabel>
                    <Input value = {username} onChange = {(e)=>setUsername(e.target.value)}  required height = '45px' fontSize = 'md' bg = 'blackAlpha.400'/>
                    
                    <FormLabel fontSize = 'md' color = 'gray.400'  mt = {4}>About me:</FormLabel>
                    <Textarea resize = 'none' value = {description} onChange = {(e)=>setDescription(e.target.value)} required height = '150px' fontSize = 'md' bg = 'blackAlpha.400'/>
                    
                    
                    
                    {/* 
                        <FormLabel fontSize = 'md' color = 'gray.400'>Re-enter new password:</FormLabel>
                        <Input value = {username} onChange = {(e)=>setUsername(e.target.value)}  required height = '45px' fontSize = 'md' bg = 'blackAlpha.400'/>
                   */} 

                    <Flex>
                        <Button variant = 'solid' type = 'submit' colorScheme='green' size = 'lg' mt = {7}>Save Edits</Button>
                        {/*<Button variant = 'outline' onClick = {handleDelete} colorScheme='red' size = 'md' ml = 'auto' mt = {7}>Delete User</Button>*/}
                    </Flex>
                    
                    
                </form> 
            </Flex>

            <Flex 
                mt = {[5,5,0,0]} 
                w = '400px' 
                h = '640px' 
                backgroundColor= '#17171d' 
                flexDirection = 'column'  
                borderRadius= '10px' 
                ml = {4}
                alignSelf = 'center'
            >
                <Flex 
                    fontFamily={`'raleway',san-serif`} 
                    fontWeight = '600' 
                    fontSize={[ 'lg' ,'xl', '2xl', '2xl' ]}
                    color = 'gray.300'
                    mt = '28px'
                    borderStyle = 'none none solid none'
                    borderWidth = '1px'
                    alignSelf='center'
                    
                > 
                   Attach files:

                </Flex>
                <FormLabel fontSize = 'md' color = 'gray.400' ml = {5}>Avatar:</FormLabel>
                <Center w = '362px' h = ' 200px' bg = '#111116' alignSelf = 'center' borderRadius = '10px' mt = {1} borderStyle = 'dashed' borderColor = '#525252' borderWidth = '2px'>
                    <BsImageFill size = {67} color = '#525252'/>
                    <Flex flexDirection = 'column'>
                        <Text ml = {2} color = 'gray.400'>{`Drag & drop or`}</Text>
                        <Button variant = 'outline' colorScheme = 'green' size = 'sm' ml = {2} mt = {2}>Select File</Button>
                    </Flex>
                </Center>
                <FormLabel mt = {5} fontSize = 'md' color = 'gray.400' ml = {5}>Banner:</FormLabel>
                <Center w = '362px' h = ' 200px' bg = '#111116' alignSelf = 'center' borderRadius = '10px' mt = {1} borderStyle = 'dashed' borderColor = '#525252' borderWidth = '2px'>
                    <AiFillAudio size = {67} color = '#525252'/>
                    <Flex flexDirection = 'column'>
                        <Text ml = {2} color = 'gray.400'>{`Drag & drop or`}</Text>
                        <Button variant = 'outline' colorScheme = 'green' size = 'sm' ml = {2} mt = {2}>Select File</Button>
                    </Flex>
                </Center>
            </Flex>
        </Flex>
    )
}
