import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  Link as FileText,
  BarChart2,
  Bell,
  Clock,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../Styles/Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'exams', label: 'Exams', icon: BarChart2 },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'timetable', label: 'Timetable', icon: Clock },
    { id: 'study-materials', label: 'Study Materials', icon: BookOpen },
  ];

  return (
    <div className={`sidebarContainer ${collapsed ? 'collapsed' : ''}`}>
      <button
        className="toggle-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div className="sidebar-header">
        {!collapsed && <h2 className="sidebar-title">Student Portal</h2>}
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}

        <div className="sidebar-divider"></div>

        <button
          className={`sidebar-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </button>

        <Link to="/student/signin" className="sidebar-item logout-btn">
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
