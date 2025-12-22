import React, { useState } from 'react';
import Sidebar from './Sidebar';
import {
    Plus,
    Search,
    BookOpen,
    Link as LinkIcon,
    MoreVertical,
    Edit,
    Trash2,
    CheckCircle,
    Book
} from 'lucide-react';
import '../../Styles/Subjects.css';

const Subjects = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [subjects, setSubjects] = useState([
        { id: 1, name: 'Mathematics', code: 'MATH101', teacher: 'Dr. Sarah Smith', students: 120, status: 'active' },
        { id: 2, name: 'Physics', code: 'PHY101', teacher: 'Prof. Michael Jones', students: 85, status: 'active' },
        { id: 3, name: 'Chemistry', code: 'CHE101', teacher: 'Dr. Emily Brown', students: 95, status: 'active' },
        { id: 4, name: 'English Literature', code: 'ENG101', teacher: 'Ms. Emma Wilson', students: 110, status: 'active' },
        { id: 5, name: 'Computer Science', code: 'CS101', teacher: 'Mr. David Lee', students: 78, status: 'active' }
    ]);

    const filteredSubjects = subjects.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="subjects-container">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className={`subjects-content ${collapsed ? 'collapsed' : ''}`}>
                <div className="subjects-header">
                    <div className="header-info">
                        <h1>Subjects Management</h1>
                        <p>Configure curriculum, assign teachers and manage subject resources</p>
                    </div>
                    <button className="btn btn-primary">
                        <Plus size={18} />
                        <span>Add New Subject</span>
                    </button>
                </div>

                <div className="subjects-actions">
                    <div className="search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search by subject name or code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="subjects-grid">
                    {filteredSubjects.map(subject => (
                        <div key={subject.id} className="subject-card">
                            <div className="subject-card-header">
                                <div className="subject-icon">
                                    <BookOpen size={24} />
                                </div>
                                <div className="subject-meta">
                                    <span className="subject-code">{subject.code}</span>
                                    <h3>{subject.name}</h3>
                                </div>
                                <button className="btn-icon">
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            <div className="subject-info">
                                <div className="info-item">
                                    <span>Primary Instructor</span>
                                    <strong>{subject.teacher}</strong>
                                </div>
                                <div className="info-item">
                                    <span>Enrolled Students</span>
                                    <strong>{subject.students}</strong>
                                </div>
                            </div>

                            <div className="subject-footer">
                                <div className="status-tag">
                                    <CheckCircle size={14} />
                                    <span>Active</span>
                                </div>
                                <div className="footer-actions">
                                    <button className="btn-text">
                                        <Edit size={16} />
                                        <span>Edit</span>
                                    </button>
                                    <button className="btn-text danger">
                                        <Trash2 size={16} />
                                        <span>Remove</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Subjects;
