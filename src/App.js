import { useEffect, useState } from 'react';
import './App.css';
import Header from './header';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminDashborad from './adminDashboard';
import Login from './login';
import Register from './register';
import EmployeeForm from './employeeForm';
import axios from 'axios';
import EmployeeList from './employeeList';
import EmployeeEditForm from './employeeEdit-form';
function App() {
  const[employees,setEmployees]=useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))|| null)
  const handleSetUser = (userData)=>{
    setUser(userData)
  }
  
  useEffect(()=>{
    (async()=>{
       try{
        const response=await axios.get('http://localhost:3004/api/employee/list')
        console.log(response.data)
        setEmployees(response.data)
       }catch(err){
        console.log(err)
       }
    })()
  },[])
  const handleEdit=(data)=>{
       const Newemployees=employees.map((ele)=>{
           if(ele._id == data._id){
            return data
           }else{
            return ele
           }
       })
       setEmployees(Newemployees)
  }
  const handleDelete=(data)=>{
     const employee=employees.filter((ele)=>{
      if(ele._id != data._id){
        return ele
      }
     })
     setEmployees(employee)
  }
  const handleAdd=(data)=>{
    setEmployees([...employees,data])
  }
  // const handelEdit=(val)=>{
  //   const editemployee=employees.map((ele)=>{
  //     if(ele._id != val._id){
  //       return val
  //     }else{
  //       return ele
  //     }
  //    })
  //    setEmployees(editemployee)
  // }
  return (
    <BrowserRouter>
     <div className="App">
      <Header user={user} handleSetUser={handleSetUser}/>
       <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login handleSetUser={handleSetUser}/>}/>
         <Route path='/employeeList' element={<EmployeeList handleDelete={handleDelete}  employees={employees}/>}/>
         <Route path='/employeeForm' element={<EmployeeForm handleAdd={handleAdd}/>}/>
      <Route path='/' element={<AdminDashborad  employees={employees}  handleDelete={handleDelete}/>}/>
      <Route path='/employeeEdit/:id' element={<EmployeeEditForm  employees={employees} handleEdit={handleEdit} />}/>
    </Routes>
    </div>
    </BrowserRouter>
   
  );
}

export default App;
