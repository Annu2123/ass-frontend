import { useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
export default function EmployeeEditForm({handleEdit, employees}) {
    const {id}= useParams()
    const navigate=useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState('')
    const [designation, setDesignation] = useState("")
    const [gender, setGender] = useState('')
    const [course, setCourse] = useState([])
    const [serverError,setServerError]=useState([])
    const [img, setImg] = useState()
    const employee=employees.find(ele => ele._id==id)
    console.log(id)
    console.log("emddf",employee)
    const [editform,setEditForm]=useState(employee ? {
        name: employee?.name,
        email: employee?.email,
        mobile_No: employee?.mobile_No,
        designation: employee?.designation,
        gender: employee?.gender,
        course: employee?.course,
        img: employee?.img
         }:{
            name:'',
            email: '',
            mobile_No: '',
            designation:'',
            gender: '',
            course: course,
            img: ''
         }
     
         )
    const handleChange=(val)=>{
        setCourse([...course,val])
    }
    console.log(course)
//   const filteremployee=()=>{
//      return employees.find((ele)=>{
//         if(ele._id = id){
//             return ele
//         }
//     })
//   }
   
//     console.log("sdfggfds",filteremployee())
    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = {
            name:editform.name ,
            email: editform.email,
            mobile_No: editform. mobile_No,
            designation:  editform.designation,
            gender:  editform.gender,
            course: course,
            img:  editform.img
        }
        console.log("sdfghhgfd",formData)
       try{
         const response=await axios.put(`http://localhost:3004/api/update/employee/${id}`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
         })
         console.log(response.data)
         handleEdit(response.data)
         navigate('/')
       }catch(err){
        console.log(err)
        setServerError(err.response.data.errors)
       }
    } 
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'file' ? e.target.files[0] : value;
        setEditForm({ ...editform, [name]: newValue });
    };
    return (
        <>
            <form onSubmit={handleSubmit} >
                <label>Name</label>
                <input type="text"  name="name" value={editform.name} onChange={handleInputChange}  /><br />
                <label>Email</label>
                <input type="text"  name="email" value={editform.email}  onChange={handleInputChange} /><br />
                <label>Mobile Number</label>
                <input type="number"  name="mobile_No"  value={editform.mobile_No}  onChange={handleInputChange} /><br />
                <label>designation</label>
                <select onChange={handleInputChange}>
                    <option value=""></option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="sales">sales</option>
                </select><br />
                <label>Gender:</label>
                <input type="radio" name="gender" value="male" id="male" onChange={handleInputChange} />
                <label for="male">Male</label>
                <input type="radio" name="gender" value="female" id="female" onChange={handleInputChange} />
                <label for="female">Female</label><br />
                <label>course </label>
                    <input type="checkbox" name="option1" value="MCA" onChange={handleChange}/>
                        MCA
                    <input type="checkbox" name="option2" value="BCA" onChange={handleChange}/>
                        BCA
               
                    <input type="checkbox" name="option3" value="BSC" onChange={handleChange}/>
                       BSC
               <br/>
                <input type="file" id="img" onChange={handleInputChange}/><br/>
                {serverError?.map((ele,i)=>{
                    return <li key={i} style={{color:"red"}}>{ele.msg}</li>
                })}
                <input type="submit"/>
            </form>
        </>
    )
}