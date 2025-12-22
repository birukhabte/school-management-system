import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { formatCurrency } from '../../utils/formatters';
import {
    Plus,
    Search,
    Filter,
    Download,
    DollarSign,
    Clock,
    CheckCircle,
    AlertCircle,
    MoreVertical,
    ChevronRight,
    TrendingUp,
    CreditCard
} from 'lucide-react';
import '../../Styles/Fees.css';

const Fees = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Sample Fees Data
    const [fees, setFees] = useState([
        {
            id: 1,
            studentName: 'John Doe',
            studentId: 'ST001',
            grade: '10th',
            totalAmount: 1500,
            paidAmount: 1500,
            pendingAmount: 0,
            status: 'paid',
            dueDate: '2024-03-20',
            lastPaymentDate: '2024-03-15'
        },
        {
            id: 2,
            studentName: 'Jane Smith',
            studentId: 'ST002',
            grade: '11th',
            totalAmount: 1800,
            paidAmount: 800,
            pendingAmount: 1000,
            status: 'partial',
            dueDate: '2024-03-25',
            lastPaymentDate: '2024-03-10'
        },
        {
            id: 3,
            studentName: 'Mike Johnson',
            studentId: 'ST003',
            grade: '9th',
            totalAmount: 1200,
            paidAmount: 0,
            pendingAmount: 1200,
            status: 'unpaid',
            dueDate: '2024-03-15',
            lastPaymentDate: '-'
        },
        {
            id: 4,
            studentName: 'Sarah Williams',
            studentId: 'ST004',
            grade: '12th',
            totalAmount: 2000,
            paidAmount: 2000,
            pendingAmount: 0,
            status: 'paid',
            dueDate: '2024-03-05',
            lastPaymentDate: '2024-03-01'
        }
    ]);

    const stats = {
        totalTarget: 6500,
        totalCollected: 4300,
        totalPending: 2200,
        collectionRate: 66.1
    };

    const filteredFees = fees.filter(fee => {
        const matchesSearch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fee.studentId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || fee.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="fees-container">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className={`fees-content ${collapsed ? 'collapsed' : ''}`}>
                <div className="fees-header">
                    <div className="header-info">
                        <h1>Fees Management</h1>
                        <p>Track payments, generate invoices and manage student fees</p>
                    </div>
                    <div className="header-actions">
                        <button className="btn btn-secondary">
                            <Download size={18} />
                            <span>Export CSV</span>
                        </button>
                        <button className="btn btn-primary">
                            <Plus size={18} />
                            <span>Collect Fee</span>
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="fees-stats">
                    <div className="stat-card total">
                        <div className="stat-icon">
                            <DollarSign size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{formatCurrency(stats.totalCollected)}</h3>
                            <p>Total Collected</p>
                        </div>
                        <div className="stat-trend positive">
                            <TrendingUp size={16} />
                            <span>+12%</span>
                        </div>
                    </div>

                    <div className="stat-card pending">
                        <div className="stat-icon">
                            <Clock size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{formatCurrency(stats.totalPending)}</h3>
                            <p>Total Pending</p>
                        </div>
                    </div>

                    <div className="stat-card collection">
                        <div className="stat-icon">
                            <CreditCard size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.collectionRate}%</h3>
                            <p>Collection Rate</p>
                        </div>
                        <div className="progress-mini">
                            <div className="progress-mini-fill" style={{ width: `${stats.collectionRate}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="fees-filters">
                    <div className="search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search by student name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="all">All Status</option>
                            <option value="paid">Paid</option>
                            <option value="partial">Partial</option>
                            <option value="unpaid">Unpaid</option>
                        </select>
                        <button className="btn-icon">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                {/* Fees Table */}
                <div className="fees-table-card">
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Grade</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Pending</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFees.map(fee => (
                                    <tr key={fee.id}>
                                        <td>
                                            <div className="student-cell">
                                                <div className="avatar">{fee.studentName.charAt(0)}</div>
                                                <div className="info">
                                                    <strong>{fee.studentName}</strong>
                                                    <span>{fee.studentId}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{fee.grade}</td>
                                        <td><strong>{formatCurrency(fee.totalAmount)}</strong></td>
                                        <td className="text-success">{formatCurrency(fee.paidAmount)}</td>
                                        <td className="text-danger">{formatCurrency(fee.pendingAmount)}</td>
                                        <td>{fee.dueDate}</td>
                                        <td>
                                            <span className={`status-badge ${fee.status}`}>
                                                {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon sm edit" title="Edit">
                                                    <CreditCard size={16} />
                                                </button>
                                                <button className="btn-icon sm more">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fees;
