import React from 'react';
import Sidebar from './Sidebar';
import { BarChart2, Calendar, Clock } from 'lucide-react';
import '../../Styles/StudentStyle/StudentDashboard.css';

const Exams = () => {
    const exams = [
        { id: 1, subject: 'Mathematics', date: '2024-03-25', time: '10:00 AM', duration: '3 hours', type: 'Term Exam' },
        { id: 2, subject: 'Physics', date: '2024-03-28', time: '09:30 AM', duration: '2.5 hours', type: 'Unit Test' },
        { id: 3, subject: 'Chemistry', date: '2024-04-02', time: '11:00 AM', duration: '2 hours', type: 'Lab Exam' },
        { id: 4, subject: 'English', date: '2024-04-05', time: '10:30 AM', duration: '3 hours', type: 'Term Exam' },
        { id: 5, subject: 'Computer Science', date: '2024-04-08', time: '09:00 AM', duration: '2 hours', type: 'Practical' },
    ];

    return (
        <div className="student-dashboard">
            <Sidebar />
            <div className="student-dashboard-content">
                <div className="dashboard-header">
                    <h2>Exam Schedule</h2>
                </div>

                <div className="dashboard-card" style={{ marginTop: '20px' }}>
                    <div className="exams-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '10px' }}>
                        {exams.map((exam) => (
                            <div key={exam.id} className="exam-card" style={{ border: '1px solid #eee', borderRadius: '8px', padding: '20px', backgroundColor: '#fff', borderLeft: '4px solid #1976d2' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                                    <h3 style={{ margin: 0, color: '#333' }}>{exam.subject}</h3>
                                    <span style={{ fontSize: '0.8rem', backgroundColor: '#e3f2fd', color: '#1565c0', padding: '2px 8px', borderRadius: '4px' }}>{exam.type}</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#666', marginTop: '15px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Calendar size={16} />
                                        <span>{new Date(exam.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Clock size={16} />
                                        <span>{exam.time} ({exam.duration})</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exams;
