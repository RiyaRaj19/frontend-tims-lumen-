import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import withRoleAccess from './withRoleAccess';

const SalesManagement = () => {
    const [sales, setSales] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentSale, setCurrentSale] = useState({ date: '', productId: '', quantity: 0, totalAmount: 0 });
    const [products, setProducts] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchSales();
        fetchProducts();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sales');
            setSales(response.data);
        } catch (error) {
            console.error('Error fetching sales:', error);
            setAlertMessage('Failed to fetch sales. Please try again.');
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentSale._id) {
                await axios.put(`http://localhost:5000/api/sales/${currentSale._id}`, currentSale);
            } else {
                await axios.post('http://localhost:5000/api/sales', currentSale);
            }
            setShowModal(false);
            fetchSales();
            setAlertMessage('Sale record saved successfully!');
        } catch (error) {
            console.error('Error saving sale record:', error);
            setAlertMessage('Failed to save sale record. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this sale record?')) {
            try {
                await axios.delete(`http://localhost:5000/api/sales/${id}`);
                fetchSales();
                setAlertMessage('Sale record deleted successfully!');
            } catch (error) {
                console.error('Error deleting sale record:', error);
                setAlertMessage('Failed to delete sale record. Please try again.');
            }
        }
    };

    return (
        <div className="container-fluid mt-4">
            <h2>Sales Management</h2>
            {alertMessage && <Alert variant="info" onClose={() => setAlertMessage('')} dismissible>{alertMessage}</Alert>}
            <Button variant="primary" onClick={() => { setCurrentSale({}); setShowModal(true); }} className="mb-3">
                Add New Sale Record
            </Button>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale._id}>
                            <td>{new Date(sale.date).toLocaleDateString()}</td>
                            <td>{products.find(p => p._id === sale.productId)?.name || 'N/A'}</td>
                            <td>{sale.quantity}</td>
                            <td>${sale.totalAmount.toFixed(2)}</td>
                            <td>
                                <Button variant="primary" size="sm" onClick={() => { setCurrentSale(sale); setShowModal(true); }} className="me-2">
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(sale._id)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentSale._id ? 'Edit Sale Record' : 'Add New Sale Record'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={currentSale.date ? new Date(currentSale.date).toISOString().split('T')[0] : ''}
                                onChange={(e) => setCurrentSale({ ...currentSale, date: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product</Form.Label>
                            <Form.Select
                                value={currentSale.productId || ''}
                                onChange={(e) => setCurrentSale({ ...currentSale, productId: e.target.value })}
                                required
                            >
                                <option value="">Select a product</option>
                                {products.map(product => (
                                    <option key={product._id} value={product._id}>{product.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                value={currentSale.quantity || 0}
                                onChange={(e) => setCurrentSale({ ...currentSale, quantity: parseInt(e.target.value) })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Total Amount</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                value={currentSale.totalAmount || 0}
                                onChange={(e) => setCurrentSale({ ...currentSale, totalAmount: parseFloat(e.target.value) })}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Sale Record
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default withRoleAccess(['admin', 'manager'])(SalesManagement);
