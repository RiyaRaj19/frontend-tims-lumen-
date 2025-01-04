import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import withRoleAccess from './withRoleAccess';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({ name: '', position: '', email: '', phone: '' });
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setAlertMessage('Failed to fetch employees. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentEmployee._id) {
                await axios.put(`http://localhost:5000/api/employees/${currentEmployee._id}`, currentEmployee);
            } else {
                await axios.post('http://localhost:5000/api/employees', currentEmployee);
            }
            setShowModal(false);
            fetchEmployees();
            setAlertMessage('Employee saved successfully!');
        } catch (error) {
            console.error('Error saving employee:', error);
            setAlertMessage('Failed to save employee. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`http://localhost:5000/api/employees/${id}`);
                fetchEmployees();
                setAlertMessage('Employee deleted successfully!');
            } catch (error) {
                console.error('Error deleting employee:', error);
                setAlertMessage('Failed to delete employee. Please try again.');
            }
        }
    };

    return (
        <div className="container-fluid mt-4">
            <h2>Employee Management</h2>
            {alertMessage && <Alert variant="info" onClose={() => setAlertMessage('')} dismissible>{alertMessage}</Alert>}
            <Button variant="primary" onClick={() => { setCurrentEmployee({}); setShowModal(true); }} className="mb-3">
                Add New Employee
            </Button>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>
                                <Button variant="primary" size="sm" onClick={() => { setCurrentEmployee(employee); setShowModal(true); }} className="me-2">
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(employee._id)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentEmployee._id ? 'Edit Employee' : 'Add New Employee'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentEmployee.name || ''}
                                onChange={(e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentEmployee.position || ''}
                                onChange={(e) => setCurrentEmployee({ ...currentEmployee, position: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={currentEmployee.email || ''}
                                onChange={(e) => setCurrentEmployee({ ...currentEmployee, email: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                value={currentEmployee.phone || ''}
                                onChange={(e) => setCurrentEmployee({ ...currentEmployee, phone: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Employee
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default withRoleAccess(['admin', 'manager'])(EmployeeManagement);

