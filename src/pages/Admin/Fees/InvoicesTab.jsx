import React from 'react';
import { formatCurrency } from '../../../utils/formatters';
import { Calendar, Receipt, CreditCard, Bell } from 'lucide-react';

const InvoicesTab = ({
    filteredStudents,
    generateInvoice,
    setSelectedStudent,
    setShowPaymentForm,
    sendReminder
}) => {
    return (
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
    );
};

export default InvoicesTab;
