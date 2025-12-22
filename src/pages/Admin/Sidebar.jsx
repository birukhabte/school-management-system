import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaChalkboard,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaCalendarCheck,
  FaTasks,
  FaFileAlt,
  FaCalendarAlt,
  FaCog
  , FaBars, FaTimes
} from "react-icons/fa";

import '../../Styles/Sidebar.css'
function Sidebar({ collapsed, setCollapsed }) {



  return (
    <>

      <div className={`sidebarContainer ${collapsed ? 'collapsed' : ''}`}>
        {/* Toggle Button */}
        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <FaTimes /> : <FaBars />}
        </button>
        <h2 className="sidebar-title">Admin Profile</h2>
        <div className="sidebar-buttons">

          <Link to="/admin/dashboard">
            <button>
              <FaTachometerAlt /> Dashboard
            </button>
          </Link>
          <Link to="/admin/classes">
            <button>
              <FaChalkboard /> Classes
            </button>
          </Link>
          <Link to="/admin/subjects">
            <button>
              <FaBook /> Subjects
            </button>
          </Link>
          <Link to="/admin/students">
            <button>
              <FaUserGraduate /> Students
            </button>
          </Link>
          <Link to='/admin/teachers'>
            <button><FaChalkboardTeacher /> Teachers</button>
          </Link>
          <Link to='/admin/fees'>
            <button><FaFileAlt /> Fees</button>
          </Link>
          <Link to='/admin/attendance'>
            <button><FaCalendarCheck /> Attendance</button>
          </Link>
          <Link to='/admin/assignments'>
            <button><FaTasks /> Assignment</button>
          </Link>
          <Link to='/admin/exams'>
            <button><FaFileAlt /> Exam</button>
          </Link>
          <Link to='/admin/reports'>
            <button><FaFileAlt /> Reports</button>
          </Link>
          <Link to='/admin/timetable'>
            <button><FaCalendarAlt /> TimeTable</button>
          </Link>
          <Link to='/admin/events'>
            <button><FaCalendarAlt /> Event Calendar</button>
          </Link>
          <Link to='/admin/settings'>
            <button><FaCog /> Settings</button>
          </Link>
          <Link to='/admin/logout'>
            <button><FaTachometerAlt /> Logout</button>
          </Link>
        </div>


      </div>
    </>
  )
}

export default Sidebar
