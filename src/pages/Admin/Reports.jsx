import React, { useState } from 'react';
import Sidebar from './Sidebar';
import {
    BarChart3,
    PieChart,
    LineChart,
    Download,
    Calendar,
    Filter,
    Users,
    GraduationCap,
    BookOpen,
    ClipboardList
} from 'lucide-react';
import '../../Styles/Reports.css';

const Reports = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeReport, setActiveReport] = useState('academic');

    const reportTypes = [
        { id: 'academic', label: 'Academic Performance', icon: <GraduationCap size={18} /> },
        { id: 'attendance', label: 'Attendance Analysis', icon: <ClipboardList size={18} /> },
        { id: 'financial', label: 'Financial Summary', icon: <BarChart3 size={18} /> },
        { id: 'enrollment', label: 'Enrollment Trends', icon: <Users size={18} /> }
    ];

    return (
        <div className="reports-container">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className={`reports-content ${collapsed ? 'collapsed' : ''}`}>
                <div className="reports-header">
                    <div className="header-info">
                        <h1>Reports & Analytics</h1>
                        <p>Generate detailed insights and academic performance reviews</p>
                    </div>
                    <div className="header-actions">
                        <div className="date-picker">
                            <Calendar size={18} />
                            <span>March 2024</span>
                        </div>
                        <button className="btn btn-primary">
                            <Download size={18} />
                            <span>Export Full Report</span>
                        </button>
                    </div>
                </div>

                {/* Report Navigation */}
                <div className="report-tabs">
                    {reportTypes.map(report => (
                        <button
                            key={report.id}
                            className={`report-tab ${activeReport === report.id ? 'active' : ''}`}
                            onClick={() => setActiveReport(report.id)}
                        >
                            {report.icon}
                            <span>{report.label}</span>
                        </button>
                    ))}
                </div>

                <div className="report-main">
                    {/* Placeholder for actual charts/data */}
                    <div className="report-grid">
                        <div className="report-card chart-large">
                            <div className="card-header">
                                <h3>{activeReport.charAt(0).toUpperCase() + activeReport.slice(1)} Overview</h3>
                                <button className="btn-icon"><Filter size={18} /></button>
                            </div>
                            <div className="chart-placeholder">
                                <LineChart size={64} color="#e2e8f0" strokeWidth={1} />
                                <p>Interactive Chart Visualization will be rendered here.</p>
                            </div>
                        </div>

                        <div className="report-card summary">
                            <div className="card-header">
                                <h3>Key Metrics</h3>
                            </div>
                            <div className="metrics-list">
                                <div className="metric-item">
                                    <span>Average Grade</span>
                                    <strong>A- (88.5%)</strong>
                                </div>
                                <div className="metric-item">
                                    <span>Class Participation</span>
                                    <strong>92%</strong>
                                </div>
                                <div className="metric-item">
                                    <span>Improvement Rate</span>
                                    <strong className="text-success">+5.4%</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="report-grid secondary">
                        <div className="report-card">
                            <div className="card-header">
                                <h3>Distribution</h3>
                            </div>
                            <div className="chart-placeholder mini">
                                <PieChart size={48} color="#e2e8f0" strokeWidth={1} />
                            </div>
                        </div>
                        <div className="report-card">
                            <div className="card-header">
                                <h3>Comparison</h3>
                            </div>
                            <div className="chart-placeholder mini">
                                <BarChart3 size={48} color="#e2e8f0" strokeWidth={1} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
