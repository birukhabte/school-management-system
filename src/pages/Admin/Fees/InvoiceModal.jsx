import React from 'react';
import { Printer, Download, Send, XCircle } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

const InvoiceModal = ({
    show,
    onClose,
    selectedStudent,
    feeStructures
}) => {
    if (!show || !selectedStudent) return null;

    return (
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
                        <button className="close-btn" onClick={onClose}>
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
                    <button className="btn btn-secondary" onClick={onClose}>
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
    );
};

export default InvoiceModal;
