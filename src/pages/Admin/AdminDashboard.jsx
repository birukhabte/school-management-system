
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { formatCurrency } from '../../utils/formatters';
import "../../Styles/AdminDashboard.css";

import {
  Users,
  GraduationCap,
  Calendar,
  DollarSign,
  Bell,
  TrendingUp,
  TrendingDown,
  Clock,
  UserCheck,
  UserX,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  MoreVertical,
  ChevronRight,
  BarChart,
  PieChart,
  Calendar as CalendarIcon,
  MessageSquare,
  FileText,
  Settings,
  RefreshCw,
  Filter,
  Search,
  Home
} from 'lucide-react';

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  // Dashboard Stats
  const [stats, setStats] = useState({
    totalStudents: 1250,
    totalTeachers: 85,
    totalClasses: 48,
    totalSubjects: 32,
    todayAttendance: {
      students: {
        present: 1050,
        absent: 120,
        late: 30,
        rate: 87.5
      },
      teachers: {
        present: 78,
        absent: 5,
        late: 2,
        rate: 91.8
      }
    },
    fees: {
      collected: 1250000,
      pending: 250000,
      thisMonth: 450000,
      target: 1500000
    },
    academicYear: '2025-2026',
    schoolYear: '2025-26'
  });

  // Upcoming Events
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: 'Annual Sports Day',
      date: '2025-03-20',
      time: '09:00 AM',
      type: 'sports',
      location: 'School Ground',
      organizer: 'Sports Dept',
      participants: 500
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      date: '2024-03-22',
      time: '02:00 PM',
      type: 'meeting',
      location: 'Main Hall',
      organizer: 'Admin Office',
      participants: 120
    },
    {
      id: 3,
      title: 'Science Exhibition',
      date: '2024-03-25',
      time: '10:00 AM',
      type: 'academic',
      location: 'Science Block',
      organizer: 'Science Dept',
      participants: 300
    },
    {
      id: 4,
      title: 'Cultural Fest',
      date: '2024-03-28',
      time: '06:00 PM',
      type: 'cultural',
      location: 'Auditorium',
      organizer: 'Cultural Club',
      participants: 800
    },
    {
      id: 5,
      title: 'Board Exam Preparation',
      date: '2024-04-01',
      time: '08:00 AM',
      type: 'academic',
      location: 'Classrooms',
      organizer: 'Exam Dept',
      participants: 350
    }
  ]);

  // Latest Announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'School Reopening After Spring Break',
      content: 'School will reopen on April 1st, 2025. All students are expected to be present in proper school uniform.',
      date: '2025-03-18',
      time: '10:30 AM',
      priority: 'high',
      category: 'general',
      author: 'Principal'
    },
    {
      id: 2,
      title: 'Fee Payment Deadline Extended',
      content: 'Last date for quarterly fee payment has been extended to March 25th, 2024.',
      date: '2024-03-17',
      time: '03:45 PM',
      priority: 'medium',
      category: 'finance',
      author: 'Accounts Dept'
    },
    {
      id: 3,
      title: 'New Library Timings',
      content: 'Library will now remain open until 6:00 PM on weekdays.',
      date: '2024-03-16',
      time: '11:20 AM',
      priority: 'low',
      category: 'academic',
      author: 'Librarian'
    },
    {
      id: 4,
      title: 'Sports Day Volunteers Needed',
      content: 'Students interested in volunteering for Annual Sports Day, please register by March 19th.',
      date: '2024-03-15',
      time: '02:15 PM',
      priority: 'medium',
      category: 'sports',
      author: 'Sports Committee'
    },
    {
      id: 5,
      title: 'Teacher Training Workshop',
      content: 'All teaching staff must attend the workshop on Modern Teaching Techniques on March 21st.',
      date: '2024-03-14',
      time: '09:00 AM',
      priority: 'high',
      category: 'staff',
      author: 'HR Department'
    }
  ]);

  // Recent Activities
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      action: 'New Student Admission',
      user: 'Biruk Habte',
      time: '10 minutes ago',
      icon: '👨‍🎓',
      type: 'admission'
    },
    {
      id: 2,
      action: `Fee Payment Received (${formatCurrency(12000)})`,
      user: 'Epherem Ayalew',
      time: '25 minutes ago',
      icon: '💰',
      type: 'payment'
    },
    {
      id: 3,
      action: `Bulk Grant Received (${formatCurrency(2500000)})`,
      user: 'Ministry of Education',
      time: '1 hour ago',
      icon: '🏦',
      type: 'grant'
    },

    {
      id: 4,
      action: 'Exam Results Published',
      user: 'Exam Dept',
      time: '2 hours ago',
      icon: '📊',
      type: 'exam'
    },
    {
      id: 5,
      action: 'Staff Meeting Scheduled',
      user: 'Principal',
      time: '3 hours ago',
      icon: '👥',
      type: 'meeting'
    }
  ]);

  // Attendance Trends
  const [attendanceTrends, setAttendanceTrends] = useState([
    { day: 'Mon', students: 88, teachers: 92 },
    { day: 'Tue', students: 87, teachers: 94 },
    { day: 'Wed', students: 89, teachers: 91 },
    { day: 'Thu', students: 86, teachers: 93 },
    { day: 'Fri', students: 90, teachers: 95 },

  ]);

  // Class-wise Attendance
  const [classAttendance, setClassAttendance] = useState([
    { grade: '9', section: 'A', present: 45, total: 50, rate: 90 },
    { grade: '9', section: 'B', present: 42, total: 48, rate: 87.5 },
    { grade: '10', section: 'A', present: 48, total: 52, rate: 92.3 },
    { grade: '10', section: 'B', present: 46, total: 50, rate: 92 },
    { grade: '11', section: 'A', present: 44, total: 48, rate: 91.7 },
    { grade: '11', section: 'B', present: 43, total: 47, rate: 91.5 },
    { grade: '12', section: 'A', present: 49, total: 52, rate: 94.2 },
    { grade: '12', section: 'B', present: 47, total: 50, rate: 94 }
  ]);

  // Quick Actions
  const quickActions = [
    { icon: '📝', label: 'Add Student', action: '/students/add' },
    { icon: '👨‍🏫', label: 'Add Teacher', action: '/teachers/add' },
    { icon: '💰', label: 'Collect Fee', action: '/fees/collect' },
    { icon: '📊', label: 'Generate Report', action: '/reports' },
    { icon: '📢', label: 'New Announcement', action: '/announcements/add' },
    { icon: '📅', label: 'Add Event', action: '/events/add' }
  ];

  // Handle Quick Action
  const handleQuickAction = (action) => {
    alert(`Navigating to: ${action}`);
    // In actual implementation, use router.push(action)
  };

  // Refresh Dashboard
  const refreshDashboard = () => {
    // Simulate API call
    setStats(prev => ({
      ...prev,
      todayAttendance: {
        students: {
          present: Math.floor(Math.random() * 50) + 1000,
          absent: Math.floor(Math.random() * 50) + 100,
          late: Math.floor(Math.random() * 20) + 20,
          rate: Math.random() * 5 + 85
        }
      }
    }));
  };

  // Mark Announcement as Read
  //Goes through all announcements
  //Keeps only those whose id does NOT match the clicked one
  //Effectively removes the read announcement
  const markAsRead = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <div className="admin-dashboard-container">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`dashboard-content ${collapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1>Admin Dashboard</h1>
            <div className="breadcrumb">
              <Home size={16} />
              <ChevronRight size={16} />
              <span>Dashboard</span>
            </div>
          </div>
          <div className="header-right">
            <div className="academic-year">
              <CalendarIcon size={18} />
              <span>Academic Year: {stats.academicYear}</span>
            </div>
            <button className="btn btn-secondary" onClick={refreshDashboard}>
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
            <button className="btn btn-primary">
              <Download size={18} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-card primary">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.totalStudents.toLocaleString()}</h3>
              <p>Total Students</p>
            </div>
            <div className="stat-trend positive">
              <TrendingUp size={16} />
              <span>+5.2%</span>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-icon">
              <GraduationCap size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.totalTeachers}</h3>
              <p>Total Teachers</p>
            </div>
            <div className="stat-trend positive">
              <TrendingUp size={16} />
              <span>+2.1%</span>
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-icon">
              <UserCheck size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.todayAttendance.students.rate}%</h3>
              <p>Student Attendance</p>
            </div>
            <div className="attendance-detail">
              <span className="present">{stats.todayAttendance.students.present} Present</span>
            </div>
          </div>

          <div className="stat-card danger">
            <div className="stat-icon">
              <UserX size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.todayAttendance.students.absent}</h3>
              <p>Absent Today</p>
            </div>
            <div className="stat-trend negative">
              <TrendingDown size={16} />
              <span>-1.5%</span>
            </div>
          </div>

          <div className="stat-card info">
            <div className="stat-icon">
              <DollarSign size={24} />
            </div>
            <div className="stat-info">
              <h3>{formatCurrency(stats.fees.collected)}</h3>
              <p>Fees Collected</p>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(stats.fees.collected / stats.fees.target) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="stat-card purple">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            {/*upcomingEvents[0] → gets the first event (next event)
               ?. (optional chaining) prevents errors
                 If there is no event, it safely returns undefined*/ }
            <div className="stat-info">
              <h3>{upcomingEvents.length}</h3>
              <p>Upcoming Events</p>
            </div>
            <div className="next-event">
              <small>{upcomingEvents[0]?.title}</small>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          {/* Left Column */}
          <div className="dashboard-left">
            {/* Attendance Overview */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Attendance Overview</h3>
                <div className="card-actions">
                  <select defaultValue="today">
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                  <button className="btn-icon">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
              <div className="attendance-overview">
                <div className="attendance-stats-grid">
                  <div className="attendance-stat">
                    <div className="stat-label">Student Attendance</div>
                    <div className="stat-value">{stats.todayAttendance.students.rate}%</div>
                    <div className="stat-details">
                      <span className="present-dot"></span>
                      <span>{stats.todayAttendance.students.present} Present</span>
                      <span className="absent-dot"></span>
                      <span>{stats.todayAttendance.students.absent} Absent</span>
                      <span className="late-dot"></span>
                      <span>{stats.todayAttendance.students.late} Late</span>
                    </div>
                  </div>
                  <div className="attendance-stat">
                    <div className="stat-label">Teacher Attendance</div>
                    <div className="stat-value">{stats.todayAttendance.teachers.rate}%</div>
                    <div className="stat-details">
                      <span className="present-dot"></span>
                      <span>{stats.todayAttendance.teachers.present} Present</span>
                      <span className="absent-dot"></span>
                      <span>{stats.todayAttendance.teachers.absent} Absent</span>
                      <span className="late-dot"></span>
                      <span>{stats.todayAttendance.teachers.late} Late</span>
                    </div>
                  </div>
                </div>
                <div className="attendance-trend">
                  <h4>Weekly Trend</h4>
                  <div className="trend-chart">
                    {attendanceTrends.map((day, index) => (
                      <div key={index} className="trend-bar">
                        <div className="bar-group">
                          <div
                            className="bar student-bar"
                            style={{ height: `${day.students}%` }}
                            title={`Students: ${day.students}%`}
                          ></div>
                          <div
                            className="bar teacher-bar"
                            style={{ height: `${day.teachers}%` }}
                            title={`Teachers: ${day.teachers}%`}
                          ></div>
                        </div>
                        <span className="day-label">{day.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="trend-legend">
                    <div className="legend-item">
                      <span className="legend-dot student"></span>
                      <span>Students</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot teacher"></span>
                      <span>Teachers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Class-wise Attendance */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Class-wise Attendance</h3>
                <button className="btn btn-secondary btn-sm">
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="class-attendance-table">
                <table>
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Present</th>
                      <th>Total</th>
                      <th>Rate</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classAttendance.map((cls, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{cls.grade}-{cls.section}</strong>
                        </td>
                        <td>{cls.present}</td>
                        <td>{cls.total}</td>
                        <td>
                          <div className="rate-cell">
                            <span className="rate-value">{cls.rate}%</span>
                            <div className="rate-bar">
                              <div
                                className="rate-fill"
                                style={{ width: `${cls.rate}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge ${cls.rate >= 90 ? 'success' : cls.rate >= 85 ? 'warning' : 'danger'}`}>
                            {cls.rate >= 90 ? 'Excellent' : cls.rate >= 85 ? 'Good' : 'Needs Attention'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="dashboard-right">
            {/* Upcoming Events */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Upcoming Events</h3>
                <button className="btn btn-secondary btn-sm" onClick={() => handleQuickAction('/events')}>
                  View Calendar
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="events-list">
                {upcomingEvents.slice(0, 4).map(event => (  //Takes only the first 4 events
                  <div key={event.id} className="event-item">
                    <div className="event-date">
                      <div className="event-day">{new Date(event.date).getDate()}</div>
                      <div className="event-month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                    </div>
                    <div className="event-details">
                      <h4>{event.title}</h4>
                      <div className="event-meta">
                        <span className="event-time">
                          <Clock size={14} />
                          {event.time}
                        </span>
                        <span className={`event-type ${event.type}`}>
                          {event.type}
                        </span>
                      </div>
                      <div className="event-info">
                        <span>📍 {event.location}</span>
                        <span>👥 {event.participants} participants</span>
                      </div>
                    </div>
                    <button className="btn-icon">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-link"
                  onClick={() => handleQuickAction('/events/add')}
                >
                  + Add New Event
                </button>
              </div>
            </div>

            {/* Latest Announcements */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Latest Announcements</h3>
                <div className="announcement-badge">
                  <Bell size={18} />
                  <span className="badge-count">{announcements.length}</span>
                </div>
              </div>
              <div className="announcements-list">
                {announcements.slice(0, 3).map(announcement => (
                  <div key={announcement.id} className="announcement-item">
                    <div className={`announcement-priority ${announcement.priority}`}></div>
                    <div className="announcement-content">
                      <h4>{announcement.title}</h4>
                      <p>{announcement.content}</p>
                      <div className="announcement-meta">
                        <span className="author">By {announcement.author}</span>
                        <span className="time">{announcement.time}</span>
                        <span className={`category ${announcement.category}`}>
                          {announcement.category}
                        </span>
                      </div>
                    </div>
                    <div className="announcement-actions">
                      <button
                        className="btn-icon"
                        title="Mark as read"
                        onClick={() => markAsRead(announcement.id)}
                      >
                        <CheckCircle size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-link"
                  onClick={() => handleQuickAction('/announcements')}
                >
                  View All Announcements
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="quick-actions-grid">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="quick-action-btn"
                    onClick={() => handleQuickAction(action.action)}
                  >
                    <span className="action-icon">{action.icon}</span>
                    <span className="action-label">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Recent Activities</h3>
                <button className="btn-icon">
                  <Filter size={18} />
                </button>
              </div>
              <div className="activities-list">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.icon}
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">{activity.action}</div>
                      <div className="activity-meta">
                        <span className="user">{activity.user}</span>
                        <span className="time">{activity.time}</span>
                      </div>
                    </div>
                    <div className={`activity-type ${activity.type}`}>
                      {activity.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="dashboard-footer">
          <div className="footer-stats">
            <div className="footer-stat">
              <div className="footer-label">Fees Collection</div>
              <div className="footer-value">{formatCurrency(stats.fees.collected)}</div>
              <div className="footer-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill success"
                    style={{ width: `${(stats.fees.collected / stats.fees.target) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {((stats.fees.collected / stats.fees.target) * 100).toFixed(1)}% of target
                </span>
              </div>
            </div>

            <div className="footer-stat">
              <div className="footer-label">Pending Fees</div>
              <div className="footer-value">{formatCurrency(stats.fees.pending)}</div>
              <div className="pending-breakdown">
                <span className="breakdown-item">
                  <span className="dot overdue"></span>
                  Overdue: {formatCurrency(150000)}
                </span>
                <span className="breakdown-item">
                  <span className="dot current"></span>
                  Current: {formatCurrency(100000)}
                </span>
              </div>
            </div>

            <div className="footer-stat">
              <div className="footer-label">This Month Collection</div>
              <div className="footer-value">{formatCurrency(stats.fees.thisMonth)}</div>
              <div className="month-trend">
                <TrendingUp size={16} className="trend-up" />
                <span>+12.5% from last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;