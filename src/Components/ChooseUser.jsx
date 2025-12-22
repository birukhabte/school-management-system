

import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/ChooseUser.css';

function ChooseUser() {
  return (
   
     <div className='choose-user-container'>
        <div><h1>Admin</h1>
        <Link to="/admin/signin">
  <button>Login as Admin</button>
</Link>
        </div>
        <div><h1>Student</h1>
        <Link to="/Student/signin">
  <button>Login as Student</button>
</Link>
        </div>
        
        <div>
            <h1>Teacher</h1>
            <Link to="/Teacher/signin">
  <button>Login as Teacher</button>
</Link>
        </div>
        </div>
        
        
    
    

  )
}

export default ChooseUser