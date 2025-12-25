import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home.jsx'
import ChooseUser from './Components/ChooseUser.jsx';
import AdminSignin from './Components/AdminSignin.jsx';
import StudentSignin from './Components/StudentSignin.jsx';
import TeacherSignin from './Components/TeacherSignin.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';

import StudentDashboard from './pages/Students/StudentDashboard.jsx';
import Sidebar from './pages/Admin/Sidebar.jsx';
import Classes from './pages/Admin/Classes.jsx';
import Student from './pages/Admin/Student.jsx';
import Teacher from './pages/Admin/Teacher.jsx';
import Announcements from './pages/Admin/Announcements.jsx';
import Attendance from './pages/Admin/Attendance.jsx';
import Assignments from './pages/Admin/Assignments.jsx';
import Exams from './pages/Admin/Exams.jsx';
import Events from './pages/Admin/Events.jsx';
import Settings from './pages/Admin/Settings.jsx';
import Library from './pages/Admin/Library.jsx';
import Fees from './pages/Admin/Fees/Fees.jsx';
import Reports from './pages/Admin/Reports.jsx';
import Subjects from './pages/Admin/Subjects.jsx';
import TimeTable from './pages/Admin/TimeTable.jsx';
import Logout from './pages/Admin/Logout.jsx';


function App() {
  console.log('App component rendering');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Choose-user' element={<ChooseUser />} />
        {/*All signin Routes*/}
        <Route path='/admin/signin' element={<AdminSignin />} />
        <Route path='/student/signin' element={<StudentSignin />} />
        <Route path='teacher/signin' element={<TeacherSignin />} />

        {/*All Dashboard Routes*/}
        <Route path='admin/dashboard' element={<AdminDashboard />} />
        <Route path='student/dashboard' element={<StudentDashboard />} />

        { /*Admin section Here*/}

        <Route path="/admin/classes" element={<Classes />} />
        <Route path="/admin/students" element={<Student />} />
        <Route path="/admin/teachers" element={<Teacher />} />
        <Route path="/admin/announcements" element={<Announcements />} />
        <Route path="/admin/attendance" element={<Attendance />} />
        <Route path="/admin/assignments" element={<Assignments />} />
        <Route path="/admin/exams" element={<Exams />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/library" element={<Library />} />
        <Route path="/admin/fees" element={<Fees />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/subjects" element={<Subjects />} />
        <Route path="/admin/timetable" element={<TimeTable />} />
        <Route path="/admin/logout" element={<Logout />} />

      </Routes>
    </Router>
  )
}

export default App