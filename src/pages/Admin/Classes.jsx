
import '../../Styles/Classes.css';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../../Styles/Classes.css';

import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  User,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Download,
  ChevronRight,
  MoreVertical,
  BarChart3,
  Settings,
  Copy,
  Archive,
  Award,
  Building
} from 'lucide-react';

const Classes = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [classes, setClasses] = useState([
    {
      id: 1,
      grade: '10',
      section: 'A',
      className: 'Grade 10-A',
      classTeacher: 'Dr. Sarah Johnson',
      roomNumber: '101',
      totalStudents: 38,
      maxCapacity: 40,
      schedule: 'Mon-Fri, 8:00 AM - 2:30 PM',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'],
      status: 'active',
      academicYear: '2024-2025',
      timetable: 'Morning',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      grade: '10',
      section: 'B',
      className: 'Grade 10-B',
      classTeacher: 'Mr. Michael Chen',
      roomNumber: '102',
      totalStudents: 35,
      maxCapacity: 40,
      schedule: 'Mon-Fri, 8:00 AM - 2:30 PM',
      subjects: ['Mathematics', 'Biology', 'English', 'History'],
      status: 'active',
      academicYear: '2024-2025',
      timetable: 'Morning',
      createdAt: '2024-01-15'
    },
    {
      id: 3,
      grade: '11',
      section: 'A',
      className: 'Grade 11-A',
      classTeacher: 'Ms. Emma Williams',
      roomNumber: '201',
      totalStudents: 42,
      maxCapacity: 45,
      schedule: 'Mon-Fri, 8:30 AM - 3:00 PM',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
      status: 'active',
      academicYear: '2024-2025',
      timetable: 'Morning',
      createdAt: '2024-01-10'
    },
    {
      id: 4,
      grade: '11',
      section: 'B',
      className: 'Grade 11-B',
      classTeacher: 'Mr. David Brown',
      roomNumber: '202',
      totalStudents: 36,
      maxCapacity: 40,
      schedule: 'Mon-Fri, 8:30 AM - 3:00 PM',
      subjects: ['Biology', 'Chemistry', 'English', 'Geography'],
      status: 'inactive',
      academicYear: '2024-2025',
      timetable: 'Morning',
      createdAt: '2024-01-10'
    },
    {
      id: 5,
      grade: '12',
      section: 'A',
      className: 'Grade 12-A',
      classTeacher: 'Dr. Robert Wilson',
      roomNumber: '301',
      totalStudents: 40,
      maxCapacity: 45,
      schedule: 'Mon-Fri, 9:00 AM - 3:30 PM',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'],
      status: 'active',
      academicYear: '2024-2025',
      timetable: 'Morning',
      createdAt: '2024-01-05'
    }
  ]);

  const [sections, setSections] = useState([
    { id: 1, grade: '10', section: 'A', name: 'Science', description: 'Science stream with Physics, Chemistry' },
    { id: 2, grade: '10', section: 'B', name: 'Commerce', description: 'Commerce stream with Business Studies' },
    { id: 3, grade: '10', section: 'C', name: 'Arts', description: 'Arts stream with History, Geography' },
    { id: 4, grade: '11', section: 'A', name: 'Science', description: 'Science stream for Grade 11' },
    { id: 5, grade: '11', section: 'B', name: 'Commerce', description: 'Commerce stream for Grade 11' },
    { id: 6, grade: '12', section: 'A', name: 'Science', description: 'Science stream for Grade 12' },
    { id: 7, grade: '12', section: 'B', name: 'Commerce', description: 'Commerce stream for Grade 12' }
  ]);

  const [activeTab, setActiveTab] = useState('classes'); // 'classes' or 'sections'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showClassForm, setShowClassForm] = useState(false);
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showEditClass, setShowEditClass] = useState(false);
  const [showEditSection, setShowEditSection] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [bulkAction, setBulkAction] = useState('');

  const [newClass, setNewClass] = useState({
    grade: '',
    section: '',
    classTeacher: '',
    roomNumber: '',
    maxCapacity: 40,
    schedule: 'Mon-Fri, 8:00 AM - 2:30 PM',
    subjects: [],
    status: 'active',
    academicYear: '2024-2025',
    timetable: 'Morning'
  });

  const [newSection, setNewSection] = useState({
    grade: '',
    section: '',
    name: '',
    description: '',
    maxClasses: 5
  });

  const grades = ['9', '10', '11', '12'];
  const availableSections = ['A', 'B', 'C', 'D', 'E'];
  const availableSubjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'English', 'History', 'Geography', 'Computer Science',
    'Art', 'Music', 'Physical Education', 'Business Studies',
    'Economics', 'Psychology', 'Sociology'
  ];
  const academicYears = ['2023-2024', '2024-2025', '2025-2026'];
  const timetables = ['Morning', 'Afternoon', 'Evening'];

  // Filter classes
  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.classTeacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || cls.grade === filterGrade;
    const matchesStatus = filterStatus === 'all' || cls.status === filterStatus;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  // Filter sections
  const filteredSections = sections.filter(section => {
    const matchesSearch = section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `Grade ${section.grade}-${section.section}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || section.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  // Calculate statistics
  const stats = {
    totalClasses: classes.length,
    activeClasses: classes.filter(c => c.status === 'active').length,
    totalStudents: classes.reduce((sum, cls) => sum + cls.totalStudents, 0),
    avgClassSize: Math.round(classes.reduce((sum, cls) => sum + cls.totalStudents, 0) / classes.length),
    capacityUtilization: Math.round(
      (classes.reduce((sum, cls) => sum + cls.totalStudents, 0) /
        classes.reduce((sum, cls) => sum + cls.maxCapacity, 0)) * 100
    ),
    totalSections: sections.length
  };

  // Handle add class
  const handleAddClass = (e) => {
    e.preventDefault();
    const newClassObj = {
      id: classes.length + 1,
      className: `Grade ${newClass.grade}-${newClass.section}`,
      totalStudents: 0,
      createdAt: new Date().toISOString().split('T')[0],
      ...newClass
    };
    setClasses([...classes, newClassObj]);
    setShowClassForm(false);
    setNewClass({
      grade: '',
      section: '',
      classTeacher: '',
      roomNumber: '',
      maxCapacity: 40,
      schedule: 'Mon-Fri, 8:00 AM - 2:30 PM',
      subjects: [],
      status: 'active',
      academicYear: '2024-2025',
      timetable: 'Morning'
    });
  };

  // Handle add section
  const handleAddSection = (e) => {
    e.preventDefault();
    const newSectionObj = {
      id: sections.length + 1,
      ...newSection
    };
    setSections([...sections, newSectionObj]);
    setShowSectionForm(false);
    setNewSection({
      grade: '',
      section: '',
      name: '',
      description: '',
      maxClasses: 5
    });
  };

  // Handle update class
  const handleUpdateClass = (e) => {
    e.preventDefault();
    setClasses(classes.map(cls =>
      cls.id === selectedClass.id
        ? {
          ...selectedClass,
          className: `Grade ${selectedClass.grade}-${selectedClass.section}`
        }
        : cls
    ));
    setShowEditClass(false);
    setSelectedClass(null);
  };

  // Handle update section
  const handleUpdateSection = (e) => {
    e.preventDefault();
    setSections(sections.map(section =>
      section.id === selectedSection.id
        ? selectedSection
        : section
    ));
    setShowEditSection(false);
    setSelectedSection(null);
  };

  // Handle delete class
  const handleDeleteClass = (id) => {
    if (window.confirm('Are you sure you want to delete this class? This action cannot be undone.')) {
      setClasses(classes.filter(cls => cls.id !== id));
    }
  };

  // Handle delete section
  const handleDeleteSection = (id) => {
    // Check if section is used in any class
    const sectionInUse = classes.some(cls =>
      cls.grade === sections.find(s => s.id === id)?.grade &&
      cls.section === sections.find(s => s.id === id)?.section
    );

    if (sectionInUse) {
      alert('Cannot delete section. It is currently assigned to one or more classes.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this section?')) {
      setSections(sections.filter(section => section.id !== id));
    }
  };

  // Handle toggle class status
  const handleToggleStatus = (id) => {
    setClasses(classes.map(cls =>
      cls.id === id
        ? { ...cls, status: cls.status === 'active' ? 'inactive' : 'active' }
        : cls
    ));
  };

  // Handle bulk actions
  const handleBulkAction = () => {
    switch (bulkAction) {
      case 'activate':
        setClasses(classes.map(cls =>
          selectedClasses.includes(cls.id)
            ? { ...cls, status: 'active' }
            : cls
        ));
        break;
      case 'deactivate':
        setClasses(classes.map(cls =>
          selectedClasses.includes(cls.id)
            ? { ...cls, status: 'inactive' }
            : cls
        ));
        break;
      case 'delete':
        if (window.confirm(`Delete ${selectedClasses.length} classes permanently?`)) {
          setClasses(classes.filter(cls => !selectedClasses.includes(cls.id)));
        }
        break;
      default:
        break;
    }
    setSelectedClasses([]);
    setBulkAction('');
  };

  // Export data
  const exportData = () => {
    const data = activeTab === 'classes' ? classes : sections;
    const headers = activeTab === 'classes'
      ? ['Grade', 'Section', 'Class Name', 'Class Teacher', 'Room', 'Students', 'Capacity', 'Status', 'Academic Year']
      : ['Grade', 'Section', 'Name', 'Description', 'Max Classes'];

    const csv = [
      headers,
      ...data.map(item =>
        activeTab === 'classes'
          ? [
            item.grade,
            item.section,
            item.className,
            item.classTeacher,
            item.roomNumber,
            item.totalStudents,
            item.maxCapacity,
            item.status,
            item.academicYear
          ]
          : [
            item.grade,
            item.section,
            item.name,
            item.description,
            item.maxClasses
          ]
      )
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}_export.csv`;
    a.click();
  };

  // Duplicate class
  const handleDuplicateClass = (classToDuplicate) => {
    const newSection = String.fromCharCode(classToDuplicate.section.charCodeAt(0) + 1);
    const duplicateClass = {
      ...classToDuplicate,
      id: classes.length + 1,
      section: newSection,
      className: `Grade ${classToDuplicate.grade}-${newSection}`,
      totalStudents: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setClasses([...classes, duplicateClass]);
  };

  return (
    <div className="classes-container">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`classes-content ${collapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <div className="classes-header">
          <div>
            <h1>Class & Section Management</h1>
            <p>Create, edit, and manage classes and sections for the academic year</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={exportData}>
              <Download size={18} />
              <span>Export {activeTab === 'classes' ? 'Classes' : 'Sections'}</span>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => activeTab === 'classes' ? setShowClassForm(true) : setShowSectionForm(true)}
            >
              <Plus size={18} />
              <span>Add {activeTab === 'classes' ? 'Class' : 'Section'}</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="classes-stats">
          <div className="stat-card">
            <div className="stat-icon total">
              <Building size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.totalClasses}</h3>
              <p>Total Classes</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon active">
              <CheckCircle size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.activeClasses}</h3>
              <p>Active Classes</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon students">
              <Users size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.totalStudents}</h3>
              <p>Total Students</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon capacity">
              <BarChart3 size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.capacityUtilization}%</h3>
              <p>Capacity Used</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon sections">
              <BookOpen size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.totalSections}</h3>
              <p>Total Sections</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'classes' ? 'active' : ''}`}
              onClick={() => setActiveTab('classes')}
            >
              <Building size={18} />
              <span>Classes ({classes.length})</span>
            </button>
            <button
              className={`tab ${activeTab === 'sections' ? 'active' : ''}`}
              onClick={() => setActiveTab('sections')}
            >
              <BookOpen size={18} />
              <span>Sections ({sections.length})</span>
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedClasses.length > 0 && activeTab === 'classes' && (
          <div className="bulk-actions">
            <div className="selected-count">
              <span>{selectedClasses.length} classes selected</span>
            </div>
            <div className="bulk-controls">
              <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)}>
                <option value="">Bulk Actions</option>
                <option value="activate">Activate</option>
                <option value="deactivate">Deactivate</option>
                <option value="delete">Delete</option>
              </select>
              <button className="btn btn-primary" onClick={handleBulkAction}>
                Apply
              </button>
              <button className="btn btn-secondary" onClick={() => setSelectedClasses([])}>
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
              placeholder={`Search ${activeTab} by name, teacher, or room...`}
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
            {activeTab === 'classes' && (
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            )}
            <button className="btn btn-secondary">
              <Filter size={18} />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Classes Table */}
        {activeTab === 'classes' && (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedClasses.length === filteredClasses.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedClasses(filteredClasses.map(c => c.id));
                        } else {
                          setSelectedClasses([]);
                        }
                      }}
                    />
                  </th>
                  <th>Class Name</th>
                  <th>Class Teacher</th>
                  <th>Room</th>
                  <th>Students</th>
                  <th>Subjects</th>
                  <th>Schedule</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map(cls => (
                  <tr key={cls.id} className={cls.status === 'inactive' ? 'inactive' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedClasses.includes(cls.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedClasses([...selectedClasses, cls.id]);
                          } else {
                            setSelectedClasses(selectedClasses.filter(id => id !== cls.id));
                          }
                        }}
                      />
                    </td>
                    <td>
                      <div className="class-info">
                        <div className="class-avatar">
                          {cls.grade}
                        </div>
                        <div>
                          <strong>{cls.className}</strong>
                          <small>Grade {cls.grade} • Section {cls.section}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="teacher-info">
                        <User size={14} />
                        <span>{cls.classTeacher}</span>
                      </div>
                    </td>
                    <td>
                      <span className="room-badge">
                        <MapPin size={14} />
                        {cls.roomNumber}
                      </span>
                    </td>
                    <td>
                      <div className="students-count">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${(cls.totalStudents / cls.maxCapacity) * 100}%` }}
                          ></div>
                        </div>
                        <span>{cls.totalStudents}/{cls.maxCapacity}</span>
                      </div>
                    </td>
                    <td>
                      <div className="subjects-list">
                        {cls.subjects.slice(0, 2).map(subject => (
                          <span key={subject} className="subject-tag">{subject}</span>
                        ))}
                        {cls.subjects.length > 2 && (
                          <span className="more-tag">+{cls.subjects.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="schedule-info">
                        <Clock size={14} />
                        <span>{cls.schedule}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${cls.status}`}>
                        {cls.status === 'active' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        {cls.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon view"
                          onClick={() => {
                            setSelectedClass(cls);
                            setShowDetails(true);
                          }}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn-icon edit"
                          onClick={() => {
                            setSelectedClass(cls);
                            setShowEditClass(true);
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn-icon duplicate"
                          onClick={() => handleDuplicateClass(cls)}
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          className="btn-icon status"
                          onClick={() => handleToggleStatus(cls.id)}
                        >
                          {cls.status === 'active' ? <Archive size={16} /> : <CheckCircle size={16} />}
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDeleteClass(cls.id)}
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
        )}

        {/* Sections Table */}
        {activeTab === 'sections' && (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>Section</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Max Classes</th>
                  <th>Current Classes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSections.map(section => (
                  <tr key={section.id}>
                    <td>
                      <span className="grade-badge">Grade {section.grade}</span>
                    </td>
                    <td>
                      <span className="section-badge">Section {section.section}</span>
                    </td>
                    <td>
                      <strong>{section.name}</strong>
                    </td>
                    <td>
                      <p className="section-description">{section.description}</p>
                    </td>
                    <td>
                      <span className="max-classes">{section.maxClasses}</span>
                    </td>
                    <td>
                      <span className="current-classes">
                        {classes.filter(c => c.grade === section.grade && c.section === section.section).length}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon edit"
                          onClick={() => {
                            setSelectedSection(section);
                            setShowEditSection(true);
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDeleteSection(section.id)}
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
        )}

        {/* Empty State */}
        {activeTab === 'classes' && filteredClasses.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <Building size={48} />
            </div>
            <h3>No Classes Found</h3>
            <p>Create your first class to get started</p>
            <button className="btn btn-primary" onClick={() => setShowClassForm(true)}>
              <Plus size={18} />
              <span>Add Class</span>
            </button>
          </div>
        )}

        {activeTab === 'sections' && filteredSections.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <BookOpen size={48} />
            </div>
            <h3>No Sections Found</h3>
            <p>Create your first section to get started</p>
            <button className="btn btn-primary" onClick={() => setShowSectionForm(true)}>
              <Plus size={18} />
              <span>Add Section</span>
            </button>
          </div>
        )}

        {/* Add Class Modal */}
        {showClassForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Create New Class</h2>
                <button className="close-btn" onClick={() => setShowClassForm(false)}>×</button>
              </div>
              <form onSubmit={handleAddClass}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Grade *</label>
                    <select
                      value={newClass.grade}
                      onChange={(e) => setNewClass({ ...newClass, grade: e.target.value })}
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
                      value={newClass.section}
                      onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                      required
                    >
                      <option value="">Select Section</option>
                      {availableSections.map(section => (
                        <option key={section} value={section}>Section {section}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Class Teacher *</label>
                    <input
                      type="text"
                      value={newClass.classTeacher}
                      onChange={(e) => setNewClass({ ...newClass, classTeacher: e.target.value })}
                      placeholder="Enter teacher's name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Room Number *</label>
                    <input
                      type="text"
                      value={newClass.roomNumber}
                      onChange={(e) => setNewClass({ ...newClass, roomNumber: e.target.value })}
                      placeholder="e.g., 101, Lab-3"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Capacity *</label>
                    <input
                      type="number"
                      value={newClass.maxCapacity}
                      onChange={(e) => setNewClass({ ...newClass, maxCapacity: e.target.value })}
                      min="1"
                      max="100"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Academic Year *</label>
                    <select
                      value={newClass.academicYear}
                      onChange={(e) => setNewClass({ ...newClass, academicYear: e.target.value })}
                      required
                    >
                      <option value="">Select Year</option>
                      {academicYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Timetable *</label>
                    <select
                      value={newClass.timetable}
                      onChange={(e) => setNewClass({ ...newClass, timetable: e.target.value })}
                      required
                    >
                      {timetables.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group full">
                    <label>Schedule</label>
                    <input
                      type="text"
                      value={newClass.schedule}
                      onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
                      placeholder="e.g., Mon-Fri, 8:00 AM - 2:30 PM"
                    />
                  </div>
                  <div className="form-group full">
                    <label>Subjects</label>
                    <div className="subjects-selector">
                      {availableSubjects.map(subject => (
                        <label key={subject} className="subject-checkbox">
                          <input
                            type="checkbox"
                            checked={newClass.subjects.includes(subject)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewClass({
                                  ...newClass,
                                  subjects: [...newClass.subjects, subject]
                                });
                              } else {
                                setNewClass({
                                  ...newClass,
                                  subjects: newClass.subjects.filter(s => s !== subject)
                                });
                              }
                            }}
                          />
                          <span>{subject}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={newClass.status}
                      onChange={(e) => setNewClass({ ...newClass, status: e.target.value })}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowClassForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Class Modal */}
        {showEditClass && selectedClass && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Edit Class</h2>
                <button className="close-btn" onClick={() => setShowEditClass(false)}>×</button>
              </div>
              <form onSubmit={handleUpdateClass}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Grade *</label>
                    <select
                      value={selectedClass.grade}
                      onChange={(e) => setSelectedClass({ ...selectedClass, grade: e.target.value })}
                      required
                    >
                      {grades.map(grade => (
                        <option key={grade} value={grade}>Grade {grade}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Section *</label>
                    <select
                      value={selectedClass.section}
                      onChange={(e) => setSelectedClass({ ...selectedClass, section: e.target.value })}
                      required
                    >
                      {availableSections.map(section => (
                        <option key={section} value={section}>Section {section}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Class Teacher *</label>
                    <input
                      type="text"
                      value={selectedClass.classTeacher}
                      onChange={(e) => setSelectedClass({ ...selectedClass, classTeacher: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Room Number *</label>
                    <input
                      type="text"
                      value={selectedClass.roomNumber}
                      onChange={(e) => setSelectedClass({ ...selectedClass, roomNumber: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Capacity *</label>
                    <input
                      type="number"
                      value={selectedClass.maxCapacity}
                      onChange={(e) => setSelectedClass({ ...selectedClass, maxCapacity: e.target.value })}
                      min="1"
                      max="100"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Academic Year *</label>
                    <select
                      value={selectedClass.academicYear}
                      onChange={(e) => setSelectedClass({ ...selectedClass, academicYear: e.target.value })}
                      required
                    >
                      {academicYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Current Students</label>
                    <input
                      type="number"
                      value={selectedClass.totalStudents}
                      onChange={(e) => setSelectedClass({ ...selectedClass, totalStudents: parseInt(e.target.value) || 0 })}
                      min="0"
                      max={selectedClass.maxCapacity}
                    />
                  </div>
                  <div className="form-group full">
                    <label>Subjects</label>
                    <div className="subjects-selector">
                      {availableSubjects.map(subject => (
                        <label key={subject} className="subject-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedClass.subjects.includes(subject)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedClass({
                                  ...selectedClass,
                                  subjects: [...selectedClass.subjects, subject]
                                });
                              } else {
                                setSelectedClass({
                                  ...selectedClass,
                                  subjects: selectedClass.subjects.filter(s => s !== subject)
                                });
                              }
                            }}
                          />
                          <span>{subject}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={selectedClass.status}
                      onChange={(e) => setSelectedClass({ ...selectedClass, status: e.target.value })}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditClass(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Section Modal */}
        {showSectionForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Create New Section</h2>
                <button className="close-btn" onClick={() => setShowSectionForm(false)}>×</button>
              </div>
              <form onSubmit={handleAddSection}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Grade *</label>
                    <select
                      value={newSection.grade}
                      onChange={(e) => setNewSection({ ...newSection, grade: e.target.value })}
                      required
                    >
                      <option value="">Select Grade</option>
                      {grades.map(grade => (
                        <option key={grade} value={grade}>Grade {grade}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Section Code *</label>
                    <select
                      value={newSection.section}
                      onChange={(e) => setNewSection({ ...newSection, section: e.target.value })}
                      required
                    >
                      <option value="">Select Section</option>
                      {availableSections.map(section => (
                        <option key={section} value={section}>Section {section}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group full">
                    <label>Section Name *</label>
                    <input
                      type="text"
                      value={newSection.name}
                      onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
                      placeholder="e.g., Science, Commerce, Arts"
                      required
                    />
                  </div>
                  <div className="form-group full">
                    <label>Description</label>
                    <textarea
                      value={newSection.description}
                      onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
                      placeholder="Brief description of this section..."
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Classes</label>
                    <input
                      type="number"
                      value={newSection.maxClasses}
                      onChange={(e) => setNewSection({ ...newSection, maxClasses: e.target.value })}
                      min="1"
                      max="20"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowSectionForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Section
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Section Modal */}
        {showEditSection && selectedSection && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Edit Section</h2>
                <button className="close-btn" onClick={() => setShowEditSection(false)}>×</button>
              </div>
              <form onSubmit={handleUpdateSection}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Grade</label>
                    <input
                      type="text"
                      value={selectedSection.grade}
                      readOnly
                      className="readonly-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Section Code</label>
                    <input
                      type="text"
                      value={selectedSection.section}
                      readOnly
                      className="readonly-input"
                    />
                  </div>
                  <div className="form-group full">
                    <label>Section Name *</label>
                    <input
                      type="text"
                      value={selectedSection.name}
                      onChange={(e) => setSelectedSection({ ...selectedSection, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group full">
                    <label>Description</label>
                    <textarea
                      value={selectedSection.description}
                      onChange={(e) => setSelectedSection({ ...selectedSection, description: e.target.value })}
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Classes</label>
                    <input
                      type="number"
                      value={selectedSection.maxClasses}
                      onChange={(e) => setSelectedSection({ ...selectedSection, maxClasses: e.target.value })}
                      min="1"
                      max="20"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditSection(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Section
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Class Details Modal */}
        {showDetails && selectedClass && (
          <div className="modal-overlay">
            <div className="modal-content wide">
              <div className="modal-header">
                <h2>Class Details</h2>
                <button className="close-btn" onClick={() => setShowDetails(false)}>×</button>
              </div>
              <div className="class-details">
                <div className="detail-header">
                  <div className="detail-avatar">
                    {selectedClass.grade}
                  </div>
                  <div>
                    <h3>{selectedClass.className}</h3>
                    <p>Grade {selectedClass.grade} • Section {selectedClass.section}</p>
                  </div>
                  <span className={`status-badge large ${selectedClass.status}`}>
                    {selectedClass.status}
                  </span>
                </div>

                <div className="detail-grid">
                  <div className="detail-section">
                    <h4><User size={18} /> Class Information</h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Class Teacher</label>
                        <p>{selectedClass.classTeacher}</p>
                      </div>
                      <div className="info-item">
                        <label>Room Number</label>
                        <p>{selectedClass.roomNumber}</p>
                      </div>
                      <div className="info-item">
                        <label>Academic Year</label>
                        <p>{selectedClass.academicYear}</p>
                      </div>
                      <div className="info-item">
                        <label>Timetable</label>
                        <p>{selectedClass.timetable}</p>
                      </div>
                      <div className="info-item">
                        <label>Schedule</label>
                        <p>{selectedClass.schedule}</p>
                      </div>
                      <div className="info-item">
                        <label>Created On</label>
                        <p>{selectedClass.createdAt}</p>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4><Users size={18} /> Student Information</h4>
                    <div className="capacity-meter">
                      <div className="meter-header">
                        <span>Class Capacity</span>
                        <span>{selectedClass.totalStudents}/{selectedClass.maxCapacity}</span>
                      </div>
                      <div className="meter-bar">
                        <div
                          className="meter-fill"
                          style={{ width: `${(selectedClass.totalStudents / selectedClass.maxCapacity) * 100}%` }}
                        ></div>
                      </div>
                      <div className="meter-labels">
                        <span>0</span>
                        <span>{selectedClass.maxCapacity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section full">
                    <h4><BookOpen size={18} /> Subjects</h4>
                    <div className="subjects-container">
                      {selectedClass.subjects.map(subject => (
                        <span key={subject} className="subject-tag">{subject}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowDetails(false);
                    setShowEditClass(true);
                  }}
                >
                  Edit Class
                </button>
                <button className="btn btn-primary" onClick={() => setShowDetails(false)}>
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

export default Classes;