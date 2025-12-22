import React, { useState } from 'react';
import Sidebar from './Sidebar';
import {
    Clock,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Plus,
    Download,
    Columns,
    User,
    Book
} from 'lucide-react';
import '../../Styles/TimeTable.css';

const TimeTable = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeGrade, setActiveGrade] = useState('10A');

    const grades = ['9A', '9B', '10A', '10B', '11A', '11B', '12A'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const slots = [
        '08:30 - 09:15',
        '09:15 - 10:00',
        '10:15 - 11:00',
        '11:00 - 11:45',
        '12:45 - 01:30',
        '01:30 - 02:15'
    ];

    return (
        <div className="timetable-container">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className={`timetable-content ${collapsed ? 'collapsed' : ''}`}>
                <div className="timetable-header">
                    <div className="header-info">
                        <h1>Academic TimeTable</h1>
                        <p>Manage class schedules, teacher assignments and room allocations</p>
                    </div>
                    <div className="header-actions">
                        <button className="btn btn-secondary">
                            <Download size={18} />
                            <span>Export PDF</span>
                        </button>
                        <button className="btn btn-primary">
                            <Plus size={18} />
                            <span>New Schedule</span>
                        </button>
                    </div>
                </div>

                <div className="timetable-controls">
                    <div className="grade-selector">
                        <label>Select Grade:</label>
                        <div className="grade-chips">
                            {grades.map(grade => (
                                <button
                                    key={grade}
                                    className={`grade-chip ${activeGrade === grade ? 'active' : ''}`}
                                    onClick={() => setActiveGrade(grade)}
                                >
                                    {grade}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="view-selector">
                        <button className="btn-icon active"><Columns size={18} /></button>
                        <button className="btn-icon"><Calendar size={18} /></button>
                    </div>
                </div>

                <div className="timetable-wrapper">
                    <div className="timetable-grid">
                        <div className="time-column">
                            <div className="grid-header">Time</div>
                            {slots.map(slot => (
                                <div key={slot} className="time-slot-label">{slot}</div>
                            ))}
                        </div>
                        {days.map(day => (
                            <div key={day} className="day-column">
                                <div className="grid-header">{day}</div>
                                {slots.map((slot, i) => (
                                    <div key={i} className="schedule-slot">
                                        {/* Sample Data for 10A */}
                                        {i === 0 && day === 'Monday' && (
                                            <div className="subject-box science">
                                                <strong>Physics</strong>
                                                <span>Prof. Jones</span>
                                                <small>Room 402</small>
                                            </div>
                                        )}
                                        {i === 2 && day === 'Monday' && (
                                            <div className="subject-box math">
                                                <strong>Calculus</strong>
                                                <span>Dr. Smith</span>
                                                <small>Room 105</small>
                                            </div>
                                        )}
                                        {i === 1 && day === 'Tuesday' && (
                                            <div className="subject-box english">
                                                <strong>English Lit</strong>
                                                <span>Ms. Wilson</span>
                                                <small>Library B</small>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeTable;
