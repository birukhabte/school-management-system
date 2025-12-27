import '../../Styles/StudentStyle/StudentDashboard.css';
import Sidebar from '../Admin/Sidebar';

const StudentDashboard = () => {
    return (
        <div className="student-dashboard">


            {/* Profile Summary */}
            <div className="card profile-card">
                <h3>Student Profile</h3>
                <p><strong>Name:</strong> Biruk Habte</p>
                <p><strong>Class:</strong> Grade 10</p>
                <p><strong>Section:</strong> A</p>
            </div>
  {/* Today's Timetable */}
            <div className="card timetable-card">
                <h3>Today’s Timetable</h3>
                <ul>
                    <li>08:00 - Math</li>
                    <li>09:00 - English</li>
                    <li>10:00 - Physics</li>
                    <li>11:00 - Chemistry</li>
                </ul>
            </div>

        </div>
          
    );
};

export default StudentDashboard;
