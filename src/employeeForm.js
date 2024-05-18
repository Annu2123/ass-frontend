import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
export default function EmployeeForm({handleAdd}) {
    const navigate=useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState('')
    const [designation, setDesignation] = useState("")
    const [gender, setGender] = useState('')
    const [course, setCourse] = useState([])
    const [img, setImg] = useState()
    const[serverError,setServerError]=useState([])
    const handleChange=(val)=>{
        setCourse([...course,val])
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = {
            name: name,
            email: email,
            mobile_No: mobile,
            designation: designation,
            gender: gender,
            course: course,
            img: img
        }
        console.log("sdfghhgfd",formData)
       try{
         const response=await axios.post('http://localhost:3004/api/employee/create',formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
         }       
         )
         console.log(response.data)
         handleAdd(response.data)
         navigate('/')
       }catch(err){
        console.log(err)
        setServerError(err.response?.data?.errors)
       }
    }
    return (
        <>
            <form onSubmit={handleSubmit} >
                <label>Name</label>
                <input type="text" onChange={(e) => { setName(e.target.value) }} /><br />
                <label>Email</label>
                <input type="text" onChange={(e) => { setEmail(e.target.value) }} /><br />
                <label>Mobile Number</label>
                <input type="number" onChange={(e) => { setMobile(e.target.value) }} /><br />
                <label>designation</label>
                <select onChange={(e) => { setDesignation(e.target.value) }}>
                    <option value=""></option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="sales">sales</option>
                </select><br />
                <label>Gender:</label>
                <input type="radio" name="gender" value="male" id="male" onChange={(e)=>{setGender(e.target.value)}} />
                <label for="male">Male</label>
                <input type="radio" name="gender" value="female" id="female" onChange={(e)=>{setGender(e.target.value)}} />
                <label for="female">Female</label><br />
                <label>
                    <input type="checkbox" name="option1" value="MCA" onChange={(e)=>{handleChange(e.target.value)}}/>
                        MCA
                </label>
                <label>
                    <input type="checkbox" name="option2" value="BCA" onChange={(e)=>{handleChange(e.target.value)}}/>
                        BCA
                </label>
                <label>
                    <input type="checkbox" name="option3" value="BSC" onChange={(e)=>{handleChange(e.target.value)}}/>
                       BSC
                </label><br/>
                <input type="file" id="img" onChange={(e)=>{setImg(e.target.files[0])}}/><br/>
                {serverError?.map((ele,i)=>{
                    return <li key={i} style={{color:"red"}}>{ele.msg}</li>
                })}
                <input type="submit"/>
            </form>
        </>
    )
}