import { useNavigate } from "react-router-dom"
import EmployeeList from "./employeeList"

export default function AdminDashborad({ employees ,handleDelete}){
    const navigate=useNavigate()
    const handleEmployee=()=>{
        navigate('/employeeForm')
    }
    return (
        <>
         <h1>Admin Dashborad</h1>
         {/* <div className="d-flex justify-content-end  mr-4" >
            <button type="button" className="btn btn-warning" onClick={handleEmployee}>Add Employee</button>
            </div> */}
           <EmployeeList  employees={employees} handleDelete={handleDelete} />
        </>
    )
}