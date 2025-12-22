import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../../Styles/Teacher.css';
import {
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Calendar,
  CheckCircle,
  XCircle,
  MoreVertical,
  Download,
  Plus,
  Users,
  Award
} from 'lucide-react';

const Teachers = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      phone: '+1 234 567 8900',
      subjects: ['Mathematics', 'Physics'],
      classes: ['Grade 10-A', 'Grade 11-B'],
      status: 'active',
      experience: '8 years',
      qualification: 'PhD in Mathematics',
      joiningDate: '2022-03-15'
    },
    {
      id: 2,
      name: 'Mr. Michael Chen',
      email: 'michael.chen@school.edu',
      phone: '+1 234 567 8901',
      subjects: ['English Literature'],
      classes: ['Grade 9-C', 'Grade 10-B'],
      status: 'active',
      experience: '5 years',
      qualification: 'MA in English',
      joiningDate: '2023-01-10'
    },
    {
      id: 3,
      name: 'Ms. Emma Williams',
      email: 'emma.williams@school.edu',
      phone: '+1 234 567 8902',
      subjects: ['Chemistry', 'Biology'],
      classes: ['Grade 12-A'],
      status: 'inactive',
      experience: '6 years',
      qualification: 'MSc in Chemistry',
      joiningDate: '2021-08-22'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    subjects: [],
    classes: [],
    status: 'active'
  });

  const [assignData, setAssignData] = useState({
    teacherId: '',
    subjects: [],
    classes: []
  });

  const availableSubjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'English', 'History', 'Geography', 'Computer Science',
    'Art', 'Music', 'Physical Education'
  ];

  const availableClasses = [
    'Grade 9-A', 'Grade 9-B', 'Grade 9-C',
    'Grade 10-A', 'Grade 10-B', 'Grade 10-C',
    'Grade 11-A', 'Grade 11-B', 'Grade 11-C',
    'Grade 12-A', 'Grade 12-B', 'Grade 12-C'
  ];

  // Filter teachers based on search and status
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjects.some(subject =>
        subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus = filterStatus === 'all' || teacher.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddTeacher = (e) => {
    e.preventDefault();
    const newTeacherObj = {
      id: teachers.length + 1,
      ...newTeacher,
      joiningDate: new Date().toISOString().split('T')[0]
    };
    setTeachers([...teachers, newTeacherObj]);
    setShowAddForm(false);
    setNewTeacher({
      name: '',
      email: '',
      phone: '',
      qualification: '',
      experience: '',
      subjects: [],
      classes: [],
      status: 'active'
    });
  };

  const handleDeleteTeacher = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setTeachers(teachers.map(teacher =>
      teacher.id === id
        ? { ...teacher, status: teacher.status === 'active' ? 'inactive' : 'active' }
        : teacher
    ));
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    setTeachers(teachers.map(teacher =>
      teacher.id === assignData.teacherId
        ? {
          ...teacher,
          subjects: [...new Set([...teacher.subjects, ...assignData.subjects])],
          classes: [...new Set([...teacher.classes, ...assignData.classes])]
        }
        : teacher
    ));
    setShowAssignForm(false);
    setAssignData({ teacherId: '', subjects: [], classes: [] });
  };

  const handleSubjectSelect = (subject) => {
    setAssignData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleClassSelect = (className) => {
    setAssignData(prev => ({
      ...prev,
      classes: prev.classes.includes(className)
        ? prev.classes.filter(c => c !== className)
        : [...prev.classes, className]
    }));
  };

  const exportTeachers = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Subjects', 'Classes', 'Status', 'Qualification', 'Experience'],
      ...teachers.map(t => [
        t.name,
        t.email,
        t.phone,
        t.subjects.join('; '),
        t.classes.join('; '),
        t.status,
        t.qualification,
        t.experience
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teachers.csv';
    a.click();
  };

  return (
    <div className="teachers-container">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`teachers-content ${collapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <div className="teachers-header">
          <div>
            <h1>Teacher Management</h1>
            <p>Manage all teacher records, assignments, and information</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={exportTeachers}>
              <Download size={18} />
              <span>Export</span>
            </button>
            <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
              <UserPlus size={18} />
              <span>Add New Teacher</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="teachers-stats">
          <div className="stat-card">
            <div className="stat-icon total">
              <Users size={24} />
            </div>
            <div className="stat-info">
              <h3>{teachers.length}</h3>
              <p>Total Teachers</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon active">
              <CheckCircle size={24} />
            </div>
            <div className="stat-info">
              <h3>{teachers.filter(t => t.status === 'active').length}</h3>
              <p>Active Teachers</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon experience">
              <Award size={24} />
            </div>
            <div className="stat-info">
              <h3>{Math.round(teachers.reduce((sum, t) => sum + parseInt(t.experience), 0) / teachers.length)}</h3>
              <p>Avg. Experience</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon subjects">
              <BookOpen size={24} />
            </div>
            <div className="stat-info">
              <h3>{[...new Set(teachers.flatMap(t => t.subjects))].length}</h3>
              <p>Subjects Covered</p>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="filters-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search teachers by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-controls">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="btn btn-secondary">
              <Filter size={18} />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Teachers Table */}
        <div className="teachers-table-container">
          <table className="teachers-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Contact</th>
                <th>Subjects</th>
                <th>Classes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map(teacher => (
                <tr key={teacher.id}>
                  <td>
                    <div className="teacher-info">
                      <div className="avatar">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <strong>{teacher.name}</strong>
                        <small>{teacher.qualification}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div><Mail size={14} /> {teacher.email}</div>
                      <div><Phone size={14} /> {teacher.phone}</div>
                    </div>
                  </td>
                  <td>
                    <div className="subjects-list">
                      {teacher.subjects.map(subject => (
                        <span key={subject} className="subject-tag">{subject}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="classes-list">
                      {teacher.classes.map(className => (
                        <span key={className} className="class-tag">{className}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${teacher.status}`}>
                      {teacher.status === 'active' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {teacher.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon view"
                        onClick={() => {
                          setSelectedTeacher(teacher);
                          setShowDetails(true);
                        }}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn-icon edit"
                        onClick={() => {
                          setAssignData({ ...assignData, teacherId: teacher.id });
                          setShowAssignForm(true);
                        }}
                      >
                        <GraduationCap size={16} />
                      </button>
                      <button
                        className="btn-icon status"
                        onClick={() => handleToggleStatus(teacher.id)}
                      >
                        {teacher.status === 'active' ? <XCircle size={16} /> : <CheckCircle size={16} />}
                      </button>
                      <button
                        className="btn-icon delete"
                        onClick={() => handleDeleteTeacher(teacher.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Teacher Modal */}
        {showAddForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add New Teacher</h2>
                <button className="close-btn" onClick={() => setShowAddForm(false)}>×</button>
              </div>
              <form onSubmit={handleAddTeacher}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Qualification *</label>
                    <input
                      type="text"
                      value={newTeacher.qualification}
                      onChange={(e) => setNewTeacher({ ...newTeacher, qualification: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Experience *</label>
                    <input
                      type="text"
                      value={newTeacher.experience}
                      onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
                      placeholder="e.g., 5 years"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={newTeacher.status}
                      onChange={(e) => setNewTeacher({ ...newTeacher, status: e.target.value })}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Teacher
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Assign Subjects/Classes Modal */}
        {showAssignForm && (
          <div className="modal-overlay">
            <div className="modal-content wide">
              <div className="modal-header">
                <h2>Assign Subjects & Classes</h2>
                <button className="close-btn" onClick={() => setShowAssignForm(false)}>×</button>
              </div>
              <form onSubmit={handleAssignSubmit}>
                <div className="form-group">
                  <label>Select Teacher</label>
                  <select
                    value={assignData.teacherId}
                    onChange={(e) => setAssignData({ ...assignData, teacherId: e.target.value })}
                    required
                  >
                    <option value="">Choose a teacher</option>
                    {teachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                  </select>
                </div>

                <div className="assign-grid">
                  <div className="assign-section">
                    <h3>Select Subjects</h3>
                    <div className="items-grid">
                      {availableSubjects.map(subject => (
                        <label key={subject} className="item-checkbox">
                          <input
                            type="checkbox"
                            checked={assignData.subjects.includes(subject)}
                            onChange={() => handleSubjectSelect(subject)}
                          />
                          <span>{subject}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="assign-section">
                    <h3>Select Classes</h3>
                    <div className="items-grid">
                      {availableClasses.map(className => (
                        <label key={className} className="item-checkbox">
                          <input
                            type="checkbox"
                            checked={assignData.classes.includes(className)}
                            onChange={() => handleClassSelect(className)}
                          />
                          <span>{className}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAssignForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Assign
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Teacher Details Modal */}
        {showDetails && selectedTeacher && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Teacher Details</h2>
                <button className="close-btn" onClick={() => setShowDetails(false)}>×</button>
              </div>
              <div className="teacher-details">
                <div className="detail-header">
                  <div className="detail-avatar">{selectedTeacher.name.charAt(0)}</div>
                  <div>
                    <h3>{selectedTeacher.name}</h3>
                    <p>{selectedTeacher.qualification}</p>
                  </div>
                </div>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label><Mail size={16} /> Email</label>
                    <p>{selectedTeacher.email}</p>
                  </div>
                  <div className="detail-item">
                    <label><Phone size={16} /> Phone</label>
                    <p>{selectedTeacher.phone}</p>
                  </div>
                  <div className="detail-item">
                    <label><Award size={16} /> Experience</label>
                    <p>{selectedTeacher.experience}</p>
                  </div>
                  <div className="detail-item">
                    <label><Calendar size={16} /> Joining Date</label>
                    <p>{selectedTeacher.joiningDate}</p>
                  </div>
                  <div className="detail-item full">
                    <label><BookOpen size={16} /> Subjects</label>
                    <div className="tags-container">
                      {selectedTeacher.subjects.map(subject => (
                        <span key={subject} className="tag">{subject}</span>
                      ))}
                    </div>
                  </div>
                  <div className="detail-item full">
                    <label><GraduationCap size={16} /> Classes</label>
                    <div className="tags-container">
                      {selectedTeacher.classes.map(className => (
                        <span key={className} className="tag">{className}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowDetails(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teachers;