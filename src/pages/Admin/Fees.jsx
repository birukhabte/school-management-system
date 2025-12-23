

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../../Styles/Fees.css';

import { 
  DollarSign,
  CreditCard,
  Download,
  Printer,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  FileText,
  Receipt,
  BarChart3,
  PieChart,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  MoreVertical,
  Send,
  Mail,
  Bell,
  RefreshCw,
  Home,
  ArrowUpRight,
  ArrowDownRight,
  Wallet
} from 'lucide-react';

const FeesManagement = () => {
  // States
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'fee-structure', 'payments', 'invoices', 'reports'
  const [showFeeStructureForm, setShowFeeStructureForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedFeeStructure, setSelectedFeeStructure] = useState(null);

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

  // Fee Structures
  const [feeStructures, setFeeStructures] = useState([
    {
      id: 1,
      name: 'Grade 9 - Regular',
      grade: '9',
      academicYear: '2024-2025',
      term: 'Quarterly',
      feeType: 'regular',
      amount: 12500,
      components: [
        { name: 'Tuition Fee', amount: 8000 },
        { name: 'Library Fee', amount: 500 },
        { name: 'Lab Fee', amount: 1000 },
        { name: 'Sports Fee', amount: 500 },
        { name: 'Activity Fee', amount: 2500 }
      ],
      dueDate: '2024-03-31',
      status: 'active',
      createdAt: '2024-01-15',
      totalStudents: 120
    },
    {
      id: 2,
      name: 'Grade 10 - Science',
      grade: '10',
      academicYear: '2024-2025',
      term: 'Quarterly',
      feeType: 'science',
      amount: 14500,
      components: [
        { name: 'Tuition Fee', amount: 9000 },
        { name: 'Science Lab Fee', amount: 2000 },
        { name: 'Library Fee', amount: 500 },
        { name: 'Computer Fee', amount: 1000 },
        { name: 'Activity Fee', amount: 2000 }
      ],
      dueDate: '2024-03-31',
      status: 'active',
      createdAt: '2024-01-15',
      totalStudents: 150
    },
    {
      id: 3,
      name: 'Grade 11 - Commerce',
      grade: '11',
      academicYear: '2024-2025',
      term: 'Quarterly',
      feeType: 'commerce',
      amount: 13500,
      components: [
        { name: 'Tuition Fee', amount: 8500 },
        { name: 'Commerce Lab Fee', amount: 1500 },
        { name: 'Library Fee', amount: 500 },
        { name: 'Computer Fee', amount: 1000 },
        { name: 'Activity Fee', amount: 2000 }
      ],
      dueDate: '2024-03-31',
      status: 'active',
      createdAt: '2024-01-15',
      totalStudents: 130
    },
    {
      id: 4,
      name: 'Grade 12 - Science',
      grade: '12',
      academicYear: '2024-2025',
      term: 'Quarterly',
      feeType: 'science',
      amount: 15500,
      components: [
        { name: 'Tuition Fee', amount: 9500 },
        { name: 'Science Lab Fee', amount: 2500 },
        { name: 'Library Fee', amount: 500 },
        { name: 'Exam Fee', amount: 1500 },
        { name: 'Activity Fee', amount: 1500 }
      ],
      dueDate: '2024-03-31',
      status: 'active',
      createdAt: '2024-01-15',
      totalStudents: 140
    },
    {
      id: 5,
      name: 'Transport Fee',
      grade: 'all',
      academicYear: '2024-2025',
      term: 'Monthly',
      feeType: 'transport',
      amount: 2000,
      components: [
        { name: 'Bus Service', amount: 2000 }
      ],
      dueDate: '2024-03-25',
      status: 'active',
      createdAt: '2024-01-15',
      totalStudents: 400
    },
    {
      id: 6,
      name: 'Hostel Fee',
      grade: 'all',
      academicYear: '2024-2025',
      term: 'Monthly',
      feeType: 'hostel',
      amount: 8000,
      components: [
        { name: 'Accommodation', amount: 5000 },
        { name: 'Food & Dining', amount: 3000 }
      ],
      dueDate: '2024-03-25',
      status: 'active',
      createdAt: '2024-01-15',
      totalStudents: 200
    }
  ]);

  // Students with Fee Details
  const [students, setStudents] = useState([
    {
      id: 1,
      studentId: 'ST001',
      name: 'John Smith',
      grade: '10',
      section: 'A',
      feeStructure: 2,
      totalFee: 14500,
      paidAmount: 14500,
      pendingAmount: 0,
      status: 'paid',
      dueDate: '2024-03-31',
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
      feeStructure: 2,
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
      id: 3,
      studentId: 'ST003',
      name: 'Michael Chen',
      grade: '11',
      section: 'B',
      feeStructure: 3,
      totalFee: 13500,
      paidAmount: 13500,
      pendingAmount: 0,
      status: 'paid',
      dueDate: '2024-03-31',
      lastPayment: '2024-03-12',
      payments: [
        { id: 1, amount: 13500, date: '2024-03-12', mode: 'cheque', receipt: 'RCPT003' }
      ]
    },
    {
      id: 4,
      studentId: 'ST004',
      name: 'Sophia Williams',
      grade: '11',
      section: 'A',
      feeStructure: 3,
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
      feeStructure: 4,
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
      feeStructure: 1,
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
      feeStructure: 4,
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
      feeStructure: 1,
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

  // Form States
  const [feeStructureForm, setFeeStructureForm] = useState({
    name: '',
    grade: 'all',
    academicYear: '2024-2025',
    term: 'quarterly',
    feeType: 'regular',
    amount: '',
    dueDate: '',
    components: [{ name: '', amount: '' }]
  });

  const [paymentForm, setPaymentForm] = useState({
    studentId: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    mode: 'cash',
    feeType: 'quarterly',
    academicYear: '2024-2025',
    remarks: '',
    collectedBy: 'Admin'
  });

  // Filters
  const [filters, setFilters] = useState({
    grade: 'all',
    status: 'all',
    dateRange: 'thisMonth'
  });

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

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

  // Handle Fee Structure Form Submit
  const handleFeeStructureSubmit = (e) => {
    e.preventDefault();
    
    const totalAmount = feeStructureForm.components.reduce((sum, comp) => sum + parseFloat(comp.amount || 0), 0);
    
    const newFeeStructure = {
      id: feeStructures.length + 1,
      name: feeStructureForm.name,
      grade: feeStructureForm.grade,
      academicYear: feeStructureForm.academicYear,
      term: feeStructureForm.term,
      feeType: feeStructureForm.feeType,
      amount: totalAmount,
      components: feeStructureForm.components.filter(comp => comp.name && comp.amount),
      dueDate: feeStructureForm.dueDate,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      totalStudents: 0
    };
    
    setFeeStructures([...feeStructures, newFeeStructure]);
    setShowFeeStructureForm(false);
    resetFeeStructureForm();
  };

  // Handle Payment Form Submit
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    const student = students.find(s => s.studentId === paymentForm.studentId);
    if (!student) {
      alert('Student not found!');
      return;
    }
    
    const newPayment = {
      id: payments.length + 1,
      receiptNo: `RCPT${String(payments.length + 1).padStart(3, '0')}`,
      studentId: paymentForm.studentId,
      studentName: student.name,
      grade: student.grade,
      amount: parseFloat(paymentForm.amount),
      date: paymentForm.date,
      mode: paymentForm.mode,
      status: 'completed',
      collectedBy: paymentForm.collectedBy,
      feeType: paymentForm.feeType,
      academicYear: paymentForm.academicYear
    };
    
    // Update student payment status
    const updatedStudents = students.map(s => {
      if (s.studentId === paymentForm.studentId) {
        const newPaidAmount = s.paidAmount + parseFloat(paymentForm.amount);
        const newPendingAmount = Math.max(0, s.totalFee - newPaidAmount);
        const newStatus = newPendingAmount === 0 ? 'paid' : newPendingAmount === s.totalFee ? 'pending' : 'partial';
        
        return {
          ...s,
          paidAmount: newPaidAmount,
          pendingAmount: newPendingAmount,
          status: newStatus,
          lastPayment: paymentForm.date,
          payments: [...s.payments, { 
            id: s.payments.length + 1, 
            amount: parseFloat(paymentForm.amount), 
            date: paymentForm.date, 
            mode: paymentForm.mode, 
            receipt: newPayment.receiptNo 
          }]
        };
      }
      return s;
    });
    
    setPayments([...payments, newPayment]);
    setStudents(updatedStudents);
    setShowPaymentForm(false);
    resetPaymentForm();
    
    alert(`Payment of ${formatCurrency(paymentForm.amount)} recorded for ${student.name}`);
  };

  // Reset forms
  const resetFeeStructureForm = () => {
    setFeeStructureForm({
      name: '',
      grade: 'all',
      academicYear: '2024-2025',
      term: 'quarterly',
      feeType: 'regular',
      amount: '',
      dueDate: '',
      components: [{ name: '', amount: '' }]
    });
  };

  const resetPaymentForm = () => {
    setPaymentForm({
      studentId: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      mode: 'cash',
      feeType: 'quarterly',
      academicYear: '2024-2025',
      remarks: '',
      collectedBy: 'Admin'
    });
  };

  // Add component to fee structure
  const addComponent = () => {
    setFeeStructureForm({
      ...feeStructureForm,
      components: [...feeStructureForm.components, { name: '', amount: '' }]
    });
  };

  // Remove component from fee structure
  const removeComponent = (index) => {
    const newComponents = feeStructureForm.components.filter((_, i) => i !== index);
    setFeeStructureForm({
      ...feeStructureForm,
      components: newComponents
    });
  };

  // Update component in fee structure
  const updateComponent = (index, field, value) => {
    const newComponents = [...feeStructureForm.components];
    newComponents[index][field] = value;
    setFeeStructureForm({
      ...feeStructureForm,
      components: newComponents
    });
  };

  // Generate invoice
  const generateInvoice = (student) => {
    setSelectedStudent(student);
    setShowInvoiceModal(true);
  };

  // Send reminder
  const sendReminder = (student) => {
    alert(`Reminder sent to ${student.name}'s parent/guardian`);
  };

  // Export data
  const exportData = () => {
    let data, filename;
    
    switch (activeTab) {
      case 'fee-structure':
        data = feeStructures;
        filename = 'fee_structures.csv';
        break;
      case 'payments':
        data = payments;
        filename = 'payment_records.csv';
        break;
      case 'invoices':
        data = students;
        filename = 'student_fees.csv';
        break;
      default:
        data = [];
        filename = 'data.csv';
    }
    
    alert(`Exporting ${filename}...`);
    // Implement CSV export logic here
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
              className={`tab ${activeTab === 'fee-structure' ? 'active' : ''}`}
              onClick={() => setActiveTab('fee-structure')}
            >
              <FileText size={18} />
              <span>Fee Structure</span>
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
            {activeTab === 'fee-structure' && (
              <button 
                className="btn btn-primary"
                onClick={() => setShowFeeStructureForm(true)}
              >
                <Plus size={18} />
                <span>Create Fee Structure</span>
              </button>
            )}
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
              onChange={(e) => setFilters({...filters, grade: e.target.value})}
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
                onChange={(e) => setFilters({...filters, status: e.target.value})}
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
              onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
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

        {/* Fee Structure Tab */}
        {activeTab === 'fee-structure' && (
          <div className="fee-structure-content">
            <div className="fee-structure-grid">
              {feeStructures.map(structure => (
                <div key={structure.id} className="structure-card">
                  <div className="structure-header">
                    <div className="structure-title">
                      <h4>{structure.name}</h4>
                      <span className="structure-grade">Grade {structure.grade}</span>
                    </div>
                    <div className="structure-actions">
                      <button className="btn-icon">
                        <Edit size={16} />
                      </button>
                      <button className="btn-icon">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="structure-details">
                    <div className="detail-row">
                      <span>Academic Year:</span>
                      <strong>{structure.academicYear}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Term:</span>
                      <strong>{structure.term}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Due Date:</span>
                      <strong>{structure.dueDate}</strong>
                    </div>
                  </div>
                  <div className="structure-amount">
                    <h3>{formatCurrency(structure.amount)}</h3>
                    <span className="structure-status active">
                      {structure.status}
                    </span>
                  </div>
                  <div className="structure-components">
                    <h5>Fee Components</h5>
                    <div className="components-list">
                      {structure.components.map((comp, index) => (
                        <div key={index} className="component-item">
                          <span>{comp.name}</span>
                          <span>{formatCurrency(comp.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="structure-footer">
                    <div className="footer-info">
                      <span>Students: {structure.totalStudents}</span>
                      <span>Created: {structure.createdAt}</span>
                    </div>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedFeeStructure(structure)}
                    >
                      Apply to Students
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="payments-content">
            <div className="payments-table-container">
              <table className="payments-table">
                <thead>
                  <tr>
                    <th>Receipt No</th>
                    <th>Student</th>
                    <th>Grade</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Payment Mode</th>
                    <th>Fee Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map(payment => (
                    <tr key={payment.id}>
                      <td>
                        <strong className="receipt-no">{payment.receiptNo}</strong>
                      </td>
                      <td>
                        <div className="student-cell">
                          <div className="student-avatar">
                            {payment.studentName.charAt(0)}
                          </div>
                          <div>
                            <strong>{payment.studentName}</strong>
                            <small>{payment.studentId}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="grade-badge">Grade {payment.grade}</span>
                      </td>
                      <td>
                        <strong className="payment-amount">
                          {formatCurrency(payment.amount)}
                        </strong>
                      </td>
                      <td>
                        <div className="date-cell">
                          <Calendar size={14} />
                          <span>{payment.date}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`payment-mode-badge ${payment.mode}`}>
                          {payment.mode}
                        </span>
                      </td>
                      <td>
                        <span className="fee-type">{payment.feeType}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${payment.status}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" title="View Receipt">
                            <Eye size={16} />
                          </button>
                          <button className="btn-icon" title="Print">
                            <Printer size={16} />
                          </button>
                          <button className="btn-icon" title="More">
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
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="invoices-content">
            <div className="invoices-table-container">
              <table className="invoices-table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>Student</th>
                    <th>Grade</th>
                    <th>Total Fee</th>
                    <th>Paid</th>
                    <th>Pending</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student.id} className={`status-${student.status}`}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <div className="student-cell">
                          <div className="student-avatar">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <strong>{student.name}</strong>
                            <small>{student.studentId}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="grade-section">{student.grade}-{student.section}</span>
                      </td>
                      <td>
                        <strong>{formatCurrency(student.totalFee)}</strong>
                      </td>
                      <td>
                        <span className="paid-amount">{formatCurrency(student.paidAmount)}</span>
                      </td>
                      <td>
                        <span className={`pending-amount ${student.pendingAmount > 0 ? 'warning' : ''}`}>
                          {formatCurrency(student.pendingAmount)}
                        </span>
                      </td>
                      <td>
                        <div className="due-date-cell">
                          <Calendar size={14} />
                          <span>{student.dueDate}</span>
                          {student.status === 'overdue' && (
                            <span className="overdue-badge">Overdue</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`invoice-status ${student.status}`}>
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="invoice-actions">
                          <button 
                            className="btn-icon"
                            onClick={() => generateInvoice(student)}
                            title="Generate Invoice"
                          >
                            <Receipt size={16} />
                          </button>
                          <button 
                            className="btn-icon"
                            onClick={() => {
                              setSelectedStudent(student);
                              setShowPaymentForm(true);
                            }}
                            title="Record Payment"
                          >
                            <CreditCard size={16} />
                          </button>
                          <button 
                            className="btn-icon"
                            onClick={() => sendReminder(student)}
                            title="Send Reminder"
                          >
                            <Bell size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="reports-content">
            <div className="reports-grid">
              {reports.map(report => (
                <div key={report.id} className="report-card">
                  <div className="report-header">
                    <div className="report-title">
                      <h4>{report.title}</h4>
                      <span className="report-period">{report.period}</span>
                    </div>
                    <div className="report-actions">
                      <button className="btn-icon">
                        <Download size={16} />
                      </button>
                      <button className="btn-icon">
                        <Printer size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="report-body">
                    <div className="report-stats">
                      <div className="report-stat">
                        <span className="label">Collected:</span>
                        <span className="value collected">
                          {formatCurrency(report.totalCollected)}
                        </span>
                      </div>
                      <div className="report-stat">
                        <span className="label">Pending:</span>
                        <span className="value pending">
                          {formatCurrency(report.totalPending)}
                        </span>
                      </div>
                      <div className="report-stat">
                        <span className="label">Rate:</span>
                        <span className="value rate">{report.collectionRate}%</span>
                      </div>
                    </div>
                    {report.gradeBreakdown && (
                      <div className="breakdown-section">
                        <h5>Grade-wise Breakdown</h5>
                        <div className="breakdown-list">
                          {report.gradeBreakdown.map((item, index) => (
                            <div key={index} className="breakdown-item">
                              <span>Grade {item.grade}</span>
                              <div className="breakdown-values">
                                <span>{formatCurrency(item.collected || item.overdue)}</span>
                                {item.pending && (
                                  <span className="pending-small">
                                    Pending: {formatCurrency(item.pending)}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {report.feeTypeBreakdown && (
                      <div className="breakdown-section">
                        <h5>Fee Type Breakdown</h5>
                        <div className="breakdown-list">
                          {report.feeTypeBreakdown.map((item, index) => (
                            <div key={index} className="breakdown-item">
                              <span>{item.type}</span>
                              <span>{formatCurrency(item.amount)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="report-footer">
                    <div className="report-meta">
                      <span>Generated by: {report.generatedBy}</span>
                      <span>Date: {report.generatedAt.split(' ')[0]}</span>
                    </div>
                    <button className="btn btn-secondary btn-sm">
                      View Full Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fee Structure Form Modal */}
        {showFeeStructureForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Create Fee Structure</h3>
                <button className="close-btn" onClick={() => setShowFeeStructureForm(false)}>
                  <XCircle size={24} />
                </button>
              </div>
              <form onSubmit={handleFeeStructureSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Structure Name *</label>
                    <input 
                      type="text" 
                      value={feeStructureForm.name}
                      onChange={(e) => setFeeStructureForm({...feeStructureForm, name: e.target.value})}
                      required
                      placeholder="e.g., Grade 10 - Science"
                    />
                  </div>
                  <div className="form-group">
                    <label>Grade *</label>
                    <select 
                      value={feeStructureForm.grade}
                      onChange={(e) => setFeeStructureForm({...feeStructureForm, grade: e.target.value})}
                      required
                    >
                      <option value="all">All Grades</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Academic Year *</label>
                    <select 
                      value={feeStructureForm.academicYear}
                      onChange={(e) => setFeeStructureForm({...feeStructureForm, academicYear: e.target.value})}
                      required
                    >
                      <option value="2024-2025">2024-2025</option>
                      <option value="2023-2024">2023-2024</option>
                      <option value="2025-2026">2025-2026</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Term *</label>
                    <select 
                      value={feeStructureForm.term}
                      onChange={(e) => setFeeStructureForm({...feeStructureForm, term: e.target.value})}
                      required
                    >
                      <option value="quarterly">Quarterly</option>
                      <option value="monthly">Monthly</option>
                      <option value="half-yearly">Half Yearly</option>
                      <option value="annual">Annual</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Fee Type</label>
                    <select 
                      value={feeStructureForm.feeType}
                      onChange={(e) => setFeeStructureForm({...feeStructureForm, feeType: e.target.value})}
                    >
                      <option value="regular">Regular</option>
                      <option value="science">Science Stream</option>
                      <option value="commerce">Commerce Stream</option>
                      <option value="arts">Arts Stream</option>
                      <option value="transport">Transport</option>
                      <option value="hostel">Hostel</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Due Date *</label>
                    <input 
                      type="date" 
                      value={feeStructureForm.dueDate}
                      onChange={(e) => setFeeStructureForm({...feeStructureForm, dueDate: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-section">
                  <div className="section-header">
                    <h4>Fee Components</h4>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={addComponent}>
                      <Plus size={16} />
                      Add Component
                    </button>
                  </div>
                  {feeStructureForm.components.map((component, index) => (
                    <div key={index} className="component-row">
                      <div className="form-group">
                        <input 
                          type="text" 
                          placeholder="Component Name"
                          value={component.name}
                          onChange={(e) => updateComponent(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input 
                          type="number" 
                          placeholder="Amount"
                          value={component.amount}
                          onChange={(e) => updateComponent(index, 'amount', e.target.value)}
                        />
                      </div>
                      <button 
                        type="button" 
                        className="btn-icon remove-btn"
                        onClick={() => removeComponent(index)}
                        disabled={feeStructureForm.components.length === 1}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="form-total">
                  <span>Total Amount:</span>
                  <strong>
                    {formatCurrency(
                      feeStructureForm.components.reduce((sum, comp) => sum + parseFloat(comp.amount || 0), 0)
                    )}
                  </strong>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowFeeStructureForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Fee Structure
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Payment Form Modal */}
        {showPaymentForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Record Payment</h3>
                <button className="close-btn" onClick={() => setShowPaymentForm(false)}>
                  <XCircle size={24} />
                </button>
              </div>
              <form onSubmit={handlePaymentSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Student ID *</label>
                    <input 
                      type="text" 
                      value={paymentForm.studentId}
                      onChange={(e) => {
                        const student = students.find(s => s.studentId === e.target.value);
                        setPaymentForm({
                          ...paymentForm, 
                          studentId: e.target.value,
                          amount: student ? student.pendingAmount.toString() : paymentForm.amount
                        });
                      }}
                      required
                      placeholder="Enter Student ID"
                    />
                    {selectedStudent && (
                      <div className="student-preview">
                        <span>{selectedStudent.name} (Grade {selectedStudent.grade})</span>
                        <span>Pending: {formatCurrency(selectedStudent.pendingAmount)}</span>
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Amount *</label>
                    <input 
                      type="number" 
                      value={paymentForm.amount}
                      onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Payment Date *</label>
                    <input 
                      type="date" 
                      value={paymentForm.date}
                      onChange={(e) => setPaymentForm({...paymentForm, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Payment Mode *</label>
                    <select 
                      value={paymentForm.mode}
                      onChange={(e) => setPaymentForm({...paymentForm, mode: e.target.value})}
                      required
                    >
                      <option value="cash">Cash</option>
                      <option value="online">Online</option>
                      <option value="cheque">Cheque</option>
                      <option value="bank-transfer">Bank Transfer</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Fee Type *</label>
                    <select 
                      value={paymentForm.feeType}
                      onChange={(e) => setPaymentForm({...paymentForm, feeType: e.target.value})}
                      required
                    >
                      <option value="quarterly">Quarterly Fee</option>
                      <option value="monthly">Monthly Fee</option>
                      <option value="transport">Transport Fee</option>
                      <option value="hostel">Hostel Fee</option>
                      <option value="exam">Exam Fee</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Collected By *</label>
                    <select 
                      value={paymentForm.collectedBy}
                      onChange={(e) => setPaymentForm({...paymentForm, collectedBy: e.target.value})}
                      required
                    >
                      <option value="Admin">Admin</option>
                      <option value="Cashier">Cashier</option>
                      <option value="System">System</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Remarks</label>
                  <textarea 
                    value={paymentForm.remarks}
                    onChange={(e) => setPaymentForm({...paymentForm, remarks: e.target.value})}
                    rows="3"
                    placeholder="Any additional notes..."
                  />
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowPaymentForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Record Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Invoice Modal */}
        {showInvoiceModal && selectedStudent && (
          <div className="modal-overlay">
            <div className="modal-content invoice-modal">
              <div className="modal-header">
                <h3>Invoice - {selectedStudent.studentId}</h3>
                <div className="invoice-actions">
                  <button className="btn-icon">
                    <Printer size={18} />
                  </button>
                  <button className="btn-icon">
                    <Download size={18} />
                  </button>
                  <button className="btn-icon">
                    <Send size={18} />
                  </button>
                  <button className="close-btn" onClick={() => setShowInvoiceModal(false)}>
                    <XCircle size={24} />
                  </button>
                </div>
              </div>
              <div className="invoice-content">
                <div className="invoice-header">
                  <div className="school-info">
                    <h2>XYZ Public School</h2>
                    <p>123 Education Street, City, State - 123456</p>
                    <p>Phone: (123) 456-7890 | Email: info@xyzschool.edu</p>
                  </div>
                  <div className="invoice-details">
                    <h3>INVOICE</h3>
                    <div className="invoice-meta">
                      <div className="meta-item">
                        <span>Invoice No:</span>
                        <strong>INV-{selectedStudent.studentId}-001</strong>
                      </div>
                      <div className="meta-item">
                        <span>Date:</span>
                        <strong>{new Date().toISOString().split('T')[0]}</strong>
                      </div>
                      <div className="meta-item">
                        <span>Due Date:</span>
                        <strong>{selectedStudent.dueDate}</strong>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="invoice-body">
                  <div className="billing-info">
                    <div className="bill-to">
                      <h4>Bill To:</h4>
                      <p><strong>{selectedStudent.name}</strong></p>
                      <p>Student ID: {selectedStudent.studentId}</p>
                      <p>Grade: {selectedStudent.grade}-{selectedStudent.section}</p>
                    </div>
                    <div className="invoice-summary">
                      <div className="summary-item">
                        <span>Total Fee:</span>
                        <span>{formatCurrency(selectedStudent.totalFee)}</span>
                      </div>
                      <div className="summary-item">
                        <span>Amount Paid:</span>
                        <span className="paid">{formatCurrency(selectedStudent.paidAmount)}</span>
                      </div>
                      <div className="summary-item total">
                        <span>Amount Due:</span>
                        <span className="due">{formatCurrency(selectedStudent.pendingAmount)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="fee-breakdown">
                    <h4>Fee Breakdown</h4>
                    <table className="breakdown-table">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feeStructures.find(f => f.id === selectedStudent.feeStructure)?.components.map((comp, index) => (
                          <tr key={index}>
                            <td>{comp.name}</td>
                            <td>{formatCurrency(comp.amount)}</td>
                          </tr>
                        ))}
                        <tr className="total-row">
                          <td><strong>Total Amount</strong></td>
                          <td><strong>{formatCurrency(selectedStudent.totalFee)}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="payment-instructions">
                    <h4>Payment Instructions</h4>
                    <p>Please make payment by the due date to avoid late fees.</p>
                    <div className="payment-methods">
                      <p><strong>Payment Methods:</strong></p>
                      <ul>
                        <li>Cash at School Office</li>
                        <li>Bank Transfer (Details available on request)</li>
                        <li>Online Payment (via School Portal)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="invoice-footer">
                  <div className="footer-note">
                    <p><strong>Note:</strong> This is a computer-generated invoice and does not require a signature.</p>
                  </div>
                  <div className="footer-contact">
                    <p>For any queries, please contact:</p>
                    <p>Accounts Department | Phone: (123) 456-7891 | Email: accounts@xyzschool.edu</p>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowInvoiceModal(false)}>
                  Close
                </button>
                <button className="btn btn-primary">
                  <Printer size={18} />
                  Print Invoice
                </button>
                <button className="btn btn-success">
                  <Send size={18} />
                  Email to Parent
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeesManagement;