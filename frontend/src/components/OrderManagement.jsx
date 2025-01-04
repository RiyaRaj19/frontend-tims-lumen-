import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import withRoleAccess from './withRoleAccess';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({ customerName: '', productId: '', quantity: 0, status: 'Pending' });
    const [products, setProducts] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchOrders();
        fetchProducts();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setAlertMessage('Failed to fetch orders. Please try again.');
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
            if (currentOrder._id) {
                await axios.put(`http://localhost:5000/api/orders/${currentOrder._id}`, currentOrder);
            } else {
                await axios.post('http://localhost:5000/api/orders', currentOrder);
            }
            setShowModal(false);
            fetchOrders();
            setAlertMessage('Order saved successfully!');
        } catch (error) {
            console.error('Error saving order:', error);
            setAlertMessage('Failed to save order. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await axios.delete(`http://localhost:5000/api/orders/${id}`);
                fetchOrders();
                setAlertMessage('Order deleted successfully!');
            } catch (error) {
                console.error('Error deleting order:', error);
                setAlertMessage('Failed to delete order. Please try again.');
            }
        }
    };

    return (
        <div className="container-fluid mt-4">
            <h2>Order Management</h2>
            {alertMessage && <Alert variant="info" onClose={() => setAlertMessage('')} dismissible>{alertMessage}</Alert>}
            <Button variant="primary" onClick={() => { setCurrentOrder({}); setShowModal(true); }} className="mb-3">
                Add New Order
            </Button>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.customerName}</td>
                            <td>{products.find(p => p._id === order.productId)?.name || 'N/A'}</td>
                            <td>{order.quantity}</td>
                            <td>{order.status}</td>
                            <td>
                                <Button variant="primary" size="sm" onClick={() => { setCurrentOrder(order); setShowModal(true); }} className="me-2">
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(order._id)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentOrder._id ? 'Edit Order' : 'Add New Order'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentOrder.customerName || ''}
                                onChange={(e) => setCurrentOrder({ ...currentOrder, customerName: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product</Form.Label>
                            <Form.Select
                                value={currentOrder.productId || ''}
                                onChange={(e) => setCurrentOrder({ ...currentOrder, productId: e.target.value })}
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
                                value={currentOrder.quantity || 0}
                                onChange={(e) => setCurrentOrder({ ...currentOrder, quantity: parseInt(e.target.value) })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={currentOrder.status || 'Pending'}
                                onChange={(e) => setCurrentOrder({ ...currentOrder, status: e.target.value })}
                                required
                            >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Order
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default withRoleAccess(['admin', 'manager'])(OrderManagement);
