import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const InventoryManagement = () => {
    const [inventory, setInventory] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTransaction, setNewTransaction] = useState({ productId: '', type: 'in', quantity: 0 });

    useEffect(() => {
        // Fetch inventory from API
        // For now, we'll use dummy data
        setInventory([
            { id: 1, productName: 'Product A', currentStock: 100, lastUpdated: '2024-01-04' },
            { id: 2, productName: 'Product B', currentStock: 50, lastUpdated: '2024-01-03' },
        ]);
    }, []);

    const handleAddTransaction = () => {
        // Here you would typically send this to your backend
        // For now, we'll just update the local state
        const updatedInventory = inventory.map(item => {
            if (item.id === parseInt(newTransaction.productId)) {
                return {
                    ...item,
                    currentStock: newTransaction.type === 'in'
                        ? item.currentStock + newTransaction.quantity
                        : item.currentStock - newTransaction.quantity,
                    lastUpdated: new Date().toISOString().split('T')[0]
                };
            }
            return item;
        });
        setInventory(updatedInventory);
        setShowModal(false);
        setNewTransaction({ productId: '', type: 'in', quantity: 0 });
    };

    return (
        <div>
            <h2>Inventory Management</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>Add Transaction</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Current Stock</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.productName}</td>
                            <td>{item.currentStock}</td>
                            <td>{item.lastUpdated}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Product</Form.Label>
                            <Form.Control
                                as="select"
                                value={newTransaction.productId}
                                onChange={(e) => setNewTransaction({ ...newTransaction, productId: e.target.value })}
                            >
                                <option value="">Select a product</option>
                                {inventory.map(item => (
                                    <option key={item.id} value={item.id}>{item.productName}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={newTransaction.type}
                                onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                            >
                                <option value="in">Stock In</option>
                                <option value="out">Stock Out</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                value={newTransaction.quantity}
                                onChange={(e) => setNewTransaction({ ...newTransaction, quantity: parseInt(e.target.value) })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddTransaction}>Add Transaction</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InventoryManagement;
