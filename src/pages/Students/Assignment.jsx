import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../../Styles/StudentStyle/Assignments.css'; // Reusing dashboard styles for consistency

import {
  Upload,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Download,
  Eye,
  Send,

} from 'lucide-react';


const Assignments = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Algebra Problem Set',
      subject: 'Mathematics',
      description: 'Solve problems on quadratic equations and functions.',
      dueDate: '2024-03-25',
      dueTime: '23:59',
      status: 'pending',
      marks: null,
      feedback: null,
      file: null,
      submittedAt: null,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      subject: 'Physics',
      description: 'Write a report on optics experiment.',
      dueDate: '2024-03-28',
      dueTime: '14:00',
      status: 'submitted',
      marks: '18/20',
      feedback: 'Excellent work! Well structured report.',
      file: 'lab_report.pdf',
      submittedAt: '2024-03-27 13:45',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'History Essay',
      subject: 'History',
      description: 'Essay on World War 2 causes and effects.',
      dueDate: '2024-04-02',
      dueTime: '17:00',
      status: 'in-progress',
      marks: null,
      feedback: null,
      file: null,
      submittedAt: null,
      priority: 'high'
    },
    {
      id: 4,
      title: 'Programming Project',
      subject: 'Computer Science',
      description: 'Build a simple calculator app.',
      dueDate: '2024-04-05',
      dueTime: '23:59',
      status: 'pending',
      marks: null,
      feedback: null,
      file: null,
      submittedAt: null,
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Chemistry Worksheet',
      subject: 'Chemistry',
      description: 'Complete chemical equations worksheet.',
      dueDate: '2024-03-22',
      dueTime: '09:00',
      status: 'submitted',
      marks: '15/20',
      feedback: 'Good attempt, need more detail in explanations.',
      file: 'worksheet.pdf',
      submittedAt: '2024-03-21 16:30',
      priority: 'low'
    },
    {
      id: 6,
      title: 'English Composition',
      subject: 'English',
      description: 'Write a descriptive essay about your hometown.',
      dueDate: '2024-04-01',
      dueTime: '12:00',
      status: 'pending',
      marks: null,
      feedback: null,
      file: null,
      submittedAt: null,
      priority: 'medium'
    }
  ]);


  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return '#2ecc71';
      case 'in-progress': return '#f39c12';
      case 'pending': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#2ecc71';
      default: return '#95a5a6';
    }
  };

  const calculateDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleFileUpload = (assignmentId, file) => {
    if (!file) return;

    setUploading(true);

    // Simulate upload
    setTimeout(() => {
      const updatedAssignments = assignments.map(assignment => {
        if (assignment.id === assignmentId) {
          return {
            ...assignment,
            status: 'submitted',
            file: file.name,
            submittedAt: new Date().toLocaleString()
          };
        }
        return assignment;
      });

      setAssignments(updatedAssignments);
      setSelectedFile(null);
      setUploading(false);
      alert('Assignment submitted successfully!');
    }, 1500);
  };


  const pendingAssignments = assignments.filter(a => a.status !== 'submitted').length;
  const submittedAssignments = assignments.filter(a => a.status === 'submitted').length;

  return (
    <div className="student-dashboard">
      <Sidebar />
      <div className="assignments-container">




        <div className="assignments-grid">
          {assignments.map(assignment => {
            const daysLeft = calculateDaysLeft(assignment.dueDate);
            const isOverdue = daysLeft < 0 && assignment.status !== 'submitted';

            return (
              <div key={assignment.id} className="assignment-card">
                <div className="assignment-header">
                  <div className="subject-badge">
                    {assignment.subject}
                  </div>
                  <div className="priority-badge" style={{ backgroundColor: getPriorityColor(assignment.priority) }}>
                    {assignment.priority}
                  </div>
                </div>

                <h3>{assignment.title}</h3>
                <p className="assignment-description">{assignment.description}</p>

                <div className="assignment-details">
                  <div className="detail-item">
                    <Calendar size={14} />
                    <span>Due: {assignment.dueDate} at {assignment.dueTime}</span>
                  </div>
                  {isOverdue && (
                    <div className="detail-item overdue">
                      <AlertCircle size={14} />
                      <span>Overdue by {Math.abs(daysLeft)} days</span>
                    </div>
                  )}
                  {!isOverdue && daysLeft >= 0 && assignment.status !== 'submitted' && (
                    <div className="detail-item">
                      <Clock size={14} />
                      <span>{daysLeft} days left</span>
                    </div>
                  )}
                  {assignment.status === 'submitted' && assignment.submittedAt && (
                    <div className="detail-item submitted">
                      <CheckCircle size={14} />
                      <span>Submitted: {assignment.submittedAt}</span>
                    </div>
                  )}
                </div>

                <div className="assignment-status">
                  <div className="status-indicator" style={{ backgroundColor: getStatusColor(assignment.status) }}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </div>
                  {assignment.marks && (
                    <div className="marks-badge">
                      Marks: {assignment.marks}
                    </div>
                  )}
                </div>

                {assignment.status === 'submitted' && assignment.feedback && (
                  <div className="feedback-section">
                    <h4>Teacher Feedback:</h4>
                    <p>{assignment.feedback}</p>
                    {assignment.file && (
                      <button className="btn-file">
                        <Download size={14} />
                        Download Submitted File
                      </button>
                    )}
                  </div>
                )}

                {assignment.status !== 'submitted' && (
                  <div className="upload-section">
                    <div className="file-input">
                      <label htmlFor={`file-${assignment.id}`}>
                        <Upload size={16} />
                        <span>{selectedFile?.name || 'Choose file'}</span>
                      </label>
                      <input
                        id={`file-${assignment.id}`}
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                    </div>
                    <button
                      className={`submit-btn ${uploading ? 'uploading' : ''}`}
                      onClick={() => handleFileUpload(assignment.id, selectedFile)}
                      disabled={!selectedFile || uploading}
                    >
                      {uploading ? 'Uploading...' : 'Submit Assignment'}
                      <Send size={16} />
                    </button>
                  </div>
                )}

                <div className="assignment-actions">
                  <button className="action-btn view-btn">
                    <Eye size={16} />
                    View Details
                  </button>
                  {assignment.file && (
                    <button className="action-btn download-btn">
                      <Download size={16} />
                      Download
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="assignment-instructions">
          <h3>📝 Submission Guidelines</h3>
          <ul>
            <li>Submit assignments before the deadline</li>
            <li>Allowed formats: PDF, DOC, DOCX, PPT, ZIP</li>
            <li>Maximum file size: 10MB</li>
            <li>Name your files appropriately</li>
            <li>Late submissions may incur penalties</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Assignments;