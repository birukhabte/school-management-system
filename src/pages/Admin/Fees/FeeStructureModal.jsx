import React, { useState } from 'react';
import { XCircle, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

const FeeStructureModal = ({
    show,
    onClose,
    onSuccess
}) => {
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

    if (!show) return null;

    const addComponent = () => {
        setFeeStructureForm({
            ...feeStructureForm,
            components: [...feeStructureForm.components, { name: '', amount: '' }]
        });
    };

    const removeComponent = (index) => {
        const newComponents = feeStructureForm.components.filter((_, i) => i !== index);
        setFeeStructureForm({
            ...feeStructureForm,
            components: newComponents
        });
    };

    const updateComponent = (index, field, value) => {
        const newComponents = [...feeStructureForm.components];
        newComponents[index][field] = value;
        setFeeStructureForm({
            ...feeStructureForm,
            components: newComponents
        });
    };

    const handleFeeStructureSubmit = (e) => {
        e.preventDefault();
        const totalAmount = feeStructureForm.components.reduce((sum, comp) => sum + parseFloat(comp.amount || 0), 0);

        const newFeeStructure = {
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

        onSuccess(newFeeStructure);
        onClose();
        // Reset form
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

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Create Fee Structure</h3>
                    <button className="close-btn" onClick={onClose}>
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
                                onChange={(e) => setFeeStructureForm({ ...feeStructureForm, name: e.target.value })}
                                required
                                placeholder="e.g., Grade 10 - Science"
                            />
                        </div>
                        <div className="form-group">
                            <label>Grade *</label>
                            <select
                                value={feeStructureForm.grade}
                                onChange={(e) => setFeeStructureForm({ ...feeStructureForm, grade: e.target.value })}
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
                                onChange={(e) => setFeeStructureForm({ ...feeStructureForm, academicYear: e.target.value })}
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
                                onChange={(e) => setFeeStructureForm({ ...feeStructureForm, term: e.target.value })}
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
                                onChange={(e) => setFeeStructureForm({ ...feeStructureForm, feeType: e.target.value })}
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
                                onChange={(e) => setFeeStructureForm({ ...feeStructureForm, dueDate: e.target.value })}
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
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Create Fee Structure
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeeStructureModal;
