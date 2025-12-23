import React from 'react';
import { Calendar, Eye, Printer, MoreVertical } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

const PaymentsTab = ({ filteredPayments }) => {
    return (
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
    );
};

export default PaymentsTab;
