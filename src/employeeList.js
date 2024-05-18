import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
export default function EmployeeList({employees,handleDelete}){
    const navigate=useNavigate()
const handleRemove=async(id)=>{
    const userConfirm=window.confirm("are you sure")
    if(userConfirm){
        try{
            const response= await axios.delete(`http://localhost:3004/api/employee/remove/${id}`)
            console.log(response.data)
          handleDelete(response.data)
          navigate('/')
           }catch(err){
            console.log(err)
           }
    }
 
}
const handleEmployee=()=>{
    navigate('/employeeForm')
}
    return (
        <>
        <div className="d-flex justify-content-end  mr-4" >
            <button type="button" className="btn btn-warning" onClick={handleEmployee}>create Employee</button>
            </div>
         <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Unique Id</th>
                    <th>image</th>
                    <th>name</th>
                    <th>email</th>
                    <th>mobile</th>
                    <th>designation</th>
                    <th>gender</th>
                    <th>course</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {employees?.map((ele)=>{
                    return <tr key={ele._id}>
                        <td>{ele._id}</td>
                        <td> <img src={`http://localhost:3004/uploads/${ele.img}`} style={{width:"80px",height:"80px"}} /></td>
                        <td>{ele.name}</td>
                        <td>{ele.email}</td>
                        <td>{ele.mobile}</td>
                        <td>{ele.designation}</td>
                        <td>{ele.gender}</td>
                        <td>{ele.course.map((ele)=>{
                            return ele
                        })}</td>
                        <td><Link to={`/employeeEdit/${ele._id}`}><button type="button" className="btn btn-primary">
                            edit</button></Link>
                            <button type="button"  className="btn btn-danger" onClick={()=>{handleRemove(ele._id)}}>
                               delete </button></td>
                    </tr>
                })}
            </tbody>
         </table>
        </>
    )
}