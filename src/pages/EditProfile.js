import React, {useState, useEffect, useContext} from "react"
import {
    Flex,
    Button,
    Input,
    FormLabel,
    Center,
    IconButton,
    Textarea,
  } from "@chakra-ui/react";
import "@fontsource/raleway"
import "@fontsource/roboto"
import "@fontsource/fira-sans"
import axios from "axios"
import { UserContext } from "../UserContext";
import {CloseIcon} from "@chakra-ui/icons"
import {BsImageFill} from "react-icons/bs"
import { useNavigate, useParams} from "react-router-dom";
import Compressor from "compressorjs"

export default function EditProfile() {
    const {name} = useParams()
    const [username, setUsername] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
 //   const [password, setPassword] = useState("")
    const [userId, setUserId] = useState("")

    const [pfp, setPfp] = useState(null)
    const [inputKey, setInputKey] = useState(0)
    const [cover, setCover] = useState(null)
    
    const{value: user, setValue: setUser} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user){
            navigate("/login", {replace:true})
        } else if (user.username!=name){
            navigate(`/profile/${name}`, {replace:true})
        }
        const getOriginalUser = async()=>{
            const res = await axios.get(`/users/u/${name}`)
            //console.log(res.data)
            setUserId(res.data._id)
            setUsername(res.data.username)
            setLocation(res.data.location)
            setDescription(res.data.description)

          //  await setPassword(res.data.password)
        }
        getOriginalUser()
    }, [])
    

    //console.log(username,description)

    const submitProfileEdits = (e) =>{
        e.preventDefault()

        if(pfp!= null){
            handleAvatarUpload()
        }
        if(cover != null){
            handleCoverUpload()
        }
    
        axios.put(`/users/${userId}`, {
            userId: user._id,
           // password: password,
            username: username,
            location: location,
            description: description,
        })
        .then((res)=>{
            axios.get(`/users/${userId}`)
            .then((res)=>{
                setUser(res.data)
                //console.log(res.data)
                navigate(`/profile/${username}`,{replace:true})
            })

            
        })
        
        setUsername("")
        setLocation("")
        setDescription("")
    }

    const handlePfpChange = (e) =>{
       
        if(e.target.files[0].size > 2097152){
            alert("Profile picture is too big. (>2mb)");
            setInputKey(inputKey+1)
         }
         else{
            setPfp(e.target.files[0])
         }
    }
    const handleCoverChange = (e) =>{
       
        if(e.target.files[0].size > 10000000){
            alert("Cover picture is too big. (>10mb)");
            setInputKey(inputKey+1)
         }
         else{
            setCover(e.target.files[0])
         }
    }

    ////console.log( process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET, process.env.REACT_APP_CLOUDINARY_CLOUD_NAME , process.env.REACT_APP_CLOUDINARY_API_URL )
    const handleAvatarUpload = () =>{

        new Compressor(pfp, {
            quality: 0.6,
            width: 150,
            height: 150,
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
                    axios.put(`/users/${userId}`, {
                        userId: user._id,
                        profilePic: res.data.secure_url
                    })
                    .then((res)=>{
                        //console.log(res)
                    })
                    //update the user changes locally in context api
            
                    axios.get(`/users/${userId}`)
                    .then((res)=>{
                        setUser(res.data)
                        //console.log(res.data)
                    })
        
                    setPfp(null)
                })
            },
            error(err) {
                //console.log(err.message);
            },
        });
    }

    const handleCoverUpload = () =>{

        new Compressor(cover,{
            quality: 0.6,
            width: 400,
            height: 400,
            success(result) {
                //console.log("upload cover")
                const data = new FormData()
                data.append("file", result, result.name)
                data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
                data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)

                axios.post(process.env.REACT_APP_CLOUDINARY_API_URL, data)
                .then((res)=>{
                    //console.log(res.data.secure_url)
                    axios.put(`/users/${userId}`, {
                        userId: user._id,
                        coverPic: res.data.secure_url
                    })
                    .then((res)=>{
                        //console.log(res)
                    })
                    //update the user changes locally in context api
                    
                    axios.get(`/users/${userId}`)
                    .then((res)=>{
                        setUser(res.data)
                        //console.log(res.data)
                    })
                    setCover(null)
                })
            },
            error(err) {
                //console.log(err.message)
            },
        })

        
    }

    //console.log(pfp, cover)

    return (
        <Flex
            overflow = "auto"
            position = "fixed"
            w = "100%"
            h = "100%"
            top = "0"
            bottom="0"
            left = "0"
            right = "0"
            bg = "rgba(0,0,0,0.7)"
            flexDirection={["column","column","row","row"]}
            justifyContent = "center"
        >
             <Flex
                alignSelf = "center"
                flexDirection = "column"
                height= "630px"
                w = "500px"
                padding= "20px"
                backgroundColor= "#17171d"
                borderRadius= "10px"
                mt = {[0,0,0,0]}
            >   
                <Flex w = "100%" mb = {4} flexDirection = "column">
                    <IconButton
                        size="lg"
                        colorScheme = "white"
                        icon={<CloseIcon/>}
                        marginRight = "auto"
                        variant = "ghost"
                      
                        onClick = {()=>navigate(`/profile/${user.username}`,{replace:true})}
                    />
                    <Flex 
                        fontFamily={`"raleway",san-serif`} 
                        fontWeight = "600" 
                        fontSize={[ "lg" ,"xl", "2xl", "2xl" ]}
                        color = "gray.300"
                        marginTop = "-40px"
                        borderStyle = "none none solid none"
                        borderWidth = "1px"
                        alignSelf="center"
                        
                    > 
                        Edit profile:
                    </Flex>
                   
                    
                </Flex>
                
                <form onSubmit={submitProfileEdits}>
                    <FormLabel fontSize = "md" color = "green.200">Username:</FormLabel>
                    <Input value = {username} onChange = {(e)=>setUsername(e.target.value)}  required height = "45px" fontSize = "md" bg = "blackAlpha.400"/>

                    <FormLabel mt = {4} fontSize = "md" color = "green.200">Location:</FormLabel>
                    <Input value = {location} onChange = {(e)=>setLocation(e.target.value)}  required height = "45px" fontSize = "md" bg = "blackAlpha.400"/>
                    
                    <FormLabel fontSize = "md" color = "green.200"  mt = {4}>About me:</FormLabel>
                    <Textarea resize = "none" value = {description} onChange = {(e)=>setDescription(e.target.value)} required height = "150px" fontSize = "md" bg = "blackAlpha.400"/>

                    <Button variant = "solid" type = "submit" colorScheme="green" size = "lg" mt = {7}>Save Edits</Button>
                    
                    <FormLabel fontSize = "sm" color = "gray.400" mt = {4}>*Some changes may take a while to save</FormLabel>
                     
                </form> 
            </Flex>

            <Flex 
                mt = {[5,5,0,0]} 
                w = "450px" 
                h = "630px" 
                backgroundColor= "#17171d" 
                flexDirection = "column"  
                borderRadius= "10px" 
                ml = {4}
                alignSelf = "center"
            >
                <Flex 
                    fontFamily={`"raleway",san-serif`} 
                    fontWeight = "600" 
                    fontSize={[ "lg" ,"xl", "2xl", "2xl" ]}
                    color = "gray.300"
                    mt = "28px"
                    borderStyle = "none none solid none"
                    borderWidth = "1px"
                    alignSelf="center"
                    
                > 
                   Edit files:

                </Flex>
                <FormLabel fontSize = "md" color = "green.200" ml = {5}>{`New Profile picture: (max 2mb)`}</FormLabel>
                <Center flexDirection = "column" w = "410px" h = " 220px" bg = "#111116" alignSelf = "center" borderRadius = "10px" mt = {1} borderStyle = "dashed" borderColor = "#525252" borderWidth = "2px">
                    <BsImageFill size = {67} color = "#525252"/>
                    <Flex mt = {3}>
                        <form>
                            <Input key = {inputKey} accept = "image/*" onChange = {(e)=>handlePfpChange(e)} variant = "outline" type="file" name="profilePicture" width = "300px" pt = "3px"/>
                            <Button onClick = {()=>setPfp(null)} type = "reset" variant = "outline" colorScheme = "green" size = "sm" ml = {2}>Clear</Button>
                        </form>
                        
                    </Flex>
                    
                </Center>
                <FormLabel mt = {5} fontSize = "md" color = "green.200" ml = {5}>{`New Cover picture: (max 10mb)`}</FormLabel>
                <Center flexDirection = "column" w = "410px" h = " 220px" bg = "#111116" alignSelf = "center" borderRadius = "10px" mt = {1} borderStyle = "dashed" borderColor = "#525252" borderWidth = "2px">
                    <BsImageFill size = {67} color = "#525252"/>
                    <Flex mt = {3}>
                        <form>
                            <Input key = {inputKey} accept = "image/*" onChange = {(e)=>handleCoverChange(e)} variant = "outline" type="file" name="coverPicture" width = "300px" pt = "3px"/>
                            <Button onClick = {()=>setCover(null)} type = "reset" variant = "outline" colorScheme = "green" size = "sm" ml = {2}>Clear</Button>
                        </form>
                    </Flex>
                </Center>
            </Flex>
        </Flex>
    )
}
