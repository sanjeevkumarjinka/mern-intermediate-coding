import React, { useState } from 'react'
import {  useFormik } from 'formik'
import { NavLink , useNavigate } from 'react-router-dom'
import { toast , ToastContainer  } from 'react-toastify'
import axio from 'axios'
import{ Bars }from 'react-loader-spinner'

const Login = () => {
   
  const initialState = {
       username : "",
       password : ""
  }
  
  const navigate = useNavigate()

   const [loading , setLoading] = useState(false)

  const { values , handleChange , handleSubmit } = useFormik({
        initialValues:initialState,
        onSubmit : async (data)=>{  
              setLoading(true)
            try{
                 const result  = await axio.post('http://localhost:3002/api/user' , data )
                 if(result){
                     
                      localStorage.setItem('username' , result.data.data.username)
                      toast.success(result.data.message)
                      setLoading(false)
                      setTimeout(()=>{
                          navigate('/')
                      },1500)
                 }
            }
            catch(err){
                 
                  setLoading(false)
                  if(err.response.status === 403){
                    return toast.error(err.response.data.message)    
                  }
                  if(err.response.status === 499){
                    return toast.error(err.response.data.message)    
                  }
                  else{
                      return toast.error(err.message)
                  }
            }
        }
  })

  const [passTog , setPassTog] = useState(false)
 
 
  return (
    <div className='container-fluid p-0'>
         <div className='container-fluid d-flex align-items-center' style={{minHeight:'100vh'}}>
            <div className='container w-25 shadow d-flex flex-column rounded justify-content-center align-items-center p-2 border b-2' style={{width:'' , minHeight:'20vh'}}>
                    <div className='p-2'>
                        <h5 className='fw-light'>LogIn Form</h5>
                    </div>
                    <form onSubmit={handleSubmit} className='w-100  p-2  d-flex flex-column gap-2'>
                         <div>
                            <label className='form-label'>UserName</label>
                            <input  type='text' placeholder='Enter UserName' className='form-control' name='username'  value={values.username} onChange={handleChange} />
                         </div>
                         <div style={{ position:'relative'}}>
                            <label className='form-label'>Password</label>
                            <input type={passTog ? 'text' : 'password'} placeholder='Enter Email Address' className='form-control' name='password' value={values.password} onChange={handleChange} />
                            <div style={{ position:"absolute", right:'0' , top:'1.7rem'}}>
                                {
                                   passTog ? 
                                   <p className='btn fs-5' style={{border:'transparent'}} onClick={()=> setPassTog(false)}><i className="bi bi-eye"></i></p>
                                   :
                                   <p className='btn fs-5' style={{border:'transparent'}} onClick={()=>setPassTog(true)}><i className="bi bi-eye-slash"></i></p>
                                }
                            </div>
                         </div>
                          
                          {
                              loading ?
                              <button className='btn btn-outline-primary d-flex justify-content-center'>
                                    <Bars
                                       height="20"
                                       width="20"
                                       color="#000"
                                       ariaLabel="bars-loading"
                                       wrapperStyle={{}}
                                       wrapperClass=""
                                       visible={true}
                                     />
                              </button>
                              :

                              <button className='btn btn-outline-primary'>
                                    LogIn
                              </button>
                          }

                         <div className='text-center'>
                            <p className='fw-light'>Don't have an account?<NavLink to='/register'>Register</NavLink> </p>
                         </div>
                     </form>

                  </div>
              </div>

              <ToastContainer  />
     </div>
              
  )
}

export default Login