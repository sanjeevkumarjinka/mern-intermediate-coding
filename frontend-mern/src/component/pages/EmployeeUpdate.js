import React, { useState } from 'react'
import { useFormik } from 'formik'
import {  updateForm } from '../../validation/formValidation'
import { NavLink, useParams } from 'react-router-dom'
import axio from 'axios'
import { toast , ToastContainer } from 'react-toastify'
import { Bars  } from 'react-loader-spinner'
import {  ref , uploadBytes , getDownloadURL  }  from 'firebase/storage'
import {  storage } from '../../firebase/firebase.config'

const EmployeeUpdate = () => {

    const { id } = useParams()

    const initialstate = {
        username : "",
        email : "",
        mobilenumber : "",
        designation : "",
        gender : "",
        course : "",
   }

   const [image , setImage ] = useState('')

   const [loading , setLoading ] = useState(false)
    
   const {   values , errors,  handleChange , handleSubmit } = useFormik({
          initialValues : initialstate,   
          validationSchema: updateForm,
          onSubmit: async (data)=>{
                 const data1 = {
                   id ,
                   data,
                   image
                 }
                 setLoading(true)
                try{
                    const result = await axio.patch('http://localhost:3002/api/user' ,  data1) 
                    if(result){
                     
                        toast.success(result.data.message)
                        setLoading(false)
                    }   
                }
                catch(err){
                       
                     setLoading(false)

                     if(err.response.status === 403){
                          return toast.error(err.response.data.message)
                     }
                    
                     if(err.response.status === 500){
                         return toast.error(`Duplicate ${err.response.data.message.slice(62,75)}`)
                     }

                     if(err.response.status === 499){
                        return toast.error(err.response.data.message)    
                      }
                   
                     return toast.error(err.message)
                }
          }
   })

   const [toggle , setToggle] = useState(false)



   const imageUploadHandler = async (e)=>{
      if(e.target.files[0].name.split('.')[1] === 'png' || e.target.files[0].name.split('.')[1] === 'jpg'){
         setLoading(true)
       const fireref = ref(storage , `images/ ${ e.target.files[0].name +  new Date().getTime() }`)   
       await uploadBytes(fireref , e.target.files[0]).then((res)=>{
           getDownloadURL(fireref).then((url)=>{ 
               setImage(url)
               console.log(url)
               setLoading(false)
           })
       })      
      
     }

   }
       
  return (
    <div className='container-fluid p-0'>
         <div className='container-fluid d-flex align-items-center' style={{minHeight:'100vh'}}>
            <div className='container  shadow d-flex flex-column justify-content-center align-items-center p-2 border b-2' style={{width:'20rem' , minHeight:'20vh'}}>
                    <div className='p-2'>
                        <h5 className='fw-light'>Update Employee</h5>
                    </div>
                    <form onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
                         <div>
                            <label className='form-label'>UserName</label>
                            <input  type='text' placeholder='Enter UserName' className='form-control' name='username' onFocus={()=> setToggle(true)}  value={values.username} onChange={handleChange} />
                            { errors.username  && <p className='m-0 p-0 text-danger fw-lighter'>{errors.username}</p>}
                         </div>
                         <div>
                            <label className='form-label'>Email Address</label>
                            <input type='email' placeholder='Enter Email Address' className='form-control' name='email' value={values.email} onChange={handleChange} />
                            { errors.email  && <p className='m-0 p-0 text-danger fw-lighter'>{errors.email}</p>}
                         </div>
                         <div>
                            <label className='form-label'>Mobile Number</label>
                            <input  type='number' placeholder='Enter Mobile Number' className='form-control'  name='mobilenumber' value={values.mobilenumber} onChange={handleChange} />
                            { errors.mobilenumber  && <p className='m-0 p-0 text-danger fw-lighter'>{errors.mobilenumber}</p>}
                         </div>
                         <div>
                            <label className='form-label'>Designation</label>
                            <select className='form-select' name='designation' value={values.designation}  onChange={handleChange}>
                                <option value=""  disabled defaultChecked>select options</option>
                                <option value="hr">hr</option>
                                <option value="manager">manager</option>
                                <option value="sales">sales</option>
                            </select>
                            { errors.designation  && <p className='m-0 p-0 text-danger fw-lighter'>{errors.designation}</p>}
                         </div>
                         <div>
                           <div className='d-flex gap-5'>
                              <label className='form-label'>Gender</label>
                              <div className='form-check'>
                                 <input type='radio' name='gender'  className='form-check-input' value="male"     onChange={handleChange} />
                                 <label className='form-check-label'>Male</label> 
                              </div>
                              <div className='form-check'>
                                 <input type='radio' name='gender' className='form-check-input' value="female"  onChange={handleChange} />
                                 <label className='form-check-label'>Female</label> 
                              </div>
                              </div>
                              <div>
                                { errors.gender  && <p className='m-0 p-0 text-danger fw-lighter'>{errors.gender}</p>}
                              </div>
                         </div>
                         <div className='d-flex gap-5'>
                            <label className='form-label'>Course</label>
                            <div>
                                <div className='form-check'>
                                    <input type='checkbox'  name='course' className='form-check-input' value="MCA" onChange={handleChange} />
                                    <label className='form-check-label'>MCA</label>
                                </div>
                                <div className='form-check'>
                                    <input type='checkbox' name='course' className='form-check-input'  value="BCA" onChange={handleChange} />
                                    <label className='form-check-label'>BCA</label>
                                </div>
                                <div className='form-check'>
                                    <input type='checkbox' name='course' className='form-check-input'  value="BSC" onChange={handleChange} />
                                    <label className='form-check-label'>BSC</label>
                                </div>
                            </div>
                            { errors.course  && <p className='m-0 p-0 text-danger fw-lighter'>{errors.course}</p>}
                         </div>
                         <div>
                            <label className='form-label'>Image</label>
                            <input type='file' name='img' className='form-control'  accept='.png,.jpg'   onChange={(e)=> imageUploadHandler(e) } />
                             {
                                image === ''  && toggle && <p className='text-danger'>Required Field</p>
                             }
                         </div>
                         
                         {
                            loading ?
                            <button className='btn btn-primary d-flex justify-content-center'>
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
                            <button className='btn btn-primary'>Update</button>
                         }
                        
                    </form>
            </div>
         </div>
         <ToastContainer />
    </div> 
  )
}

export default EmployeeUpdate