import React from 'react';
import Sidebar from './Sidebar';
import { CalendarCheck, CheckCircle, XCircle } from 'lucide-react';
import '../../Styles/StudentStyle/StudentDashboard.css';

const Attendance = () => {
    // Mock data for attendance
    const attendanceData = [
        { id: 1, date: '2024-03-01', status: 'Present', checkIn: '07:55 AM', checkOut: '02:10 PM' },
        { id: 2, date: '2024-03-04', status: 'Present', checkIn: '08:00 AM', checkOut: '02:05 PM' },
        { id: 3, date: '2024-03-05', status: 'Absent', checkIn: '-', checkOut: '-' },
        { id: 4, date: '2024-03-06', status: 'Present', checkIn: '07:50 AM', checkOut: '02:15 PM' },
        { id: 5, date: '2024-03-07', status: 'Present', checkIn: '08:05 AM', checkOut: '02:00 PM' },
    ];

    const summary = {
        totalDays: 20,
        present: 18,
        absent: 2,
        percentage: 90
    };

    return (
        <div className="student-dashboard">
            <Sidebar />
            <div className="student-dashboard-content">
                <div className="dashboard-header">
                    <h2>My Attendance</h2>
                </div>

                {/* Summary Card */}
                <div className="dashboard-grid" style={{ marginBottom: '20px' }}>
                    <div className="dashboard-card" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '20px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '2rem', color: '#2196f3' }}>{summary.percentage}%</h3>
                            <span style={{ color: '#666' }}>Attendance Rate</span>
                        </div>
                        <div style={{ borderLeft: '1px solid #eee', height: '40px' }}></div>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#4caf50' }}>{summary.present}</h3>
                            <span style={{ color: '#666' }}>Days Present</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#f44336' }}>{summary.absent}</h3>
                            <span style={{ color: '#666' }}>Days Absent</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="attendance-list">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                                    <th style={{ padding: '12px' }}>Date</th>
                                    <th style={{ padding: '12px' }}>Status</th>
                                    <th style={{ padding: '12px' }}>Check In</th>
                                    <th style={{ padding: '12px' }}>Check Out</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData.map((item) => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                        <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <CalendarCheck size={16} color="#666" />
                                            {item.date}
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '12px',
                                                fontSize: '0.85rem',
                                                backgroundColor: item.status === 'Present' ? '#e8f5e9' : '#ffebee',
                                                color: item.status === 'Present' ? '#2e7d32' : '#c62828',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}>
                                                {item.status === 'Present' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                                {item.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px' }}>{item.checkIn}</td>
                                        <td style={{ padding: '12px' }}>{item.checkOut}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
