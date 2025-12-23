import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../../Styles/Library.css';

const Library = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="library-container">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className={`library-content ${collapsed ? 'collapsed' : ''}`}>
                <h1>Library</h1>
                <p>Manage library here.</p>
                <h1>this for test</h1>
                <h3>this test 2</h3>
            </div>
        </div>
    );
};

export default Library;
