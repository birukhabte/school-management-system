import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

const FeeStructureTab = ({ feeStructures, setSelectedFeeStructure }) => {
    return (
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
                            <span className={`structure-status ${structure.status}`}>
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
    );
};

export default FeeStructureTab;
