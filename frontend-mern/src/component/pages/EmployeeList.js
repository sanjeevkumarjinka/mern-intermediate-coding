import React, { useState ,  useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axio from 'axios'
import { toast , ToastContainer } from 'react-toastify'



const EmployeeList = () => {


   const [data , setData] = useState([])

   const [currentPage , setCurrentPage] = useState(1)

   const [sort , setSort ] = useState(undefined)
   
  //  const sortHandler = async()=>{
  //       try{

  //       }
  //       catch(err){

  //       }
  //  }
   
   const allUserHandler = async () => {
     try{
       const result = await axio.get(`http://localhost:3002/api/all/${sort}`)
       if(result){
         console.log(result.data.data)
         setData(result.data.data)
         setTotalPages(Math.ceil( result.data.data.length / 10))
        }
      }
      catch(err){
        console.log(err.message)
      }
    }
    
    console.log(data?.length)
    
    const [totalPages , setTotalPages] = useState(0)
    console.log(totalPages)     


   const userDeleteHandler = async (id)=>{
          console.log(id)
           try{
              const result = await axio.delete(`http://localhost:3002/api/user/${id}`)
              if(result){
                  toast.success(result.data.message)
                  setTimeout(()=>{
                       window.location.reload()
                  }, 2000)
              }
           }
           catch(err){
               console.log(err.message)
           }
   }


   const [search , setSearch ] = useState('')


   let res = []
   


   useEffect(()=>{
       if(search.length > 0){
         setTotalPages(Math.ceil(res.length / 10))
       }
       else{
        setTotalPages(Math.ceil(data.length / 10))
       }
   }, [res])

    useEffect(()=>{
         allUserHandler() 
    },[sort])
   
    return (
    <div className='container-fluid p-0'>
       <div className='container-fluid p-4 d-flex flex-column gap-4'>
             <div className='container-fluid d-flex justify-content-between align-items-center'>
                  <form className='d-flex gap-5'>
                      <div>
                        <label className='form-label'>Searching</label>
                        <input className='form-control' type='text' placeholder='Searching...' onChange={(e)=> setSearch(e.target.value)} />
                      </div>
                      <div>
                          <label className='form-label'>Sort</label>
                          <select className='form-select' onChange={(e)=> setSort(e.target.value)}>
                              <option value='' disabled selected> Select Option </option>
                              <option value='username'>username</option>
                              <option value='email'>email</option>
                          </select>
                      </div>
                  </form>
                  <div>
                      <h6>TotalCount : {data?.length}</h6>
                  </div>
                  <div>
                    <NavLink  to='/register' className='btn btn-outline-secondary'>CreateEmployee</NavLink>
                  </div>
             </div>
             <div className='container-fluid'>
             <div className='table-responsive'>
                     <table class="table table-hover">
                            <thead>
                              <tr> 
                                <th scope="col">Unique Id</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope='col'>Mobile No</th>
                                <th scope='col'>Designation</th>
                                <th scope='col'>Gender</th>
                                <th scope='col'>Course</th>
                                <th scope='col'>Create Date</th>
                                <th scope='col'>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                                {
                                     res = data?.filter((itms)=> itms.username.toLowerCase().includes(search))?.slice((currentPage-1) * 10 , (currentPage * 10 ))?.map((i,index)=>(
                                        <tr key={index}>
                                        <td>{i._id}</td>
                                        <td>  
                                            <img style={{width:'2.5rem' , height:'2.5rem'}} className='rounded' src={i.image} alt='image' />
                                        </td>
                                        <td>{i.username}</td>
                                        <td>{i.email}</td>
                                        <td>{i.mobilenumber}</td>
                                        <td>{i.designation}</td>
                                        <td>{i.gender}</td>
                                        <td>{i.course.toString()}</td>
                                        <td> { new Date(parseInt(i.createAt)).toString().slice(0,15)}</td>
                                        <td>
                                            <div className='d-flex gap-2'>
                                                <NavLink to={`/employeeupdate/${i._id}`} className='btn btn-primary' style={{ border:'transparent'}}><i className="bi bi-pencil-square"></i></NavLink>
                                                <button className='btn btn-danger' style={{ border:'transparent'}}  onClick={()=>userDeleteHandler(i._id)} ><i className='bi bi-trash'></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                   ))
                                }

                               {
                                 res.length === 0 && <div>
                                     <p>No Data Found.</p>
                                 </div>
                               }

                             <div className='d-flex gap-1 p-4'>
                                    <button className='btn btn-primary previous-page' onClick={()=> currentPage <= 1 ? setCurrentPage(totalPages) : setCurrentPage(currentPage-1)}>Prev</button>
                                      {
                                        [...Array(totalPages)].map((itm,i)=>(
                                              <button className={ currentPage - 1 === i ? "btn  btn-info" : 'btn btn-danger'}  onClick={()=> setCurrentPage(i+1)} > {i+1} </button>
                                        ))
                                      }
                                    <button className='btn btn-primary next-page' onClick={()=> currentPage < totalPages ? setCurrentPage(currentPage + 1) : setCurrentPage(1)  } >Next</button>
                                  </div>
                            </tbody>
                     </table>
             </div>
             </div>
       </div>
       <ToastContainer />
    </div>
  )
}

export default EmployeeList