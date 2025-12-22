import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../../Styles/Events.css';

const Events = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="events-container">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className={`events-content ${collapsed ? 'collapsed' : ''}`}>
                <h1>Events</h1>
                <p>Manage events here.</p>
            </div>
        </div>
    );
};

export default Events;
