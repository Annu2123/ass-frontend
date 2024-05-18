import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
export default function Login({handleSetUser}){
    const navigate=useNavigate()
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [serverError,setServerError]=useState([])
    console.log(serverError)
    const handleSubmit=async(e)=>{
       e.preventDefault()
       const formData={
        user_Name:userName,
        password:password
       }
       console.log(formData)
       try{
           const response= await axios.post('http://localhost:3004/api/login',formData)
           console.log(response.data)
           const user=response.data
           localStorage.setItem('user',JSON.stringify(user))
           handleSetUser(user)
           setServerError([])
           navigate('/')
       }catch(err){
        console.log(err)
         setServerError(err.response.data.errors)
       }

    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>UserName</label>
            <input type="text" onChange={(e)=>{setUserName(e.target.value)}}/><br/>
            <label>Password</label>
            <input type='text' onChange={(e)=>{setPassword(e.target.value)}}/><br/>
            {serverError?.map((ele,i)=>{
                return <li key={i} style={{color:"red"}}>{ele.msg}</li>
            })}
              <input type='submit' placeholder='login'/>
        </form>
        </>
    )
}