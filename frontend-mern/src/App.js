import React from 'react'
import { BrowserRouter , Routes , Route  , useNavigate} from 'react-router-dom'
import Header from './component/header/Header'
import Dashboard from './component/Dashboard'
import Register from './component/pages/Register'
import Login from './component/pages/Login'
import EmployeeList from './component/pages/EmployeeList'
import EmployeeUpdate from './component/pages/EmployeeUpdate'



const App = () => {

  // const navigate = useNavigate()

  return (
    <div>
        <BrowserRouter >
         <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Header />}>
                <Route path='/' element={<Dashboard />} />
                 { localStorage.getItem('username') &&
                 <>
                 <Route path='/employeelist' element={<EmployeeList />} />
                 <Route path='/employeeupdate/:id' element={<EmployeeUpdate />}/>
                 </>
                }
                 
                <Route path='/*' element={<div>Please Login</div>} />
              
            </Route>
         </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
