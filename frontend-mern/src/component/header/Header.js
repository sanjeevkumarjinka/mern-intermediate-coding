import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Header = () => {
  return (
    <div className='container-fluid p-0'>
        <div className='container-fluid shadow bg-white d-flex justify-content-around align-items-center p-2 '>
            <h5>MERN-TASK</h5>
             
             {
                 localStorage.getItem('username') ? 
                    <div className='d-flex gap-4'>
                       <NavLink to='/' className='btn fw-lighter' style={{ border:"transparent" }}>DashBoard</NavLink>
                       <button  className='btn fw-lighter' style={{ border:"transparent" }} onClick={()=> window.location.href = '/employeelist' }>EmployeeList</button>
                       <NavLink to='/' className='btn btn-info text-white' onClick={()=> {localStorage.clear(); window.location.href = '/'}}>LogOut</NavLink>
                    </div> 
                  :
                  <NavLink to='/login' className='btn btn-outline-primary'>LogIn</NavLink>
             }
             
        </div>
        <Outlet />
    </div>
  )
}

export default Header