import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  FileText,
  BarChart2,
  Bell,
  Clock,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  GraduationCap
} from 'lucide-react';
import '../../Styles/Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebarContainer ${collapsed ? 'collapsed' : ''}`}>
      <button
        className="toggle-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div className="sidebar-header">
        <div className="logo-icon">
          <GraduationCap size={32} />
        </div>
        {!collapsed && <h2 className="sidebar-title">Student Portal</h2>}
      </div>

      <div className="sidebar-menu">
        <Link to="/student/dashboard" className={`sidebar-item ${isActive('/student/dashboard') ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          {!collapsed && <span>Dashboard</span>}
        </Link>

        <Link to="/student/classes" className={`sidebar-item ${isActive('/student/classes') ? 'active' : ''}`}>
          <BookOpen size={20} />
          {!collapsed && <span>Classes</span>}
        </Link>

        <Link to="/student/attendance" className={`sidebar-item ${isActive('/student/attendance') ? 'active' : ''}`}>
          <CalendarCheck size={20} />
          {!collapsed && <span>Attendance</span>}
        </Link>

        <Link to="/student/assignments" className={`sidebar-item ${isActive('/student/assignments') ? 'active' : ''}`}>
          <FileText size={20} />
          {!collapsed && <span>Assignments</span>}
        </Link>

        <Link to="/student/exams" className={`sidebar-item ${isActive('/student/exams') ? 'active' : ''}`}>
          <BarChart2 size={20} />
          {!collapsed && <span>Exams</span>}
        </Link>

        <Link to="/student/timetable" className={`sidebar-item ${isActive('/student/timetable') ? 'active' : ''}`}>
          <Clock size={20} />
          {!collapsed && <span>Timetable</span>}
        </Link>

        <div className="sidebar-divider"></div>

        <Link to="/student/settings" className={`sidebar-item ${isActive('/student/settings') ? 'active' : ''}`}>
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </Link>

        <Link to="/student/signin" className="sidebar-item logout-btn">
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
