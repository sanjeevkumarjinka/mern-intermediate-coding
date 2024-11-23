import React from 'react'

const Dashboard = () => {
  return (
    <div className='container-fluid d-flex justify-content-center align-items-center' style={{ minHeight:'80vh'}}>
            <h5>
                 Welcome to Dashboard  { localStorage.getItem('username') ? localStorage.getItem('username') : "No data please login" }
            </h5>
    </div>
  )
}

export default Dashboard