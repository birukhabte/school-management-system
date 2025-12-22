import React from "react";
import "../../Styles/AdminDashboard.css";
import {
    Users,
    GraduationCap,
    BookOpen,
    FileText,
    CalendarCheck,
    Bell,
    TrendingUp,
    Activity
} from 'lucide-react';

/* ---------- Admin Dashboard Overview ---------- */
const AdminDashboard = () => {
    // Dummy data (later replace with API data)
    const stats = {
        students: 520,
        teachers: 35,
        classes: 18,
        subjects: 42,
        todayAttendance: "92%",
        pendingRequests: 7,
        announcements: 3
    };

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <h1>Welcome back, Admin!</h1>
                <p className="dashboard-subtitle">Here's what's happening in your school today</p>
            </div>

            {/* Overview Cards */}
            <section className="overview-section">
                <h2>
                    <Users className="section-icon" />
                    Overview
                </h2>
                <ul className="stats-grid">
                    <li className="stat-card student-stat">
                        <Users className="stat-icon" size={28} />
                        <span className="stat-value">{stats.students}</span>
                        <span className="stat-label">Total Students</span>
                    </li>
                    <li className="stat-card teacher-stat">
                        <GraduationCap className="stat-icon" size={28} />
                        <span className="stat-value">{stats.teachers}</span>
                        <span className="stat-label">Total Teachers</span>
                    </li>
                    <li className="stat-card class-stat">
                        <BookOpen className="stat-icon" size={28} />
                        <span className="stat-value">{stats.classes}</span>
                        <span className="stat-label">Total Classes</span>
                    </li>
                    <li className="stat-card subject-stat">
                        <FileText className="stat-icon" size={28} />
                        <span className="stat-value">{stats.subjects}</span>
                        <span className="stat-label">Total Subjects</span>
                    </li>
                </ul>
            </section>

            {/* Quick Stats */}
            <section className="quick-stats-section">
                <h2>
                    <Activity className="section-icon" />
                    Quick Stats
                </h2>
                <ul className="quick-stats-list">
                    <li className="quick-stat-card">
                        <div className="quick-stat-header">
                            <CalendarCheck className="quick-stat-icon" size={24} />
                            <span className="quick-stat-title">Today's Attendance</span>
                        </div>
                        <span className="quick-stat-value attendance-value">{stats.todayAttendance}</span>
                        <span className="quick-stat-trend">↑ 2% from yesterday</span>
                    </li>
                    <li className="quick-stat-card">
                        <div className="quick-stat-header">
                            <Bell className="quick-stat-icon" size={24} />
                            <span className="quick-stat-title">Pending Requests</span>
                        </div>
                        <span className="quick-stat-value pending-value">{stats.pendingRequests}</span>
                        <span className="quick-stat-trend">Requires attention</span>
                    </li>
                    <li className="quick-stat-card">
                        <div className="quick-stat-header">
                            <Bell className="quick-stat-icon" size={24} />
                            <span className="quick-stat-title">Announcements</span>
                        </div>
                        <span className="quick-stat-value announcements-value">{stats.announcements}</span>
                        <span className="quick-stat-trend">Active this week</span>
                    </li>
                </ul>
            </section>

            {/* Analytics Section */}
            <section className="analytics-section">
                <h2>
                    <TrendingUp className="section-icon" />
                    Analytics
                </h2>
                <div className="charts-container">
                    <div className="chart-card">
                        <h3>Student Growth</h3>
                        <div className="chart-placeholder">
                            <p>📈 Student Enrollment Trends</p>
                            <div className="mock-chart">
                                <div className="chart-bar" style={{ height: '80%' }}></div>
                                <div className="chart-bar" style={{ height: '90%' }}></div>
                                <div className="chart-bar" style={{ height: '70%' }}></div>
                                <div className="chart-bar" style={{ height: '95%' }}></div>
                                <div className="chart-bar" style={{ height: '85%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="chart-card">
                        <h3>Attendance Trends</h3>
                        <div className="chart-placeholder">
                            <p>📊 Weekly Attendance Overview</p>
                            <div className="mock-chart">
                                <div className="chart-line" style={{ width: '70%' }}></div>
                                <div className="chart-line" style={{ width: '85%' }}></div>
                                <div className="chart-line" style={{ width: '90%' }}></div>
                                <div className="chart-line" style={{ width: '80%' }}></div>
                                <div className="chart-line" style={{ width: '95%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Activity (Optional) */}
            <section className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                    <div className="activity-item">
                        <span className="activity-time">10:30 AM</span>
                        <span className="activity-text">New student registration - Sarah Johnson</span>
                    </div>
                    <div className="activity-item">
                        <span className="activity-time">09:15 AM</span>
                        <span className="activity-text">Class 10-B attendance marked</span>
                    </div>
                    <div className="activity-item">
                        <span className="activity-time">Yesterday</span>
                        <span className="activity-text">Monthly report generated</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;