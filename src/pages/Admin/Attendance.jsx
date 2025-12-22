import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../../Styles/Attendance.css';
import {
    Users,
    CheckCircle,
    XCircle,
    Clock,
    Search,
    Save,
    Download
} from 'lucide-react';

const Attendance = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('students');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedGrade, setSelectedGrade] = useState('10');
    const [selectedSection, setSelectedSection] = useState('A');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Students Data
    const [students] = useState([
        { id: 'ST001', name: 'John Smith', roll: '101', grade: '10', section: 'A' },
        { id: 'ST002', name: 'Emma Johnson', roll: '102', grade: '10', section: 'A' },
        { id: 'ST003', name: 'Michael Chen', roll: '103', grade: '10', section: 'A' },
        { id: 'ST004', name: 'Sophia Rodriguez', roll: '104', grade: '10', section: 'A' },
        { id: 'ST005', name: 'William Taylor', roll: '105', grade: '10', section: 'B' },
        { id: 'ST006', name: 'Olivia Brown', roll: '106', grade: '10', section: 'B' },
        { id: 'ST007', name: 'James Wilson', roll: '107', grade: '11', section: 'A' },
        { id: 'ST008', name: 'Isabella Garcia', roll: '108', grade: '11', section: 'A' },
    ]);

    // Mock Teachers Data
    const [teachers] = useState([
        { id: 'TC001', name: 'Dr. Sarah Johnson', subject: 'Mathematics' },
        { id: 'TC002', name: 'Mr. David Miller', subject: 'Physics' },
        { id: 'TC003', name: 'Ms. Emily Brown', subject: 'English' },
    ]);

    // Attendance State: { id: status }
    const [studentAttendance, setStudentAttendance] = useState({
        'ST001': 'present',
        'ST002': 'present',
        'ST003': 'absent',
        'ST004': 'late',
    });

    const [teacherAttendance, setTeacherAttendance] = useState({
        'TC001': 'present',
        'TC002': 'late',
    });

    // Filtered Students
    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            (selectedGrade === 'all' || student.grade === selectedGrade) &&
            (selectedSection === 'all' || student.section === selectedSection) &&
            (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.id.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [students, selectedGrade, selectedSection, searchTerm]);

    // Filtered Teachers
    const filteredTeachers = useMemo(() => {
        return teachers.filter(teacher =>
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [teachers, searchTerm]);

    // Stats Calculation
    const stats = useMemo(() => {
        const studentStats = {
            total: students.length,
            present: Object.values(studentAttendance).filter(s => s === 'present').length,
            absent: Object.values(studentAttendance).filter(s => s === 'absent').length,
            late: Object.values(studentAttendance).filter(s => s === 'late').length,
        };
        const teacherStats = {
            total: teachers.length,
            present: Object.values(teacherAttendance).filter(s => s === 'present').length,
            absent: Object.values(teacherAttendance).filter(s => s === 'absent').length,
            late: Object.values(teacherAttendance).filter(s => s === 'late').length,
        };
        return { students: studentStats, teachers: teacherStats };
    }, [students, teachers, studentAttendance, teacherAttendance]);

    // Handlers
    const handleStatusChange = (id, status, type = 'students') => {
        if (type === 'students') {
            setStudentAttendance(prev => ({
                ...prev,
                [id]: prev[id] === status ? null : status
            }));
        } else {
            setTeacherAttendance(prev => ({
                ...prev,
                [id]: prev[id] === status ? null : status
            }));
        }
    };

    const markAllPresent = () => {
        if (activeTab === 'students') {
            const newAtt = { ...studentAttendance };
            filteredStudents.forEach(s => newAtt[s.id] = 'present');
            setStudentAttendance(newAtt);
        } else {
            const newAtt = { ...teacherAttendance };
            filteredTeachers.forEach(t => newAtt[t.id] = 'present');
            setTeacherAttendance(newAtt);
        }
    };

    const handleSave = () => {
        alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} attendance saved for ${selectedDate}`);
    };

    return (
        <div className="attendance-container">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className={`attendance-content ${collapsed ? 'collapsed' : ''}`}>
                {/* Header */}
                <header className="attendance-header">
                    <div className="header-info">
                        <h1>Attendance Management</h1>
                        <p>Track daily attendance for students and staff</p>
                    </div>
                    <div className="header-actions">
                        <button className="btn btn-secondary">
                            <Download size={18} />
                            <span>Export Data</span>
                        </button>
                        <button className="btn btn-primary" onClick={handleSave}>
                            <Save size={18} />
                            <span>Save Changes</span>
                        </button>
                    </div>
                </header>

                {/* Main Stats */}
                <div className="attendance-stats">
                    <div className="stat-card">
                        <div className="stat-icon total">
                            <Users size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{activeTab === 'students' ? stats.students.total : stats.teachers.total}</h3>
                            <p>Total {activeTab === 'students' ? 'Students' : 'Teachers'}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon present">
                            <CheckCircle size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{activeTab === 'students' ? stats.students.present : stats.teachers.present}</h3>
                            <p>Present Today</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon absent">
                            <XCircle size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{activeTab === 'students' ? stats.students.absent : stats.teachers.absent}</h3>
                            <p>Absent Today</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon late">
                            <Clock size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{activeTab === 'students' ? stats.students.late : stats.teachers.late}</h3>
                            <p>Late Arrivals</p>
                        </div>
                    </div>
                </div>

                {/* Filters and Tabs */}
                <div className="attendance-filters">
                    <div className="filter-group">
                        <div className="search-box">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="select-filters">
                            <button
                                className={`btn ${activeTab === 'students' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setActiveTab('students')}
                            >
                                Students
                            </button>
                            <button
                                className={`btn ${activeTab === 'teachers' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setActiveTab('teachers')}
                            >
                                Teachers
                            </button>
                        </div>
                    </div>
                    <div className="date-picker">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                </div>

                {/* Secondary Filters for Students */}
                {activeTab === 'students' && (
                    <div className="attendance-filters" style={{ marginTop: '-15px', background: 'transparent', boxShadow: 'none' }}>
                        <div className="select-filters">
                            <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
                                <option value="all">All Grades</option>
                                <option value="9">Grade 9</option>
                                <option value="10">Grade 10</option>
                                <option value="11">Grade 11</option>
                                <option value="12">Grade 12</option>
                            </select>
                            <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
                                <option value="all">All Sections</option>
                                <option value="A">Section A</option>
                                <option value="B">Section B</option>
                                <option value="C">Section C</option>
                            </select>
                        </div>
                        <button className="btn btn-secondary btn-sm" onClick={markAllPresent}>
                            Mark All Present
                        </button>
                    </div>
                )}

                {/* Table Section */}
                <div className="attendance-table-card">
                    <div className="table-header">
                        <h2>{activeTab === 'students' ? `Student List - ${selectedGrade}${selectedSection}` : 'Teacher Attendance List'}</h2>
                    </div>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>{activeTab === 'students' ? 'Student' : 'Teacher'}</th>
                                    <th>{activeTab === 'students' ? 'Roll / ID' : 'Subject / ID'}</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeTab === 'students' ? (
                                    filteredStudents.map(student => (
                                        <tr key={student.id}>
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-avatar">{student.name.charAt(0)}</div>
                                                    <div className="student-info">
                                                        <strong>{student.name}</strong>
                                                        <span>{student.id}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{student.roll}</td>
                                            <td>
                                                <div className="status-controls">
                                                    <button
                                                        className={`status-btn present ${studentAttendance[student.id] === 'present' ? 'active' : ''}`}
                                                        onClick={() => handleStatusChange(student.id, 'present')}
                                                    >
                                                        <CheckCircle size={14} /> P
                                                    </button>
                                                    <button
                                                        className={`status-btn absent ${studentAttendance[student.id] === 'absent' ? 'active' : ''}`}
                                                        onClick={() => handleStatusChange(student.id, 'absent')}
                                                    >
                                                        <XCircle size={14} /> A
                                                    </button>
                                                    <button
                                                        className={`status-btn late ${studentAttendance[student.id] === 'late' ? 'active' : ''}`}
                                                        onClick={() => handleStatusChange(student.id, 'late')}
                                                    >
                                                        <Clock size={14} /> L
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    filteredTeachers.map(teacher => (
                                        <tr key={teacher.id}>
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-avatar">{teacher.name.charAt(0)}</div>
                                                    <div className="student-info">
                                                        <strong>{teacher.name}</strong>
                                                        <span>{teacher.id}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{teacher.subject}</td>
                                            <td>
                                                <div className="status-controls">
                                                    <button
                                                        className={`status-btn present ${teacherAttendance[teacher.id] === 'present' ? 'active' : ''}`}
                                                        onClick={() => handleStatusChange(teacher.id, 'present', 'teachers')}
                                                    >
                                                        <CheckCircle size={14} /> P
                                                    </button>
                                                    <button
                                                        className={`status-btn absent ${teacherAttendance[teacher.id] === 'absent' ? 'active' : ''}`}
                                                        onClick={() => handleStatusChange(teacher.id, 'absent', 'teachers')}
                                                    >
                                                        <XCircle size={14} /> A
                                                    </button>
                                                    <button
                                                        className={`status-btn late ${teacherAttendance[teacher.id] === 'late' ? 'active' : ''}`}
                                                        onClick={() => handleStatusChange(teacher.id, 'late', 'teachers')}
                                                    >
                                                        <Clock size={14} /> L
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;