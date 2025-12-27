import React from 'react';
import Sidebar from './Sidebar';
import { User, Lock, Bell, Moon, Save } from 'lucide-react';
import '../../Styles/StudentStyle/StudentDashboard.css';

const Settings = () => {
    return (
        <div className="student-dashboard">
            <Sidebar />
            <div className="student-dashboard-content">
                <div className="dashboard-header">
                    <h2>Account Settings</h2>
                </div>

                <div className="settings-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                    {/* Profile Settings */}
                    <div className="dashboard-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                            <User size={20} color="#1976d2" />
                            <h3 style={{ margin: 0 }}>Profile Information</h3>
                        </div>
                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Full Name</label>
                                <input type="text" defaultValue="John Smith" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Email</label>
                                <input type="email" defaultValue="john.smith@school.edu" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} disabled />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Phone Number</label>
                                <input type="tel" defaultValue="+1 (555) 123-4567" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                            </div>
                        </div>
                    </div>

                    {/* Notification & Theme */}
                    <div className="dashboard-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                            <Bell size={20} color="#1976d2" />
                            <h3 style={{ margin: 0 }}>Preferences</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>Email Notifications</span>
                                <input type="checkbox" defaultChecked />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>SMS Notifications</span>
                                <input type="checkbox" />
                            </div>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="dashboard-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                            <Lock size={20} color="#1976d2" />
                            <h3 style={{ margin: 0 }}>Security</h3>
                        </div>
                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Current Password</label>
                                <input type="password" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>New Password</label>
                                <input type="password" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            <Save size={18} /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
