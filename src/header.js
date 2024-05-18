import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'
export default function Header(props) {
    const {user,handleSetUser}=props
    // const [user, setUser] = useState({})
    // useEffect(()=>{
    //     setUser(JSON.parse(localStorage.getItem('user')))
    // },[localStorage.getItem('user')])
   console.log(user,'fhfghfg')
   const handleClick=()=>{
    console.log("fghjkghjk")
    localStorage.clear()
    handleSetUser({})
   }
    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand">Home</a>
                    <ul class="nav justify-content-center">
                    <Link to="/employeeList"className="nav-item">Employee List</Link>
                    </ul>
                    <ul class="nav justify-content-center">
                        <li className="nav-item">
                            {!isEmpty(user) && <Link to="/employeeList" className="nav-link text-center" href="#">{user?.user_Name}</Link>}
                        </li>
                         {!isEmpty(user) ?(<li className="nav-item">
                            <Link to="/logout" className="nav-link" href="#" onClick={handleClick}>logout</Link>
                        </li>):(<>
                            <li className="nav-item">
                            {isEmpty(user)&& <Link to="/register" className="nav-link" href="#">register</Link>}
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link" href="#">login</Link>
                        </li>
                        </>)}     
                       
                    </ul>
                </div>
            </nav>
        </>
    )
}