import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../../Styles/Settings.css';

const Settings = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="settings-container">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className={`settings-content ${collapsed ? 'collapsed' : ''}`}>
                <h1>Settings</h1>
                <p>Manage settings here.</p>
            </div>
        </div>
    );
};

export default Settings;
