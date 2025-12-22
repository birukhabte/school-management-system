import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AdminSignin.css';

const AdminSignin = () => {

    return (
        <div className="admin-signin-container">
            <div>
                <h1>Admin Sign In</h1>
                <form>
                    <div>
                        <label htmlFor="Id">Id Number:</label>
                        <input type="Id" id="Id" name="Id" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <Link to='/admin/dashboard'>
                        <button type="submit">Sign In</button></Link>
                </form>
            </div>
        </div>
    );
};

export default AdminSignin;
