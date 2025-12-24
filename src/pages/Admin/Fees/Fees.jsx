

import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import '../../../Styles/Fees.css';

// Import Reusable Components
import PaymentsTab from './PaymentsTab';
import InvoicesTab from './InvoicesTab';
import ReportsTab from './ReportsTab';
import PaymentModal from './PaymentModal';
import InvoiceModal from './InvoiceModal';

import { formatCurrency } from '../../../utils/formatters';
import {
  DollarSign,
  CreditCard,
  Download,
  Filter,
  Search,
  Plus,
  AlertCircle,
  Calendar,
  Users,
  TrendingUp,
  FileText,
  Receipt,
  BarChart3,
  PieChart,
  ChevronRight,
  Bell,
  Home
} from 'lucide-react';

const FeesManagement = () => {
  // States
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'payments', 'invoices', 'reports'
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Stats Data
  const [stats, setStats] = useState({
    totalCollected: 1250000,
    totalPending: 250000,
    thisMonth: 450000,
    lastMonth: 380000,
    overdue: 150000,
    studentsPaid: 950,
    studentsPending: 300,
    collectionRate: 76.0,
    monthlyTarget: 500000
  });

  // Students with Fee Details
  const [students, setStudents] = useState([
    {
      id: 1,
      studentId: 'ST001',
      name: 'Biruk habte',
      grade: '10',
      section: 'A',
      totalFee: 14500,
      paidAmount: 14500,
      pendingAmount: 0,
      status: 'paid',
      dueDate: '2025-03-31',
      lastPayment: '2024-03-15',
      payments: [
        { id: 1, amount: 14500, date: '2024-03-15', mode: 'online', receipt: 'RCPT001' }
      ]
    },
    {
      id: 2,
      studentId: 'ST002',
      name: 'Emma Johnson',
      grade: '10',
      section: 'A',
      totalFee: 14500,
      paidAmount: 10000,
      pendingAmount: 4500,
      status: 'partial',
      dueDate: '2024-03-31',
      lastPayment: '2024-03-10',
      payments: [
        { id: 1, amount: 10000, date: '2024-03-10', mode: 'cash', receipt: 'RCPT002' }
      ]
    },
    
    {
      id: 4,
      studentId: 'ST004',
      name: 'Sophia Williams',
      grade: '11',
      section: 'A',
      totalFee: 13500,
      paidAmount: 0,
      pendingAmount: 13500,
      status: 'overdue',
      dueDate: '2024-02-28',
      lastPayment: null,
      payments: []
    },
    {
      id: 5,
      studentId: 'ST005',
      name: 'Robert Wilson',
      grade: '12',
      section: 'A',
      totalFee: 15500,
      paidAmount: 15500,
      pendingAmount: 0,
      status: 'paid',
      dueDate: '2024-03-31',
      lastPayment: '2024-03-18',
      payments: [
        { id: 1, amount: 15500, date: '2024-03-18', mode: 'online', receipt: 'RCPT004' }
      ]
    },
    {
      id: 6,
      studentId: 'ST006',
      name: 'Lisa Brown',
      grade: '9',
      section: 'B',
      totalFee: 12500,
      paidAmount: 12500,
      pendingAmount: 0,
      status: 'paid',
      dueDate: '2024-03-31',
      lastPayment: '2024-03-14',
      payments: [
        { id: 1, amount: 12500, date: '2024-03-14', mode: 'cash', receipt: 'RCPT005' }
      ]
    },
    {
      id: 7,
      studentId: 'ST007',
      name: 'David Miller',
      grade: '12',
      section: 'B',
      totalFee: 15500,
      paidAmount: 8000,
      pendingAmount: 7500,
      status: 'partial',
      dueDate: '2024-03-31',
      lastPayment: '2024-03-16',
      payments: [
        { id: 1, amount: 8000, date: '2024-03-16', mode: 'online', receipt: 'RCPT006' }
      ]
    },
    {
      id: 8,
      studentId: 'ST008',
      name: 'Sarah Davis',
      grade: '9',
      section: 'A',
      totalFee: 12500,
      paidAmount: 0,
      pendingAmount: 12500,
      status: 'pending',
      dueDate: '2024-03-31',
      lastPayment: null,
      payments: []
    }
  ]);

  // Payment Records
  const [payments, setPayments] = useState([
    {
      id: 1,
      receiptNo: 'RCPT001',
      studentId: 'ST001',
      studentName: 'John Smith',
      grade: '10',
      amount: 14500,
      date: '2024-03-15',
      mode: 'online',
      status: 'completed',
      collectedBy: 'Admin',
      feeType: 'Quarterly Fee',
      academicYear: '2024-2025'
    },
    {
      id: 2,
      receiptNo: 'RCPT002',
      studentId: 'ST002',
      studentName: 'Emma Johnson',
      grade: '10',
      amount: 10000,
      date: '2024-03-10',
      mode: 'cash',
      status: 'completed',
      collectedBy: 'Cashier',
      feeType: 'Quarterly Fee',
      academicYear: '2024-2025'
    },
    {
      id: 3,
      receiptNo: 'RCPT003',
      studentId: 'ST003',
      studentName: 'Michael Chen',
      grade: '11',
      amount: 13500,
      date: '2024-03-12',
      mode: 'cheque',
      status: 'completed',
      collectedBy: 'Admin',
      feeType: 'Quarterly Fee',
      academicYear: '2024-2025'
    },
    {
      id: 4,
      receiptNo: 'RCPT004',
      studentId: 'ST005',
      studentName: 'Robert Wilson',
      grade: '12',
      amount: 15500,
      date: '2024-03-18',
      mode: 'online',
      status: 'completed',
      collectedBy: 'System',
      feeType: 'Quarterly Fee',
      academicYear: '2024-2025'
    },
    {
      id: 5,
      receiptNo: 'RCPT005',
      studentId: 'ST006',
      studentName: 'Lisa Brown',
      grade: '9',
      amount: 12500,
      date: '2024-03-14',
      mode: 'cash',
      status: 'completed',
      collectedBy: 'Cashier',
      feeType: 'Quarterly Fee',
      academicYear: '2024-2025'
    },
    {
      id: 6,
      receiptNo: 'RCPT006',
      studentId: 'ST007',
      studentName: 'David Miller',
      grade: '12',
      amount: 8000,
      date: '2024-03-16',
      mode: 'online',
      status: 'completed',
      collectedBy: 'System',
      feeType: 'Quarterly Fee',
      academicYear: '2024-2025'
    },
    {
      id: 7,
      receiptNo: 'RCPT007',
      studentId: 'ST009',
      studentName: 'James Wilson',
      grade: '11',
      amount: 2000,
      date: '2024-03-20',
      mode: 'cash',
      status: 'completed',
      collectedBy: 'Cashier',
      feeType: 'Transport Fee',
      academicYear: '2024-2025'
    },
    {
      id: 8,
      receiptNo: 'RCPT008',
      studentId: 'ST010',
      studentName: 'Maria Garcia',
      grade: '10',
      amount: 8000,
      date: '2024-03-19',
      mode: 'online',
      status: 'pending',
      collectedBy: 'System',
      feeType: 'Hostel Fee',
      academicYear: '2024-2025'
    }
  ]);

  // Financial Reports
  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Monthly Collection Report',
      period: 'March 2024',
      totalCollected: 450000,
      totalPending: 250000,
      collectionRate: 64.3,
      gradeBreakdown: [
        { grade: '9', collected: 90000, pending: 30000 },
        { grade: '10', collected: 120000, pending: 45000 },
        { grade: '11', collected: 110000, pending: 50000 },
        { grade: '12', collected: 130000, pending: 125000 }
      ],
      generatedAt: '2024-03-20 14:30',
      generatedBy: 'Admin'
    },
    {
      id: 2,
      title: 'Quarterly Fee Report',
      period: 'Q1 2024',
      totalCollected: 1250000,
      totalPending: 250000,
      collectionRate: 83.3,
      feeTypeBreakdown: [
        { type: 'Tuition', amount: 800000 },
        { type: 'Lab', amount: 200000 },
        { type: 'Transport', amount: 150000 },
        { type: 'Hostel', amount: 100000 }
      ],
      generatedAt: '2024-03-15 10:00',
      generatedBy: 'Admin'
    },
    {
      id: 3,
      title: 'Overdue Fee Report',
      period: 'As of March 2024',
      totalOverdue: 150000,
      overdueStudents: 45,
      averageOverdue: 3333,
      gradeBreakdown: [
        { grade: '9', overdue: 30000, students: 10 },
        { grade: '10', overdue: 45000, students: 15 },
        { grade: '11', overdue: 50000, students: 12 },
        { grade: '12', overdue: 25000, students: 8 }
      ],
      generatedAt: '2024-03-18 16:45',
      generatedBy: 'Admin'
    }
  ]);

  // Filters
  const [filters, setFilters] = useState({
    grade: 'all',
    status: 'all',
    dateRange: 'thisMonth'
  });

  // Calculate stats
  useEffect(() => {
    const calculateStats = () => {
      const totalCollected = payments
        .filter(p => p.status === 'completed')
        .reduce((sum, payment) => sum + payment.amount, 0);

      const totalPending = students.reduce((sum, student) => sum + student.pendingAmount, 0);

      const thisMonth = payments
        .filter(p => p.status === 'completed' && p.date.startsWith('2024-03'))
        .reduce((sum, payment) => sum + payment.amount, 0);

      const lastMonth = 380000; // Hardcoded for demo
      const overdue = students
        .filter(s => s.status === 'overdue')
        .reduce((sum, student) => sum + student.pendingAmount, 0);

      const studentsPaid = students.filter(s => s.status === 'paid').length;
      const studentsPending = students.filter(s => s.status === 'pending' || s.status === 'partial' || s.status === 'overdue').length;
      const collectionRate = ((studentsPaid / students.length) * 100).toFixed(1);

      setStats({
        totalCollected,
        totalPending,
        thisMonth,
        lastMonth,
        overdue,
        studentsPaid,
        studentsPending,
        collectionRate: parseFloat(collectionRate),
        monthlyTarget: 500000
      });
    };

    calculateStats();
  }, [payments, students]);



  // Handle Payment Form Submit
  const onPaymentSuccess = (newPayment) => {
    setPayments([...payments, { ...newPayment, id: payments.length + 1, receiptNo: `RCPT${String(payments.length + 1).padStart(3, '0')}` }]);
  };

  // Generate invoice
  const generateInvoice = (student) => {
    setSelectedStudent(student);
    setShowInvoiceModal(true);
  };

  // Send reminder
  const sendReminder = (student) => {
    alert(`Reminder sent to ${student.name} for ${formatCurrency(student.pendingAmount)}`);
  };

  // Export data
  const exportData = () => {
    alert('Exporting data as CSV...');
  };

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesGrade = filters.grade === 'all' || student.grade === filters.grade;
    const matchesStatus = filters.status === 'all' || student.status === filters.status;
    return matchesGrade && matchesStatus;
  });

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    if (filters.dateRange === 'thisMonth') {
      return payment.date.startsWith('2024-03');
    }
    return true;
  });

  return (
    <div className="fees-management-container">
      <Sidebar />

      <div className="fees-content">
        {/* Header */}
        <div className="fees-header">
          <div className="header-left">
            <h1>Fees & Payment Management</h1>
            <div className="breadcrumb">
              <Home size={16} />
              <ChevronRight size={16} />
              <span>Finance</span>
              <ChevronRight size={16} />
              <span>Fees Management</span>
            </div>
          </div>
          <div className="header-right">
            <button className="btn btn-secondary" onClick={exportData}>
              <Download size={18} />
              <span>Export</span>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setShowPaymentForm(true)}
            >
              <Plus size={18} />
              <span>Record Payment</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="fees-stats">
          <div className="stat-card total-collected">
            <div className="stat-icon">
              <DollarSign size={24} />
            </div>
            <div className="stat-info">
              <h3>{formatCurrency(stats.totalCollected)}</h3>
              <p>Total Collected</p>
            </div>
            <div className="stat-trend positive">
              <TrendingUp size={16} />
              <span>+18.4%</span>
            </div>
          </div>

          <div className="stat-card pending">
            <div className="stat-icon">
              <AlertCircle size={24} />
            </div>
            <div className="stat-info">
              <h3>{formatCurrency(stats.totalPending)}</h3>
              <p>Total Pending</p>
            </div>
            <div className="stat-detail">
              <span className="overdue">Overdue: {formatCurrency(stats.overdue)}</span>
            </div>
          </div>

          <div className="stat-card this-month">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-info">
              <h3>{formatCurrency(stats.thisMonth)}</h3>
              <p>This Month</p>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(stats.thisMonth / stats.monthlyTarget) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="stat-card students-paid">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.studentsPaid} / {students.length}</h3>
              <p>Students Paid</p>
            </div>
            <div className="stat-rate">
              <span>{stats.collectionRate}%</span>
            </div>
          </div>

          <div className="stat-card payment-modes">
            <div className="stat-icon">
              <CreditCard size={24} />
            </div>
            <div className="stat-info">
              <h3>4</h3>
              <p>Payment Modes</p>
            </div>
            <div className="modes">
              <span className="mode-tag">Cash</span>
              <span className="mode-tag">Online</span>
              <span className="mode-tag">Cheque</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="fees-tabs">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <BarChart3 size={18} />
              <span>Overview</span>
            </button>

            <button
              className={`tab ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              <CreditCard size={18} />
              <span>Payments</span>
            </button>
            <button
              className={`tab ${activeTab === 'invoices' ? 'active' : ''}`}
              onClick={() => setActiveTab('invoices')}
            >
              <Receipt size={18} />
              <span>Invoices</span>
            </button>
            <button
              className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              <PieChart size={18} />
              <span>Reports</span>
            </button>
          </div>
          <div className="tab-actions">
            <button className="btn btn-secondary">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="fees-filters">
          <div className="filter-group">
            <select
              value={filters.grade}
              onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
            >
              <option value="all">All Grades</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          </div>
          {activeTab === 'invoices' && (
            <div className="filter-group">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="partial">Partial</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          )}
          <div className="filter-group">
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            >
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="thisQuarter">This Quarter</option>
              <option value="lastQuarter">Last Quarter</option>
              <option value="thisYear">This Year</option>
            </select>
          </div>
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="overview-left">
              <div className="overview-card">
                <div className="card-header">
                  <h3>Fee Collection Trend</h3>
                  <select defaultValue="monthly">
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
                <div className="trend-chart">
                  <div className="chart-grid">
                    {[120, 180, 220, 300, 280, 320, 450].map((amount, index) => (
                      <div key={index} className="chart-bar">
                        <div
                          className="bar-fill"
                          style={{ height: `${(amount / 500) * 100}%` }}
                          title={`₹${amount}K`}
                        ></div>
                        <span className="bar-label">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-dot collected"></span>
                      <span>Collection</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot target"></span>
                      <span>Target</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overview-card">
                <div className="card-header">
                  <h3>Grade-wise Collection</h3>
                </div>
                <div className="grade-collection">
                  {[
                    { grade: 'Grade 9', collected: 90000, target: 120000, color: '#3498db' },
                    { grade: 'Grade 10', collected: 120000, target: 150000, color: '#2ecc71' },
                    { grade: 'Grade 11', collected: 110000, target: 140000, color: '#f39c12' },
                    { grade: 'Grade 12', collected: 130000, target: 160000, color: '#9b59b6' }
                  ].map((item, index) => (
                    <div key={index} className="grade-item">
                      <div className="grade-label">
                        <span>{item.grade}</span>
                        <span>{formatCurrency(item.collected)}</span>
                      </div>
                      <div className="grade-progress">
                        <div
                          className="progress-bar"
                          style={{ '--progress-color': item.color }}
                        >
                          <div
                            className="progress-fill"
                            style={{ width: `${(item.collected / item.target) * 100}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {((item.collected / item.target) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="overview-right">
              <div className="overview-card">
                <div className="card-header">
                  <h3>Recent Payments</h3>
                  <button className="btn btn-link">
                    View All
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className="recent-payments">
                  {payments.slice(0, 5).map(payment => (
                    <div key={payment.id} className="payment-item">
                      <div className="payment-info">
                        <div className="payment-header">
                          <h4>{payment.studentName}</h4>
                          <span className="payment-amount">{formatCurrency(payment.amount)}</span>
                        </div>
                        <div className="payment-details">
                          <span className="payment-id">Receipt: {payment.receiptNo}</span>
                          <span className="payment-date">{payment.date}</span>
                          <span className={`payment-mode ${payment.mode}`}>{payment.mode}</span>
                        </div>
                      </div>
                      <div className="payment-status">
                        <span className={`status-badge ${payment.status}`}>
                          {payment.status === 'completed' ? '✓' : '⏳'}
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overview-card">
                <div className="card-header">
                  <h3>Upcoming Due Dates</h3>
                </div>
                <div className="due-dates">
                  {students
                    .filter(s => s.status !== 'paid')
                    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                    .slice(0, 4)
                    .map(student => (
                      <div key={student.id} className="due-item">
                        <div className="due-student">
                          <div className="student-avatar">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <strong>{student.name}</strong>
                            <small>{student.grade}-{student.section}</small>
                          </div>
                        </div>
                        <div className="due-info">
                          <span className="due-amount">{formatCurrency(student.pendingAmount)}</span>
                          <span className="due-date">
                            <Calendar size={12} />
                            {student.dueDate}
                          </span>
                        </div>
                        <button
                          className="btn-icon send-reminder"
                          onClick={() => sendReminder(student)}
                          title="Send reminder"
                        >
                          <Bell size={16} />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <PaymentsTab
            filteredPayments={filteredPayments}
          />
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <InvoicesTab
            filteredStudents={filteredStudents}
            generateInvoice={generateInvoice}
            setSelectedStudent={setSelectedStudent}
            setShowPaymentForm={setShowPaymentForm}
            sendReminder={sendReminder}
          />
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <ReportsTab
            reports={reports}
          />
        )}



        {/* Payment Form Modal */}
        <PaymentModal
          show={showPaymentForm}
          onClose={() => setShowPaymentForm(false)}
          onSuccess={onPaymentSuccess}
          students={students}
          selectedStudent={selectedStudent}
        />

        {/* Invoice Modal */}
        <InvoiceModal
          show={showInvoiceModal}
          onClose={() => setShowInvoiceModal(false)}
          selectedStudent={selectedStudent}
        />
      </div>
    </div>
  );
};

export default FeesManagement;