import React from 'react';
import Sidebar from './Sidebar';
import '../../Styles/Assignments.css';

const Assignments = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="assignments-container">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className={`assignments-content ${collapsed ? 'collapsed' : ''}`}>
                <h1>Assignments</h1>
                <p>Manage assignments here.</p>
            </div>
        </div>
    );
};

export default Assignments;
