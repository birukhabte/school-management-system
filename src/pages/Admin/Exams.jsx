


import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../../Styles/Exams.css';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Download,
  Calendar,
  FileText,
  Users,
  BookOpen,
  Award,
  BarChart3,
  Printer,
  Mail,
  Bell,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Settings,
  Copy,
  Archive,
  Send,
  FileSpreadsheet,
  Calculator,
  Percent,
  GraduationCap
} from 'lucide-react';

const ExamsGrades = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('exams'); // 'exams', 'grading', 'results', 'reportcards'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterExamType, setFilterExamType] = useState('all');
  const [showExamForm, setShowExamForm] = useState(false);
  const [showGradingForm, setShowGradingForm] = useState(false);
  const [showResultForm, setShowResultForm] = useState(false);
  const [showReportCard, setShowReportCard] = useState(false);
  const [showExamDetails, setShowExamDetails] = useState(false);
  const [showEditExam, setShowEditExam] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [bulkAction, setBulkAction] = useState('');

  // Exam Schedule Data
  const [exams, setExams] = useState([
    {
      id: 1,
      name: 'Midterm Examination',
      type: 'midterm',
      grade: '10',
      subject: 'Mathematics',
      date: '2024-03-15',
      startTime: '09:00',
      endTime: '11:00',
      duration: '2 hours',
      room: 'Hall A',
      maxMarks: 100,
      passingMarks: 40,
      status: 'upcoming',
      totalStudents: 150,
      invigilator: 'Dr. Sarah Johnson',
      description: 'Algebra and Calculus topics'
    },
    {
      id: 2,
      name: 'Final Examination',
      type: 'final',
      grade: '10',
      subject: 'English',
      date: '2024-03-20',
      startTime: '10:00',
      endTime: '12:30',
      duration: '2.5 hours',
      room: 'Hall B',
      maxMarks: 100,
      passingMarks: 40,
      status: 'upcoming',
      totalStudents: 150,
      invigilator: 'Mr. Michael Chen',
      description: 'Literature and Grammar'
    },
    {
      id: 3,
      name: 'Physics Quiz',
      type: 'quiz',
      grade: '11',
      subject: 'Physics',
      date: '2024-03-10',
      startTime: '08:30',
      endTime: '09:30',
      duration: '1 hour',
      room: 'Lab 3',
      maxMarks: 50,
      passingMarks: 20,
      status: 'completed',
      totalStudents: 120,
      invigilator: 'Ms. Emma Williams',
      description: 'Mechanics and Thermodynamics'
    },
    {
      id: 4,
      name: 'Chemistry Practical',
      type: 'practical',
      grade: '12',
      subject: 'Chemistry',
      date: '2024-03-12',
      startTime: '14:00',
      endTime: '16:00',
      duration: '2 hours',
      room: 'Chemistry Lab',
      maxMarks: 50,
      passingMarks: 20,
      status: 'ongoing',
      totalStudents: 80,
      invigilator: 'Dr. Robert Wilson',
      description: 'Organic Chemistry practical test'
    },
    {
      id: 5,
      name: 'History Term Test',
      type: 'term',
      grade: '9',
      subject: 'History',
      date: '2024-03-08',
      startTime: '11:00',
      endTime: '13:00',
      duration: '2 hours',
      room: 'Room 205',
      maxMarks: 100,
      passingMarks: 40,
      status: 'completed',
      totalStudents: 100,
      invigilator: 'Mrs. Lisa Brown',
      description: 'World History topics'
    }
  ]);

  // Grading Criteria Data
  const [gradingCriteria, setGradingCriteria] = useState([
    {
      id: 1,
      grade: '10',
      subject: 'Mathematics',
      examType: 'midterm',
      criteria: [
        { component: 'Theory', weight: 60, maxMarks: 60 },
        { component: 'Practical', weight: 20, maxMarks: 20 },
        { component: 'Assignment', weight: 10, maxMarks: 10 },
        { component: 'Attendance', weight: 10, maxMarks: 10 }
      ],
      gradingScale: [
        { grade: 'A+', min: 90, max: 100 },
        { grade: 'A', min: 80, max: 89 },
        { grade: 'B+', min: 70, max: 79 },
        { grade: 'B', min: 60, max: 69 },
        { grade: 'C+', min: 50, max: 59 },
        { grade: 'C', min: 40, max: 49 },
        { grade: 'D', min: 30, max: 39 },
        { grade: 'F', min: 0, max: 29 }
      ],
      passingPercentage: 40,
      academicYear: '2024-2025'
    },
    {
      id: 2,
      grade: '11',
      subject: 'Physics',
      examType: 'final',
      criteria: [
        { component: 'Theory', weight: 70, maxMarks: 70 },
        { component: 'Practical', weight: 20, maxMarks: 20 },
        { component: 'Project', weight: 10, maxMarks: 10 }
      ],
      gradingScale: [
        { grade: 'A+', min: 95, max: 100 },
        { grade: 'A', min: 85, max: 94 },
        { grade: 'B+', min: 75, max: 84 },
        { grade: 'B', min: 65, max: 74 },
        { grade: 'C+', min: 55, max: 64 },
        { grade: 'C', min: 40, max: 54 },
        { grade: 'F', min: 0, max: 39 }
      ],
      passingPercentage: 40,
      academicYear: '2024-2025'
    }
  ]);

  // Exam Results Data
  const [examResults, setExamResults] = useState([
    {
      id: 1,
      examId: 3,
      studentId: 'ST001',
      studentName: 'John Smith',
      grade: '11',
      subject: 'Physics',
      examName: 'Physics Quiz',
      marksObtained: 42,
      maxMarks: 50,
      percentage: 84,
      grade: 'A',
      status: 'passed',
      teacherRemarks: 'Excellent performance in mechanics',
      submittedBy: 'Ms. Emma Williams',
      submittedDate: '2024-03-11'
    },
    {
      id: 2,
      examId: 5,
      studentId: 'ST002',
      studentName: 'Emma Johnson',
      grade: '9',
      subject: 'History',
      examName: 'History Term Test',
      marksObtained: 78,
      maxMarks: 100,
      percentage: 78,
      grade: 'B+',
      status: 'passed',
      teacherRemarks: 'Good understanding of historical events',
      submittedBy: 'Mrs. Lisa Brown',
      submittedDate: '2024-03-09'
    },
    {
      id: 3,
      examId: 5,
      studentId: 'ST003',
      studentName: 'Michael Chen',
      grade: '9',
      subject: 'History',
      examName: 'History Term Test',
      marksObtained: 92,
      maxMarks: 100,
      percentage: 92,
      grade: 'A+',
      status: 'passed',
      teacherRemarks: 'Outstanding performance',
      submittedBy: 'Mrs. Lisa Brown',
      submittedDate: '2024-03-09'
    }
  ]);

  // Report Cards Data
  const [reportCards, setReportCards] = useState([
    {
      id: 1,
      studentId: 'ST001',
      studentName: 'John Smith',
      grade: '11',
      section: 'A',
      academicYear: '2024-2025',
      term: 'Term 1',
      subjects: [
        { name: 'Mathematics', marks: 85, maxMarks: 100, grade: 'A' },
        { name: 'Physics', marks: 90, maxMarks: 100, grade: 'A+' },
        { name: 'Chemistry', marks: 78, maxMarks: 100, grade: 'B+' },
        { name: 'English', marks: 82, maxMarks: 100, grade: 'A' },
        { name: 'Computer Science', marks: 95, maxMarks: 100, grade: 'A+' }
      ],
      totalMarks: 430,
      maxTotalMarks: 500,
      percentage: 86,
      overallGrade: 'A',
      attendance: 95,
      remarks: 'Excellent academic performance. Shows great potential in science subjects.',
      classTeacher: 'Dr. Sarah Johnson',
      principalRemarks: 'A promising student with consistent performance.',
      generatedDate: '2024-03-15',
      status: 'published'
    },
    {
      id: 2,
      studentId: 'ST002',
      studentName: 'Emma Johnson',
      grade: '9',
      section: 'B',
      academicYear: '2024-2025',
      term: 'Term 1',
      subjects: [
        { name: 'Mathematics', marks: 72, maxMarks: 100, grade: 'B' },
        { name: 'Science', marks: 68, maxMarks: 100, grade: 'B' },
        { name: 'English', marks: 88, maxMarks: 100, grade: 'A' },
        { name: 'History', marks: 78, maxMarks: 100, grade: 'B+' },
        { name: 'Geography', marks: 82, maxMarks: 100, grade: 'A' }
      ],
      totalMarks: 388,
      maxTotalMarks: 500,
      percentage: 77.6,
      overallGrade: 'B+',
      attendance: 92,
      remarks: 'Good performance overall. Can improve in science subjects.',
      classTeacher: 'Mr. Michael Chen',
      principalRemarks: 'Consistent effort needed in all subjects.',
      generatedDate: '2024-03-15',
      status: 'published'
    }
  ]);

  // Form States
  const [newExam, setNewExam] = useState({
    name: '',
    type: 'midterm',
    grade: '',
    subject: '',
    date: '',
    startTime: '',
    endTime: '',
    duration: '',
    room: '',
    maxMarks: 100,
    passingMarks: 40,
    invigilator: '',
    description: ''
  });

  const [newGrading, setNewGrading] = useState({
    grade: '',
    subject: '',
    examType: 'midterm',
    criteria: [{ component: '', weight: 0, maxMarks: 0 }],
    gradingScale: [
      { grade: 'A+', min: 90, max: 100 },
      { grade: 'A', min: 80, max: 89 },
      { grade: 'B+', min: 70, max: 79 },
      { grade: 'B', min: 60, max: 69 },
      { grade: 'C', min: 40, max: 59 },
      { grade: 'F', min: 0, max: 39 }
    ],
    passingPercentage: 40,
    academicYear: '2024-2025'
  });

  const [newResult, setNewResult] = useState({
    examId: '',
    studentId: '',
    marksObtained: 0,
    teacherRemarks: ''
  });

  // Filtered Data
  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || exam.grade === filterGrade;
    const matchesType = filterExamType === 'all' || exam.type === filterExamType;
    return matchesSearch && matchesGrade && matchesType;
  });

  const filteredResults = examResults.filter(result => {
    const matchesSearch = result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || result.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  const filteredReportCards = reportCards.filter(card => {
    const matchesSearch = card.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || card.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  // Stats Calculation
  const stats = {
    totalExams: exams.length,
    upcomingExams: exams.filter(e => e.status === 'upcoming').length,
    completedExams: exams.filter(e => e.status === 'completed').length,
    avgScore: Math.round(examResults.reduce((sum, r) => sum + r.percentage, 0) / examResults.length),
    pendingResults: 12,
    publishedReports: reportCards.length
  };

  // Handle Add Exam
  const handleAddExam = (e) => {
    e.preventDefault();
    const newExamObj = {
      id: exams.length + 1,
      status: new Date(newExam.date) > new Date() ? 'upcoming' : 'scheduled',
      totalStudents: 0,
      ...newExam
    };
    setExams([...exams, newExamObj]);
    setShowExamForm(false);
    setNewExam({
      name: '',
      type: 'midterm',
      grade: '',
      subject: '',
      date: '',
      startTime: '',
      endTime: '',
      duration: '',
      room: '',
      maxMarks: 100,
      passingMarks: 40,
      invigilator: '',
      description: ''
    });
  };

  // Handle Edit Exam
  const handleEditExam = (exam) => {
    setSelectedExam(exam);
    setShowEditExam(true);
  };

  // Handle Update Exam
  const handleUpdateExam = (e) => {
    e.preventDefault();
    setExams(exams.map(exam => exam.id === selectedExam.id ? selectedExam : exam));
    setShowEditExam(false);
    setSelectedExam(null);
  };

  // Handle Delete Exam
  const handleDeleteExam = (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(exam => exam.id !== id));
    }
  };

  // Handle Add Grading Criteria
  const handleAddGrading = (e) => {
    e.preventDefault();
    const newGradingObj = {
      id: gradingCriteria.length + 1,
      ...newGrading
    };
    setGradingCriteria([...gradingCriteria, newGradingObj]);
    setShowGradingForm(false);
    setGradingCriteria([...gradingCriteria, newGradingObj]);
    setShowGradingForm(false);
    setNewGrading({
      grade: '',
      subject: '',
      examType: 'midterm',
      criteria: [{ component: '', weight: 0, maxMarks: 0 }],
      gradingScale: [
        { grade: 'A+', min: 90, max: 100 },
        { grade: 'A', min: 80, max: 89 },
        { grade: 'B+', min: 70, max: 79 },
        { grade: 'B', min: 60, max: 69 },
        { grade: 'C', min: 40, max: 59 },
        { grade: 'F', min: 0, max: 39 }
      ],
      passingPercentage: 40,
      academicYear: '2024-2025'
    });
  };

  // Handle Delete Grading Criteria
  const handleDeleteGrading = (id) => {
    if (window.confirm('Are you sure you want to delete this grading criteria?')) {
      setGradingCriteria(gradingCriteria.filter(g => g.id !== id));
    }
  };

  // Handle Add Result
  const handleAddResult = (e) => {
    e.preventDefault();
    const exam = exams.find(e => e.id === parseInt(newResult.examId));
    const percentage = (newResult.marksObtained / exam.maxMarks) * 100;
    const grade = calculateGrade(percentage, exam.grade, exam.subject, exam.type);

    const newResultObj = {
      id: examResults.length + 1,
      examId: parseInt(newResult.examId),
      studentId: newResult.studentId,
      studentName: 'New Student', // Would come from API
      grade: exam.grade,
      subject: exam.subject,
      examName: exam.name,
      marksObtained: newResult.marksObtained,
      maxMarks: exam.maxMarks,
      percentage: percentage,
      grade: grade,
      status: percentage >= exam.passingMarks ? 'passed' : 'failed',
      teacherRemarks: newResult.teacherRemarks,
      submittedBy: 'Admin',
      submittedDate: new Date().toISOString().split('T')[0]
    };

    setExamResults([...examResults, newResultObj]);
    setShowResultForm(false);
    setNewResult({
      examId: '',
      studentId: '',
      marksObtained: 0,
      teacherRemarks: ''
    });
  };

  // Handle Delete Result
  const handleDeleteResult = (id) => {
    if (window.confirm('Are you sure you want to delete this exam result?')) {
      setExamResults(examResults.filter(r => r.id !== id));
    }
  };

  // Calculate Grade
  const calculateGrade = (percentage, grade, subject, examType) => {
    const criteria = gradingCriteria.find(g =>
      g.grade === grade && g.subject === subject && g.examType === examType
    );

    if (!criteria) return 'N/A';

    const gradeScale = criteria.gradingScale.find(g =>
      percentage >= g.min && percentage <= g.max
    );

    return gradeScale ? gradeScale.grade : 'F';
  };

  // Generate Report Card
  const handleGenerateReportCard = (studentId) => {
    const studentResults = examResults.filter(r => r.studentId === studentId);
    const student = { id: studentId, name: 'Student Name' }; // Would come from API

    const subjects = studentResults.map(result => ({
      name: result.subject,
      marks: result.marksObtained,
      maxMarks: result.maxMarks,
      grade: result.grade
    }));

    const totalMarks = subjects.reduce((sum, s) => sum + s.marks, 0);
    const maxTotalMarks = subjects.reduce((sum, s) => sum + s.maxMarks, 0);
    const percentage = (totalMarks / maxTotalMarks) * 100;

    const newReportCard = {
      id: reportCards.length + 1,
      studentId: studentId,
      studentName: student.name,
      grade: '10', // Would come from API
      section: 'A', // Would come from API
      academicYear: '2024-2025',
      term: 'Term 1',
      subjects: subjects,
      totalMarks: totalMarks,
      maxTotalMarks: maxTotalMarks,
      percentage: percentage,
      overallGrade: 'B+', // Would be calculated
      attendance: 95, // Would come from API
      remarks: 'Good performance overall.',
      classTeacher: 'Class Teacher',
      principalRemarks: 'Keep up the good work.',
      generatedDate: new Date().toISOString().split('T')[0],
      status: 'published'
    };

    setReportCards([...reportCards, newReportCard]);
  };

  // Export Functions
  const exportExams = () => {
    const csv = [
      ['Name', 'Type', 'Grade', 'Subject', 'Date', 'Time', 'Duration', 'Room', 'Max Marks', 'Status'],
      ...exams.map(e => [
        e.name,
        e.type,
        e.grade,
        e.subject,
        e.date,
        `${e.startTime}-${e.endTime}`,
        e.duration,
        e.room,
        e.maxMarks,
        e.status
      ])
    ].map(row => row.join(',')).join('\n');

    downloadCSV(csv, 'exams_schedule.csv');
  };

  const exportResults = () => {
    const csv = [
      ['Student ID', 'Student Name', 'Exam', 'Subject', 'Marks', 'Max Marks', 'Percentage', 'Grade', 'Status'],
      ...examResults.map(r => [
        r.studentId,
        r.studentName,
        r.examName,
        r.subject,
        r.marksObtained,
        r.maxMarks,
        r.percentage + '%',
        r.grade,
        r.status
      ])
    ].map(row => row.join(',')).join('\n');

    downloadCSV(csv, 'exam_results.csv');
  };

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  // Send Results to Parents
  const handleSendResults = () => {
    alert('Results sent to parents via email/SMS');
  };

  // Publish Report Cards
  const handlePublishReports = () => {
    setReportCards(reportCards.map(card => ({
      ...card,
      status: 'published'
    })));
    alert('Report cards published successfully');
  };

  return (
    <div className="exams-grades-container">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`exams-grades-content ${collapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <div className="exams-header">
          <div>
            <h1>Exams & Grades Management</h1>
            <p>Manage exam schedules, grading criteria, results, and report cards</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => {
              if (activeTab === 'exams') exportExams();
              else if (activeTab === 'results') exportResults();
            }}>
              <Download size={18} />
              <span>Export {activeTab === 'exams' ? 'Schedule' : 'Results'}</span>
            </button>
            {activeTab === 'reportcards' && (
              <button className="btn btn-primary" onClick={handlePublishReports}>
                <Send size={18} />
                <span>Publish All</span>
              </button>
            )}
            {activeTab === 'results' && (
              <button className="btn btn-primary" onClick={handleSendResults}>
                <Mail size={18} />
                <span>Send to Parents</span>
              </button>
            )}
            <button className="btn btn-primary" onClick={() => {
              if (activeTab === 'exams') setShowExamForm(true);
              else if (activeTab === 'grading') setShowGradingForm(true);
              else if (activeTab === 'results') setShowResultForm(true);
            }}>
              <Plus size={18} />
              <span>
                {activeTab === 'exams' && 'Schedule Exam'}
                {activeTab === 'grading' && 'Add Grading'}
                {activeTab === 'results' && 'Add Result'}
                {activeTab === 'reportcards' && 'Generate Reports'}
              </span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="exams-stats">
          <div className="stat-card">
            <div className="stat-icon total">
              <FileText size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.totalExams}</h3>
              <p>Total Exams</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon upcoming">
              <Calendar size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.upcomingExams}</h3>
              <p>Upcoming</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completed">
              <CheckCircle size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.completedExams}</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon average">
              <BarChart3 size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.avgScore}%</h3>
              <p>Avg. Score</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon pending">
              <Clock size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.pendingResults}</h3>
              <p>Pending Results</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon reports">
              <FileSpreadsheet size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.publishedReports}</h3>
              <p>Published Reports</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'exams' ? 'active' : ''}`}
              onClick={() => setActiveTab('exams')}
            >
              <Calendar size={18} />
              <span>Exam Schedule ({exams.length})</span>
            </button>
            <button
              className={`tab ${activeTab === 'grading' ? 'active' : ''}`}
              onClick={() => setActiveTab('grading')}
            >
              <Settings size={18} />
              <span>Grading Criteria</span>
            </button>
            <button
              className={`tab ${activeTab === 'results' ? 'active' : ''}`}
              onClick={() => setActiveTab('results')}
            >
              <Award size={18} />
              <span>Results ({examResults.length})</span>
            </button>
            <button
              className={`tab ${activeTab === 'reportcards' ? 'active' : ''}`}
              onClick={() => setActiveTab('reportcards')}
            >
              <FileSpreadsheet size={18} />
              <span>Report Cards ({reportCards.length})</span>
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="filters-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder={
                activeTab === 'exams' ? 'Search exams by name or subject...' :
                  activeTab === 'results' ? 'Search results by student or subject...' :
                    'Search report cards by student...'
              }
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
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
            {activeTab === 'exams' && (
              <select
                value={filterExamType}
                onChange={(e) => setFilterExamType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="midterm">Midterm</option>
                <option value="final">Final</option>
                <option value="quiz">Quiz</option>
                <option value="practical">Practical</option>
                <option value="term">Term Test</option>
              </select>
            )}
            <button className="btn btn-secondary">
              <Filter size={18} />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Exams Schedule Tab */}
        {activeTab === 'exams' && (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Type</th>
                  <th>Grade</th>
                  <th>Subject</th>
                  <th>Date & Time</th>
                  <th>Duration</th>
                  <th>Room</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map(exam => (
                  <tr key={exam.id} className={exam.status}>
                    <td>
                      <div className="exam-info">
                        <div className="exam-icon">
                          <FileText size={20} />
                        </div>
                        <div>
                          <strong>{exam.name}</strong>
                          <small>{exam.description}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`type-badge ${exam.type}`}>
                        {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className="grade-badge">Grade {exam.grade}</span>
                    </td>
                    <td>
                      <div className="subject-info">
                        <BookOpen size={14} />
                        <span>{exam.subject}</span>
                      </div>
                    </td>
                    <td>
                      <div className="datetime-info">
                        <div className="date">{exam.date}</div>
                        <div className="time">{exam.startTime} - {exam.endTime}</div>
                      </div>
                    </td>
                    <td>
                      <div className="duration-info">
                        <Clock size={14} />
                        <span>{exam.duration}</span>
                      </div>
                    </td>
                    <td>
                      <span className="room-badge">{exam.room}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${exam.status}`}>
                        {exam.status === 'upcoming' && <Clock size={14} />}
                        {exam.status === 'ongoing' && <Bell size={14} />}
                        {exam.status === 'completed' && <CheckCircle size={14} />}
                        {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon view"
                          onClick={() => {
                            setSelectedExam(exam);
                            setShowExamDetails(true);
                          }}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn-icon edit"
                          onClick={() => handleEditExam(exam)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDeleteExam(exam.id)}
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

        {/* Grading Criteria Tab */}
        {activeTab === 'grading' && (
          <div className="grading-container">
            {gradingCriteria.map(criteria => (
              <div key={criteria.id} className="grading-card">
                <div className="grading-header">
                  <div className="grading-title">
                    <h3>{criteria.subject} - Grade {criteria.grade}</h3>
                    <p>{criteria.examType.toUpperCase()} • {criteria.academicYear}</p>
                  </div>
                  <div className="grading-actions">
                    <button
                      className="btn-icon edit"
                      onClick={() => {
                        // Implement edit grading criteria if needed
                        alert('Edit grading criteria not yet implemented');
                      }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-icon delete"
                      onClick={() => handleDeleteGrading(criteria.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="grading-content">
                  <div className="criteria-section">
                    <h4>Assessment Criteria</h4>
                    <div className="criteria-list">
                      {criteria.criteria.map((item, index) => (
                        <div key={index} className="criteria-item">
                          <span className="component">{item.component}</span>
                          <span className="weight">{item.weight}%</span>
                          <span className="marks">Max: {item.maxMarks}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="scale-section">
                    <h4>Grading Scale</h4>
                    <div className="scale-grid">
                      {criteria.gradingScale.map((scale, index) => (
                        <div key={index} className="scale-item">
                          <span className="grade">{scale.grade}</span>
                          <span className="range">{scale.min} - {scale.max}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="passing-section">
                    <div className="passing-info">
                      <Percent size={18} />
                      <span>Passing Percentage: {criteria.passingPercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Exam</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Status</th>
                  <th>Submitted By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map(result => (
                  <tr key={result.id}>
                    <td>
                      <div className="student-info">
                        <div className="student-avatar">
                          {result.studentName.charAt(0)}
                        </div>
                        <div>
                          <strong>{result.studentName}</strong>
                          <small>{result.studentId}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="exam-info">
                        <span className="exam-name">{result.examName}</span>
                        <small>Grade {result.grade}</small>
                      </div>
                    </td>
                    <td>
                      <span className="subject-tag">{result.subject}</span>
                    </td>
                    <td>
                      <div className="marks-info">
                        <span className="marks">{result.marksObtained}</span>
                        <span className="slash">/</span>
                        <span className="max-marks">{result.maxMarks}</span>
                      </div>
                    </td>
                    <td>
                      <div className="percentage-info">
                        <div className="percentage-bar">
                          <div
                            className="percentage-fill"
                            style={{ width: `${result.percentage}%` }}
                          ></div>
                        </div>
                        <span className="percentage-value">{result.percentage}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`grade-badge ${result.grade.replace('+', 'plus')}`}>
                        {result.grade}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${result.status}`}>
                        {result.status === 'passed' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="submitted-info">
                        <span>{result.submittedBy}</span>
                        <small>{result.submittedDate}</small>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon view"
                          onClick={() => {
                            // Implement view result details if needed
                            alert('View result details not yet implemented');
                          }}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn-icon edit"
                          onClick={() => {
                            // Implement edit result if needed
                            alert('Edit result not yet implemented');
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDeleteResult(result.id)}
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

        {/* Report Cards Tab */}
        {activeTab === 'reportcards' && (
          <div className="reportcards-container">
            {filteredReportCards.map(report => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <div className="report-title">
                    <h3>Report Card - {report.studentName}</h3>
                    <p>{report.academicYear} • {report.term} • Grade {report.grade}-{report.section}</p>
                  </div>
                  <div className="report-actions">
                    <button className="btn-icon print">
                      <Printer size={16} />
                    </button>
                    <button className="btn-icon download">
                      <Download size={16} />
                    </button>
                    <button className="btn-icon send">
                      <Mail size={16} />
                    </button>
                  </div>
                </div>

                <div className="report-content">
                  <div className="student-info-section">
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Student ID</label>
                        <p>{report.studentId}</p>
                      </div>
                      <div className="info-item">
                        <label>Name</label>
                        <p>{report.studentName}</p>
                      </div>
                      <div className="info-item">
                        <label>Class Teacher</label>
                        <p>{report.classTeacher}</p>
                      </div>
                      <div className="info-item">
                        <label>Attendance</label>
                        <p>{report.attendance}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="subjects-section">
                    <h4>Subject-wise Performance</h4>
                    <table className="subjects-table">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Marks</th>
                          <th>Max Marks</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.subjects.map((subject, index) => (
                          <tr key={index}>
                            <td>{subject.name}</td>
                            <td>{subject.marks}</td>
                            <td>{subject.maxMarks}</td>
                            <td>
                              <span className={`subject-grade ${subject.grade.replace('+', 'plus')}`}>
                                {subject.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="summary-section">
                    <div className="summary-grid">
                      <div className="summary-item total">
                        <label>Total Marks</label>
                        <p className="value">{report.totalMarks}/{report.maxTotalMarks}</p>
                      </div>
                      <div className="summary-item percentage">
                        <label>Percentage</label>
                        <p className="value">{report.percentage.toFixed(1)}%</p>
                      </div>
                      <div className="summary-item grade">
                        <label>Overall Grade</label>
                        <p className="value grade-badge">{report.overallGrade}</p>
                      </div>
                    </div>
                  </div>

                  <div className="remarks-section">
                    <div className="teacher-remarks">
                      <h5>Class Teacher Remarks</h5>
                      <p>{report.remarks}</p>
                    </div>
                    <div className="principal-remarks">
                      <h5>Principal Remarks</h5>
                      <p>{report.principalRemarks}</p>
                    </div>
                  </div>

                  <div className="report-footer">
                    <div className="footer-info">
                      <span>Generated on: {report.generatedDate}</span>
                      <span className={`status-badge ${report.status}`}>
                        {report.status === 'published' ? <CheckCircle size={14} /> : <Clock size={14} />}
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Exam Modal */}
        {showExamForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Schedule New Exam</h2>
                <button className="close-btn" onClick={() => setShowExamForm(false)}>×</button>
              </div>
              <form onSubmit={handleAddExam}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Exam Name *</label>
                    <input
                      type="text"
                      value={newExam.name}
                      onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                      placeholder="e.g., Midterm Examination"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Exam Type *</label>
                    <select
                      value={newExam.type}
                      onChange={(e) => setNewExam({ ...newExam, type: e.target.value })}
                      required
                    >
                      <option value="midterm">Midterm</option>
                      <option value="final">Final</option>
                      <option value="quiz">Quiz</option>
                      <option value="practical">Practical</option>
                      <option value="term">Term Test</option>
                      <option value="assignment">Assignment</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Grade *</label>
                    <select
                      value={newExam.grade}
                      onChange={(e) => setNewExam({ ...newExam, grade: e.target.value })}
                      required
                    >
                      <option value="">Select Grade</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input
                      type="text"
                      value={newExam.subject}
                      onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                      placeholder="e.g., Mathematics"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date *</label>
                    <input
                      type="date"
                      value={newExam.date}
                      onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Start Time *</label>
                    <input
                      type="time"
                      value={newExam.startTime}
                      onChange={(e) => setNewExam({ ...newExam, startTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Time *</label>
                    <input
                      type="time"
                      value={newExam.endTime}
                      onChange={(e) => setNewExam({ ...newExam, endTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      value={newExam.duration}
                      onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
                      placeholder="e.g., 2 hours"
                    />
                  </div>
                  <div className="form-group">
                    <label>Room *</label>
                    <input
                      type="text"
                      value={newExam.room}
                      onChange={(e) => setNewExam({ ...newExam, room: e.target.value })}
                      placeholder="e.g., Hall A, Room 101"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Marks *</label>
                    <input
                      type="number"
                      value={newExam.maxMarks}
                      onChange={(e) => setNewExam({ ...newExam, maxMarks: e.target.value })}
                      min="1"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Passing Marks</label>
                    <input
                      type="number"
                      value={newExam.passingMarks}
                      onChange={(e) => setNewExam({ ...newExam, passingMarks: e.target.value })}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Invigilator</label>
                    <input
                      type="text"
                      value={newExam.invigilator}
                      onChange={(e) => setNewExam({ ...newExam, invigilator: e.target.value })}
                      placeholder="Teacher name"
                    />
                  </div>
                  <div className="form-group full">
                    <label>Description</label>
                    <textarea
                      value={newExam.description}
                      onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                      placeholder="Exam description, topics covered, etc."
                      rows="3"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowExamForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Schedule Exam
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Grading Criteria Modal */}
        {showGradingForm && (
          <div className="modal-overlay">
            <div className="modal-content wide">
              <div className="modal-header">
                <h2>Add Grading Criteria</h2>
                <button className="close-btn" onClick={() => setShowGradingForm(false)}>×</button>
              </div>
              <form onSubmit={handleAddGrading}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Grade *</label>
                    <select
                      value={newGrading.grade}
                      onChange={(e) => setNewGrading({ ...newGrading, grade: e.target.value })}
                      required
                    >
                      <option value="">Select Grade</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input
                      type="text"
                      value={newGrading.subject}
                      onChange={(e) => setNewGrading({ ...newGrading, subject: e.target.value })}
                      placeholder="e.g., Mathematics"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Exam Type *</label>
                    <select
                      value={newGrading.examType}
                      onChange={(e) => setNewGrading({ ...newGrading, examType: e.target.value })}
                      required
                    >
                      <option value="midterm">Midterm</option>
                      <option value="final">Final</option>
                      <option value="quiz">Quiz</option>
                      <option value="practical">Practical</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Academic Year *</label>
                    <input
                      type="text"
                      value={newGrading.academicYear}
                      onChange={(e) => setNewGrading({ ...newGrading, academicYear: e.target.value })}
                      placeholder="e.g., 2024-2025"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Passing Percentage *</label>
                    <div className="input-with-symbol">
                      <input
                        type="number"
                        value={newGrading.passingPercentage}
                        onChange={(e) => setNewGrading({ ...newGrading, passingPercentage: e.target.value })}
                        min="0"
                        max="100"
                        required
                      />
                      <span className="symbol">%</span>
                    </div>
                  </div>
                </div>

                <div className="criteria-section-modal">
                  <h3>Assessment Criteria</h3>
                  {newGrading.criteria.map((item, index) => (
                    <div key={index} className="criteria-row">
                      <input
                        type="text"
                        placeholder="Component (e.g., Theory)"
                        value={item.component}
                        onChange={(e) => {
                          const newCriteria = [...newGrading.criteria];
                          newCriteria[index].component = e.target.value;
                          setNewGrading({ ...newGrading, criteria: newCriteria });
                        }}
                      />
                      <div className="input-with-symbol">
                        <input
                          type="number"
                          placeholder="Weight"
                          value={item.weight}
                          onChange={(e) => {
                            const newCriteria = [...newGrading.criteria];
                            newCriteria[index].weight = e.target.value;
                            setNewGrading({ ...newGrading, criteria: newCriteria });
                          }}
                          min="0"
                          max="100"
                        />
                        <span className="symbol">%</span>
                      </div>
                      <input
                        type="number"
                        placeholder="Max Marks"
                        value={item.maxMarks}
                        onChange={(e) => {
                          const newCriteria = [...newGrading.criteria];
                          newCriteria[index].maxMarks = e.target.value;
                          setNewGrading({ ...newGrading, criteria: newCriteria });
                        }}
                        min="0"
                      />
                      <button
                        type="button"
                        className="btn-icon delete"
                        onClick={() => {
                          const newCriteria = newGrading.criteria.filter((_, i) => i !== index);
                          setNewGrading({ ...newGrading, criteria: newCriteria });
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setNewGrading({
                        ...newGrading,
                        criteria: [...newGrading.criteria, { component: '', weight: 0, maxMarks: 0 }]
                      });
                    }}
                  >
                    Add Component
                  </button>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowGradingForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Grading Criteria
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Result Modal */}
        {showResultForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add Exam Result</h2>
                <button className="close-btn" onClick={() => setShowResultForm(false)}>×</button>
              </div>
              <form onSubmit={handleAddResult}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Select Exam *</label>
                    <select
                      value={newResult.examId}
                      onChange={(e) => setNewResult({ ...newResult, examId: e.target.value })}
                      required
                    >
                      <option value="">Choose Exam</option>
                      {exams.map(exam => (
                        <option key={exam.id} value={exam.id}>
                          {exam.name} - {exam.subject} (Grade {exam.grade})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Student ID *</label>
                    <input
                      type="text"
                      value={newResult.studentId}
                      onChange={(e) => setNewResult({ ...newResult, studentId: e.target.value })}
                      placeholder="e.g., ST001"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Marks Obtained *</label>
                    <input
                      type="number"
                      value={newResult.marksObtained}
                      onChange={(e) => setNewResult({ ...newResult, marksObtained: e.target.value })}
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group full">
                    <label>Teacher Remarks</label>
                    <textarea
                      value={newResult.teacherRemarks}
                      onChange={(e) => setNewResult({ ...newResult, teacherRemarks: e.target.value })}
                      placeholder="Enter remarks about student's performance..."
                      rows="3"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowResultForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Result
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Report Card Modal */}
        {showReportCard && selectedStudent && (
          <div className="modal-overlay">
            <div className="modal-content wide">
              <div className="modal-header">
                <h2>Student Report Card</h2>
                <button className="close-btn" onClick={() => setShowReportCard(false)}>×</button>
              </div>
              <div className="report-preview">
                {/* Report Card Preview */}
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowReportCard(false)}>
                  Close
                </button>
                <button className="btn btn-primary">
                  <Printer size={18} />
                  <span>Print Report</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Exam Details Modal */}
        {showExamDetails && selectedExam && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Exam Details</h2>
                <button className="close-btn" onClick={() => setShowExamDetails(false)}>×</button>
              </div>
              <div className="exam-details-view">
                <div className="detail-row">
                  <label>Exam Name:</label>
                  <span>{selectedExam.name}</span>
                </div>
                <div className="detail-row">
                  <label>Type:</label>
                  <span className={`type-badge ${selectedExam.type}`}>{selectedExam.type.toUpperCase()}</span>
                </div>
                <div className="detail-row">
                  <label>Subject:</label>
                  <span>{selectedExam.subject} (Grade {selectedExam.grade})</span>
                </div>
                <div className="detail-row">
                  <label>Date & Time:</label>
                  <span>{selectedExam.date} | {selectedExam.startTime} - {selectedExam.endTime}</span>
                </div>
                <div className="detail-row">
                  <label>Duration:</label>
                  <span>{selectedExam.duration}</span>
                </div>
                <div className="detail-row">
                  <label>Room:</label>
                  <span>{selectedExam.room}</span>
                </div>
                <div className="detail-row">
                  <label>Invigilator:</label>
                  <span>{selectedExam.invigilator}</span>
                </div>
                <div className="detail-row">
                  <label>Max Marks:</label>
                  <span>{selectedExam.maxMarks}</span>
                </div>
                <div className="detail-row">
                  <label>Passing Marks:</label>
                  <span>{selectedExam.passingMarks}</span>
                </div>
                <div className="detail-row">
                  <label>Description:</label>
                  <p>{selectedExam.description}</p>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowExamDetails(false)}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowExamDetails(false);
                    handleEditExam(selectedExam);
                  }}
                >
                  <Edit size={16} />
                  <span>Edit Exam</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Exam Modal */}
        {showEditExam && selectedExam && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Edit Exam</h2>
                <button className="close-btn" onClick={() => setShowEditExam(false)}>×</button>
              </div>
              <form onSubmit={handleUpdateExam}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Exam Name *</label>
                    <input
                      type="text"
                      value={selectedExam.name}
                      onChange={(e) => setSelectedExam({ ...selectedExam, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Exam Type *</label>
                    <select
                      value={selectedExam.type}
                      onChange={(e) => setSelectedExam({ ...selectedExam, type: e.target.value })}
                      required
                    >
                      <option value="midterm">Midterm</option>
                      <option value="final">Final</option>
                      <option value="quiz">Quiz</option>
                      <option value="practical">Practical</option>
                      <option value="term">Term Test</option>
                      <option value="assignment">Assignment</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Grade *</label>
                    <input
                      type="text"
                      value={selectedExam.grade}
                      onChange={(e) => setSelectedExam({ ...selectedExam, grade: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input
                      type="text"
                      value={selectedExam.subject}
                      onChange={(e) => setSelectedExam({ ...selectedExam, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date *</label>
                    <input
                      type="date"
                      value={selectedExam.date}
                      onChange={(e) => setSelectedExam({ ...selectedExam, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Start Time *</label>
                    <input
                      type="time"
                      value={selectedExam.startTime}
                      onChange={(e) => setSelectedExam({ ...selectedExam, startTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Time *</label>
                    <input
                      type="time"
                      value={selectedExam.endTime}
                      onChange={(e) => setSelectedExam({ ...selectedExam, endTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Room *</label>
                    <input
                      type="text"
                      value={selectedExam.room}
                      onChange={(e) => setSelectedExam({ ...selectedExam, room: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Marks *</label>
                    <input
                      type="number"
                      value={selectedExam.maxMarks}
                      onChange={(e) => setSelectedExam({ ...selectedExam, maxMarks: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="form-group full">
                    <label>Description</label>
                    <textarea
                      value={selectedExam.description}
                      onChange={(e) => setSelectedExam({ ...selectedExam, description: e.target.value })}
                      rows="3"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditExam(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Exam
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamsGrades;
