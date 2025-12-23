import React, { useState } from 'react';
import { XCircle } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

const PaymentModal = ({
    show,
    onClose,
    onSuccess,
    students,
    selectedStudent
}) => {
    const [paymentForm, setPaymentForm] = useState({
        studentId: selectedStudent?.studentId || '',
        amount: selectedStudent?.pendingAmount.toString() || '',
        date: new Date().toISOString().split('T')[0],
        mode: 'cash',
        feeType: 'quarterly',
        academicYear: '2024-2025',
        remarks: '',
        collectedBy: 'Admin'
    });

    if (!show) return null;

    const handlePaymentSubmit = (e) => {
        e.preventDefault();

        const student = students.find(s => s.studentId === paymentForm.studentId);
        if (!student) {
            alert('Student not found!');
            return;
        }

        const newPayment = {
            studentId: paymentForm.studentId,
            studentName: student.name,
            grade: student.grade,
            amount: parseFloat(paymentForm.amount),
            date: paymentForm.date,
            mode: paymentForm.mode,
            status: 'completed',
            collectedBy: paymentForm.collectedBy,
            feeType: paymentForm.feeType === 'quarterly' ? 'Quarterly Fee' : paymentForm.feeType,
            academicYear: paymentForm.academicYear
        };

        onSuccess(newPayment);
        onClose();
        // Reset form
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

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Record Payment</h3>
                    <button className="close-btn" onClick={onClose}>
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
                            {selectedStudent && paymentForm.studentId === selectedStudent.studentId && (
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
                                onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
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
                                onChange={(e) => setPaymentForm({ ...paymentForm, date: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Payment Mode *</label>
                            <select
                                value={paymentForm.mode}
                                onChange={(e) => setPaymentForm({ ...paymentForm, mode: e.target.value })}
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
                                onChange={(e) => setPaymentForm({ ...paymentForm, feeType: e.target.value })}
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
                                onChange={(e) => setPaymentForm({ ...paymentForm, collectedBy: e.target.value })}
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
                            onChange={(e) => setPaymentForm({ ...paymentForm, remarks: e.target.value })}
                            rows="3"
                            placeholder="Any additional notes..."
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Record Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;
