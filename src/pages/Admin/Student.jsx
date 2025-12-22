

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../../Styles/Student.css';

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
  Calendar,
  UserCheck,
  UserX,
  Download,
  Plus,
  Users,
  ChevronUp,
  ChevronDown,
  BookOpen,
  Home,
  MapPin,
  FileText,
  MoreVertical,
  CheckCircle,
  XCircle,
  Send,
  Archive,
  Award
} from 'lucide-react';

const Students = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [students, setStudents] = useState([
    {
      id: 1,
      rollNo: 'ST001',
      name: 'John Smith',
      email: 'john.smith@student.edu',
      phone: '+1 234 567 8901',
      grade: '10',
      section: 'A',
      class: 'Grade 10-A',
      status: 'active',
      dob: '2008-05-15',
      address: '123 Main St, City',
      parentName: 'Robert Smith',
      parentPhone: '+1 234 567 8902',
      admissionDate: '2023-03-10',
      attendance: 92,
      performance: 'A'
    },
    {
      id: 2,
      rollNo: 'ST002',
      name: 'Emma Johnson',
      email: 'emma.johnson@student.edu',
      phone: '+1 234 567 8903',
      grade: '11',
      section: 'B',
      class: 'Grade 11-B',
      status: 'active',
      dob: '2007-08-22',
      address: '456 Oak Ave, City',
      parentName: 'Sarah Johnson',
      parentPhone: '+1 234 567 8904',
      admissionDate: '2022-01-15',
      attendance: 88,
      performance: 'B+'
    },
    {
      id: 3,
      rollNo: 'ST003',
      name: 'Michael Chen',
      email: 'michael.chen@student.edu',
      phone: '+1 234 567 8905',
      grade: '9',
      section: 'C',
      class: 'Grade 9-C',
      status: 'inactive',
      dob: '2009-03-30',
      address: '789 Pine Rd, City',
      parentName: 'Lisa Chen',
      parentPhone: '+1 234 567 8906',
      admissionDate: '2023-08-20',
      attendance: 95,
      performance: 'A+'
    },
    {
      id: 4,
      rollNo: 'ST004',
      name: 'Sophia Williams',
      email: 'sophia.williams@student.edu',
      phone: '+1 234 567 8907',
      grade: '12',
      section: 'A',
      class: 'Grade 12-A',
      status: 'active',
      dob: '2006-11-10',
      address: '321 Elm St, City',
      parentName: 'David Williams',
      parentPhone: '+1 234 567 8908',
      admissionDate: '2021-09-05',
      attendance: 90,
      performance: 'A-'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterGrade, setFilterGrade] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [bulkAction, setBulkAction] = useState('');

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    grade: '',
    section: '',
    address: '',
    parentName: '',
    parentPhone: '',
    status: 'active'
  });

  const [promoteData, setPromoteData] = useState({
    fromGrade: '',
    toGrade: '',
    students: []
  });

  const [assignData, setAssignData] = useState({
    studentId: '',
    grade: '',
    section: ''
  });

  const grades = ['9', '10', '11', '12'];
  const sections = ['A', 'B', 'C', 'D'];

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    const matchesGrade = filterGrade === 'all' || student.grade === filterGrade;
    return matchesSearch && matchesStatus && matchesGrade;
  });

  // Add new student
  const handleAddStudent = (e) => {
    e.preventDefault();
    const rollNo = `ST${(students.length + 1).toString().padStart(3, '0')}`;
    const newStudentObj = {
      id: students.length + 1,
      rollNo,
      ...newStudent,
      class: `Grade ${newStudent.grade}-${newStudent.section}`,
      admissionDate: new Date().toISOString().split('T')[0],
      attendance: 100,
      performance: 'N/A'
    };
    setStudents([...students, newStudentObj]);
    setShowAddForm(false);
    setNewStudent({
      name: '',
      email: '',
      phone: '',
      dob: '',
      grade: '',
      section: '',
      address: '',
      parentName: '',
      parentPhone: '',
      status: 'active'
    });
  };

  // Update student info
  const handleUpdateStudent = (e) => {
    e.preventDefault();
    setStudents(students.map(student =>
      student.id === selectedStudent.id
        ? {
          ...selectedStudent,
          class: `Grade ${selectedStudent.grade}-${selectedStudent.section}`
        }
        : student
    ));
    setShowEditForm(false);
    setSelectedStudent(null);
  };

  // Promote students
  const handlePromoteStudents = () => {
    const updatedStudents = students.map(student => {
      if (promoteData.students.includes(student.id)) {
        return {
          ...student,
          grade: promoteData.toGrade,
          class: `Grade ${promoteData.toGrade}-${student.section}`
        };
      }
      return student;
    });
    setStudents(updatedStudents);
    setShowPromoteModal(false);
    setPromoteData({ fromGrade: '', toGrade: '', students: [] });
    setSelectedStudents([]);
  };

  // Assign student to class
  const handleAssignStudent = (e) => {
    e.preventDefault();
    setStudents(students.map(student =>
      student.id === assignData.studentId
        ? {
          ...student,
          grade: assignData.grade,
          section: assignData.section,
          class: `Grade ${assignData.grade}-${assignData.section}`
        }
        : student
    ));
    setShowAssignModal(false);
    setAssignData({ studentId: '', grade: '', section: '' });
  };

  // Remove/Deactivate student
  const handleToggleStatus = (id) => {
    setStudents(students.map(student =>
      student.id === id
        ? { ...student, status: student.status === 'active' ? 'inactive' : 'active' }
        : student
    ));
  };

  // Delete student
  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to permanently delete this student?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  // Bulk actions
  const handleBulkAction = () => {
    switch (bulkAction) {
      case 'promote':
        setShowPromoteModal(true);
        break;
      case 'deactivate':
        setStudents(students.map(student =>
          selectedStudents.includes(student.id)
            ? { ...student, status: 'inactive' }
            : student
        ));
        break;
      case 'activate':
        setStudents(students.map(student =>
          selectedStudents.includes(student.id)
            ? { ...student, status: 'active' }
            : student
        ));
        break;
      case 'delete':
        if (window.confirm(`Delete ${selectedStudents.length} students permanently?`)) {
          setStudents(students.filter(student => !selectedStudents.includes(student.id)));
        }
        break;
      default:
        break;
    }
    setSelectedStudents([]);
    setBulkAction('');
  };

  // Export students
  const exportStudents = () => {
    const csv = [
      ['Roll No', 'Name', 'Email', 'Phone', 'Grade', 'Section', 'Status', 'DOB', 'Address', 'Parent Name', 'Parent Phone', 'Admission Date', 'Attendance', 'Performance'],
      ...students.map(s => [
        s.rollNo,
        s.name,
        s.email,
        s.phone,
        s.grade,
        s.section,
        s.status,
        s.dob,
        s.address,
        s.parentName,
        s.parentPhone,
        s.admissionDate,
        s.attendance + '%',
        s.performance
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
  };

  return (
    <div className="students-container">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`students-content ${collapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <div className="students-header">
          <div>
            <h1>Student Management</h1>
            <p>Manage all student records, promotions, and class assignments</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={exportStudents}>
              <Download size={18} />
              <span>Export</span>
            </button>
            <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
              <UserPlus size={18} />
              <span>Add Student</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="students-stats">
          <div className="stat-card">
            <div className="stat-icon total">
              <Users size={24} />
            </div>
            <div className="stat-info">
              <h3>{students.length}</h3>
              <p>Total Students</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon active">
              <UserCheck size={24} />
            </div>
            <div className="stat-info">
              <h3>{students.filter(s => s.status === 'active').length}</h3>
              <p>Active Students</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon attendance">
              <Calendar size={24} />
            </div>
            <div className="stat-info">
              <h3>{Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)}%</h3>
              <p>Avg. Attendance</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon performance">
              <Award size={24} />
            </div>
            <div className="stat-info">
              <h3>86%</h3>
              <p>Avg. Performance</p>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedStudents.length > 0 && (
          <div className="bulk-actions">
            <div className="selected-count">
              <span>{selectedStudents.length} students selected</span>
            </div>
            <div className="bulk-controls">
              <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)}>
                <option value="">Bulk Actions</option>
                <option value="promote">Promote</option>
                <option value="activate">Activate</option>
                <option value="deactivate">Deactivate</option>
                <option value="delete">Delete</option>
              </select>
              <button className="btn btn-primary" onClick={handleBulkAction}>
                Apply
              </button>
              <button className="btn btn-secondary" onClick={() => setSelectedStudents([])}>
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Filters & Search */}
        <div className="filters-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search students by name, roll number, or parent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-controls">
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
            >
              <option value="all">All Grades</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>Grade {grade}</option>
              ))}
            </select>
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

        {/* Students Table */}
        <div className="students-table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === filteredStudents.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStudents(filteredStudents.map(s => s.id));
                      } else {
                        setSelectedStudents([]);
                      }
                    }}
                  />
                </th>
                <th>Roll No</th>
                <th>Student</th>
                <th>Class</th>
                <th>Contact</th>
                <th>Parent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} className={student.status === 'inactive' ? 'inactive' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedStudents([...selectedStudents, student.id]);
                        } else {
                          setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                        }
                      }}
                    />
                  </td>
                  <td>
                    <strong>{student.rollNo}</strong>
                  </td>
                  <td>
                    <div className="student-info">
                      <div className="avatar">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <strong>{student.name}</strong>
                        <small>{student.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="class-badge">
                      <BookOpen size={14} />
                      {student.class}
                    </span>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div><Phone size={14} /> {student.phone}</div>
                      <div><Calendar size={14} /> {student.dob}</div>
                    </div>
                  </td>
                  <td>
                    <div className="parent-info">
                      <div><strong>{student.parentName}</strong></div>
                      <div>{student.parentPhone}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${student.status}`}>
                      {student.status === 'active' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon view"
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowDetails(true);
                        }}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn-icon edit"
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowEditForm(true);
                        }}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn-icon promote"
                        onClick={() => {
                          setSelectedStudent(student);
                          setPromoteData({
                            ...promoteData,
                            fromGrade: student.grade,
                            students: [student.id]
                          });
                          setShowPromoteModal(true);
                        }}
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        className="btn-icon assign"
                        onClick={() => {
                          setAssignData({
                            studentId: student.id,
                            grade: student.grade,
                            section: student.section
                          });
                          setShowAssignModal(true);
                        }}
                      >
                        <Send size={16} />
                      </button>
                      <button
                        className="btn-icon status"
                        onClick={() => handleToggleStatus(student.id)}
                      >
                        {student.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                      </button>
                      <button
                        className="btn-icon delete"
                        onClick={() => handleDeleteStudent(student.id)}
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

        {/* Add Student Modal */}
        {showAddForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add New Student</h2>
                <button className="close-btn" onClick={() => setShowAddForm(false)}>×</button>
              </div>
              <form onSubmit={handleAddStudent}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth *</label>
                    <input
                      type="date"
                      value={newStudent.dob}
                      onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Grade *</label>
                    <select
                      value={newStudent.grade}
                      onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                      required
                    >
                      <option value="">Select Grade</option>
                      {grades.map(grade => (
                        <option key={grade} value={grade}>Grade {grade}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Section *</label>
                    <select
                      value={newStudent.section}
                      onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                      required
                    >
                      <option value="">Select Section</option>
                      {sections.map(section => (
                        <option key={section} value={section}>Section {section}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group full">
                    <label>Address</label>
                    <input
                      type="text"
                      value={newStudent.address}
                      onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Parent Name *</label>
                    <input
                      type="text"
                      value={newStudent.parentName}
                      onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Parent Phone *</label>
                    <input
                      type="tel"
                      value={newStudent.parentPhone}
                      onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={newStudent.status}
                      onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}
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
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Student Modal */}
        {showEditForm && selectedStudent && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Update Student Information</h2>
                <button className="close-btn" onClick={() => setShowEditForm(false)}>×</button>
              </div>
              <form onSubmit={handleUpdateStudent}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={selectedStudent.name}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={selectedStudent.email}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={selectedStudent.phone}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={selectedStudent.dob}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, dob: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Grade</label>
                    <select
                      value={selectedStudent.grade}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, grade: e.target.value })}
                    >
                      {grades.map(grade => (
                        <option key={grade} value={grade}>Grade {grade}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Section</label>
                    <select
                      value={selectedStudent.section}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, section: e.target.value })}
                    >
                      {sections.map(section => (
                        <option key={section} value={section}>Section {section}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group full">
                    <label>Address</label>
                    <input
                      type="text"
                      value={selectedStudent.address}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, address: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Parent Name</label>
                    <input
                      type="text"
                      value={selectedStudent.parentName}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, parentName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Parent Phone</label>
                    <input
                      type="tel"
                      value={selectedStudent.parentPhone}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, parentPhone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={selectedStudent.status}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, status: e.target.value })}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Promote Students Modal */}
        {showPromoteModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Promote Students</h2>
                <button className="close-btn" onClick={() => setShowPromoteModal(false)}>×</button>
              </div>
              <div className="promote-section">
                <div className="promote-info">
                  <div className="promote-from">
                    <h3>From Grade</h3>
                    <select
                      value={promoteData.fromGrade}
                      onChange={(e) => setPromoteData({ ...promoteData, fromGrade: e.target.value })}
                    >
                      <option value="">Select Current Grade</option>
                      {grades.map(grade => (
                        <option key={grade} value={grade}>Grade {grade}</option>
                      ))}
                    </select>
                  </div>
                  <div className="promote-arrow">
                    <ChevronUp size={24} />
                  </div>
                  <div className="promote-to">
                    <h3>To Grade</h3>
                    <select
                      value={promoteData.toGrade}
                      onChange={(e) => setPromoteData({ ...promoteData, toGrade: e.target.value })}
                    >
                      <option value="">Select New Grade</option>
                      {grades.map(grade => (
                        <option key={grade} value={grade}>Grade {grade}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="selected-students">
                  <h3>Students to Promote ({promoteData.students.length})</h3>
                  {promoteData.fromGrade && (
                    <div className="students-list">
                      {students
                        .filter(s => s.grade === promoteData.fromGrade)
                        .map(student => (
                          <label key={student.id} className="student-checkbox">
                            <input
                              type="checkbox"
                              checked={promoteData.students.includes(student.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setPromoteData({
                                    ...promoteData,
                                    students: [...promoteData.students, student.id]
                                  });
                                } else {
                                  setPromoteData({
                                    ...promoteData,
                                    students: promoteData.students.filter(id => id !== student.id)
                                  });
                                }
                              }}
                            />
                            <span>{student.name} - {student.rollNo}</span>
                          </label>
                        ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowPromoteModal(false)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePromoteStudents}
                  disabled={!promoteData.fromGrade || !promoteData.toGrade || promoteData.students.length === 0}
                >
                  Promote Students
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assign Student Modal */}
        {showAssignModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Assign Student to Class</h2>
                <button className="close-btn" onClick={() => setShowAssignModal(false)}>×</button>
              </div>
              <form onSubmit={handleAssignStudent}>
                <div className="form-group">
                  <label>Select Student</label>
                  <select
                    value={assignData.studentId}
                    onChange={(e) => setAssignData({ ...assignData, studentId: e.target.value })}
                    required
                  >
                    <option value="">Choose a student</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.rollNo})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="assign-grid">
                  <div className="form-group">
                    <label>Grade</label>
                    <select
                      value={assignData.grade}
                      onChange={(e) => setAssignData({ ...assignData, grade: e.target.value })}
                      required
                    >
                      <option value="">Select Grade</option>
                      {grades.map(grade => (
                        <option key={grade} value={grade}>Grade {grade}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Section</label>
                    <select
                      value={assignData.section}
                      onChange={(e) => setAssignData({ ...assignData, section: e.target.value })}
                      required
                    >
                      <option value="">Select Section</option>
                      {sections.map(section => (
                        <option key={section} value={section}>Section {section}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAssignModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Assign to Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Student Details Modal */}
        {showDetails && selectedStudent && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Student Details</h2>
                <button className="close-btn" onClick={() => setShowDetails(false)}>×</button>
              </div>
              <div className="student-details">
                <div className="detail-header">
                  <div className="detail-avatar">{selectedStudent.name.charAt(0)}</div>
                  <div>
                    <h3>{selectedStudent.name}</h3>
                    <p>{selectedStudent.rollNo}</p>
                  </div>
                </div>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label><Mail size={16} /> Email</label>
                    <p>{selectedStudent.email}</p>
                  </div>
                  <div className="detail-item">
                    <label><Phone size={16} /> Phone</label>
                    <p>{selectedStudent.phone}</p>
                  </div>
                  <div className="detail-item">
                    <label><Calendar size={16} /> Date of Birth</label>
                    <p>{selectedStudent.dob}</p>
                  </div>
                  <div className="detail-item">
                    <label><BookOpen size={16} /> Class</label>
                    <p>{selectedStudent.class}</p>
                  </div>
                  <div className="detail-item">
                    <label><Home size={16} /> Address</label>
                    <p>{selectedStudent.address}</p>
                  </div>
                  <div className="detail-item">
                    <label><UserCheck size={16} /> Parent Name</label>
                    <p>{selectedStudent.parentName}</p>
                  </div>
                  <div className="detail-item">
                    <label><Phone size={16} /> Parent Phone</label>
                    <p>{selectedStudent.parentPhone}</p>
                  </div>
                  <div className="detail-item">
                    <label><Calendar size={16} /> Admission Date</label>
                    <p>{selectedStudent.admissionDate}</p>
                  </div>
                  <div className="detail-item">
                    <label><Award size={16} /> Attendance</label>
                    <div className="attendance-meter">
                      <div className="meter-bar" style={{ width: `${selectedStudent.attendance}%` }}></div>
                      <span>{selectedStudent.attendance}%</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <label><Award size={16} /> Performance</label>
                    <span className={`performance-badge ${selectedStudent.performance.toLowerCase()}`}>
                      {selectedStudent.performance}
                    </span>
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

export default Students;