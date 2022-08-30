import React, {useState, useContext} from 'react'
import {
    Flex,
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
import axios from 'axios'
import { UserContext } from '../UserContext';
import {CloseIcon} from '@chakra-ui/icons'
import {BsImageFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import Compressor from 'compressorjs';
//klraz63n
export default function NewPost() {
    
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [postType, setPostType] = useState('')
    const{value: user, setValue: setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const [image, setImage] = useState(null)
    const [inputKey, setInputKey] = useState(0)

    //console.log(title,desc,postType)

    const handleImageChange = (e) =>{
        if(e.target.files[0].size > 10000000){
            alert("Cover picture is too big. (>10mb)");
            setInputKey(inputKey+1)
         }
         else{
            setImage(e.target.files[0])
         }
    }

    const submitNewPost = (e) =>{
        e.preventDefault()
        if(!user){
            navigate('/login', { replace: true })
        }

        new Compressor(image, {
            quality: 0.6,
            width: 300,
            height: 300,
            // The compression process is asynchronous,
            // which means you have to access the `result` in the `success` hook function.
            success(result) {

                // Send the compressed image file to server with XMLHttpRequest.
                const data = new FormData()
                data.append("file", result, result.name)
                data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
                data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
        
                axios.post(process.env.REACT_APP_CLOUDINARY_API_URL, data)
                .then((res)=>{
                    //console.log(res.data.secure_url)
                    axios.post(`/posts/`, {
                        userId: user._id,
                        image: res.data.secure_url,
                        postType: postType,
                        title: title,
                        description: desc,
                    })
                    .then((res)=>{
                        //console.log(res)
                        setImage(null)
                        navigate('/discussions',{replace:true})
                    })
                })
            },
            error(err) {
                axios.post(`/posts/`, {
                    userId: user._id,
                    postType: postType,
                    title: title,
                    description: desc,
                })
                .then((res)=>{
                    //console.log(res)
                    navigate('/discussions',{replace:true})
                })
                //console.log(err.message);
            },
        });
        
        setTitle('')
        setDesc('')
        setPostType('')     
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
                height= '600px'
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
                      
                        onClick = {()=>navigate('/discussions')}
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
                        Create new post:
                    
                    </Flex>
                   
                    
                </Flex>
                
                <form onSubmit={submitNewPost}>
                    <FormLabel fontSize = 'md' color = 'gray.400'>Title:</FormLabel>
                    <Input value = {title} onChange = {(e)=>setTitle(e.target.value)}  required height = '45px' fontSize = 'md' bg = 'blackAlpha.400'/>
                    
                    <FormLabel fontSize = 'md' color = 'gray.400'  mt = {4}>Description:</FormLabel>
                    <Textarea resize = 'none' value = {desc} onChange = {(e)=>setDesc(e.target.value)} required height = '200px' fontSize = 'md' bg = 'blackAlpha.400'/>

                    <Select value = {postType} onChange = {(e)=>setPostType(e.target.value)} outline = 'solid 1px #5E5B5A' variant = 'filled' colorScheme = 'blue' required mt = {7}>
                        <option value=''>Select a channel</option>
                        <option value='Announcements'>Announcements</option>
                        <option value='Discussion'>Discussion</option>
                        <option value='Feedback'>Feedback</option>
                        <option value='Off topic'>Off topic</option>
                    </Select>


                    <Button variant = 'solid' type = 'submit' colorScheme='orange' size = 'lg' mt = {7}>Create Post</Button>
                    <Text fontSize='sm' mt = {2} color = '#707070'>Please be respectful to others.</Text>
                </form> 
            </Flex>

            <Flex 
                mt = {[5,5,0,0]} 
                w = '450px' 
                h = '600px' 
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
                   Add/Edit files:

                </Flex>
                <FormLabel fontSize = 'md' color = 'green.200' mt = {4} ml = {5}>{`New post picture: (max 10mb)`}</FormLabel>
                <Center flexDirection = 'column' w = '410px' h = ' 360px' bg = '#111116' alignSelf = 'center' borderRadius = '10px' mt = {1} borderStyle = 'dashed' borderColor = '#525252' borderWidth = '2px'>
                    <BsImageFill size = {67} color = '#525252'/>
                        {/*<Text ml = {2} color = 'green.200'>{`Drag & drop or`}</Text>*/}
                        {/*<Button variant = 'outline' colorScheme = 'green' size = 'sm' ml = {2} mt = {2}>Select File</Button>*/}     
                    <Flex mt = {3}>
                        <form>
                            <Input key = {inputKey} accept = 'image/*' onChange = {(e)=>handleImageChange(e)} variant = 'outline' type="file" name="profilePicture" width = '300px' pt = '3px'/>
                            <Button onClick = {()=>setImage(null)} type = 'reset' variant = 'outline' colorScheme = 'green' size = 'sm' ml = {2}>Clear</Button>
                        </form>
                    </Flex>
                </Center>
            </Flex>
        
        </Flex>
    )
}
