import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles/StudentSignin.css';

function StudentSignin() {
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        navigate('/student/dashboard');
    }

    return (
        <div className="student-signin-container">
            <div>
                <h1>Student Sign In</h1>
                <form onSubmit={handleSignIn}>
                    <div>
                        <label htmlFor="Id">Id Number:</label>
                        <input type="Id" id="Id" name="Id" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default StudentSignin