import React from 'react'

function TeacherSignin() {
   return (
        <div className="student-signin-container">
            <div>
                <h1>Teacher Sign In</h1>
                <form>
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

export default TeacherSignin