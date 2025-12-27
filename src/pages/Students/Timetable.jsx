import React from 'react';
import Sidebar from './Sidebar';
import { Clock } from 'lucide-react';
import '../../Styles/StudentStyle/StudentDashboard.css';

const Timetable = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const periods = [
        { time: '08:00 - 08:45', id: 1 },
        { time: '08:45 - 09:30', id: 2 },
        { time: '09:30 - 10:15', id: 3 },
        { time: '10:15 - 10:45', id: 'break', label: 'BREAK' },
        { time: '10:45 - 11:30', id: 4 },
        { time: '11:30 - 12:15', id: 5 },
    ];

    // Mock schedule data
    const schedule = {
        'Monday': { 1: 'Math', 2: 'Physics', 3: 'English', 4: 'Chemistry', 5: 'History' },
        'Tuesday': { 1: 'Biology', 2: 'Chemistry', 3: 'Math', 4: 'Physics', 5: 'Comp. Sci' },
        'Wednesday': { 1: 'English', 2: 'History', 3: 'Geography', 4: 'Math', 5: 'Physics' },
        'Thursday': { 1: 'Physics', 2: 'Math', 3: 'Chemistry', 4: 'Biology', 5: 'PE' },
        'Friday': { 1: 'Comp. Sci', 2: 'English', 3: 'History', 4: 'Geography', 5: 'Math' },
    };

    return (
        <div className="student-dashboard">
            <Sidebar />
            <div className="student-dashboard-content">
                <div className="dashboard-header">
                    <h2>Weekly Timetable</h2>
                </div>

                <div className="dashboard-card" style={{ marginTop: '20px', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f5f5f5' }}>
                                <th style={{ padding: '15px', border: '1px solid #ddd' }}>Time / Day</th>
                                {days.map(day => (
                                    <th key={day} style={{ padding: '15px', border: '1px solid #ddd', color: '#1976d2' }}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {periods.map((period) => (
                                <tr key={period.id || period.label}>
                                    <td style={{ padding: '15px', border: '1px solid #ddd', fontWeight: 'bold', color: '#555', backgroundColor: '#fafafa' }}>
                                        {period.time}
                                    </td>
                                    {period.id === 'break' ? (
                                        <td colSpan={5} style={{ padding: '10px', backgroundColor: '#e0f7fa', color: '#006064', letterSpacing: '2px', fontWeight: 'bold' }}>
                                            SHORT BREAK
                                        </td>
                                    ) : (
                                        days.map(day => (
                                            <td key={`${day}-${period.id}`} style={{ padding: '15px', border: '1px solid #ddd' }}>
                                                <div style={{ fontWeight: '500' }}>{schedule[day]?.[period.id] || '-'}</div>
                                            </td>
                                        ))
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Timetable;
