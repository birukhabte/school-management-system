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


        </div>
    );
};

export default StudentDashboard;
