import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { BookOpen, User, Clock, Calendar } from 'lucide-react';
import '../../Styles/StudentStyle/StudentDashboard.css'; // Reusing dashboard styles for consistency

const Classes = () => {
    const [classes, setClasses] = useState([
        { id: 1, name: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: '101', schedule: 'Mon, Wed, Fri (08:00 - 09:30)' },
        { id: 2, name: 'Physics', teacher: 'Mr. David Brown', room: '201', schedule: 'Tue, Thu (09:00 - 10:30)' },
        { id: 3, name: 'English Literature', teacher: 'Ms. Emily Wilson', room: '102', schedule: 'Mon, Wed (10:00 - 11:30)' },
        { id: 4, name: 'Computer Science', teacher: 'Mr. Robert Miller', room: 'Lab 1', schedule: 'Tue, Thu (11:00 - 12:30)' },
        { id: 5, name: 'Chemistry', teacher: 'Dr. Michael Chen', room: '202', schedule: 'Fri (10:00 - 12:00)' },
        { id: 6, name: 'History', teacher: 'Mrs. Lisa Davis', room: '103', schedule: 'Mon, Wed (13:00 - 14:30)' },
    ]);

    return (
        <div className="student-dashboard">
            <Sidebar />
            <div className="student-dashboard-content">
                <div className="dashboard-header">
                    <h2>My Classes</h2>
                </div>

                <div className="dashboard-card" style={{ marginTop: '20px' }}>
                    <div className="classes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
                        {classes.map((cls) => (
                            <div key={cls.id} className="class-card" style={{
                                border: '1px solid #eee',
                                borderRadius: '8px',
                                padding: '20px',
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <div style={{ backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '50%', color: '#1976d2' }}>
                                        <BookOpen size={24} />
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#333' }}>{cls.name}</h3>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666' }}>
                                    <User size={16} />
                                    <span>{cls.teacher}</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666' }}>
                                    <Clock size={16} />
                                    <span>{cls.schedule}</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666' }}>
                                    <Calendar size={16} />
                                    <span>Room {cls.room}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Classes;
