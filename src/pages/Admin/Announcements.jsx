import React from 'react';
import Sidebar from './Sidebar';
import '../../Styles/Announcements.css';

const Announcements = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="announcements-container">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className={`announcements-content ${collapsed ? 'collapsed' : ''}`}>
                <h1>Announcements</h1>
                <p>Manage announcements here.</p>
            </div>
        </div>
    );
};

export default Announcements;
