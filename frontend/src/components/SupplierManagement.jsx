import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const SupplierManagement = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', email: '' });

    useEffect(() => {
        // Fetch suppliers from API
        // For now, we'll use dummy data
        setSuppliers([
            { id: 1, name: 'Supplier A', contact: '123-456-7890', email: 'supplierA@example.com' },
            { id: 2, name: 'Supplier B', contact: '098-765-4321', email: 'supplierB@example.com' },
        ]);
    }, []);

    const handleAddSupplier = () => {
        setSuppliers([...suppliers, { ...newSupplier, id: suppliers.length + 1 }]);
        setShowModal(false);
        setNewSupplier({ name: '', contact: '', email: '' });
    };

    return (
        <div>
            <h2>Supplier Management</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>Add New Supplier</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(supplier => (
                        <tr key={supplier.id}>
                            <td>{supplier.id}</td>
                            <td>{supplier.name}</td>
                            <td>{supplier.contact}</td>
                            <td>{supplier.email}</td>
                            <td>
                                <Button variant="info" size="sm">Edit</Button>
                                <Button variant="danger" size="sm" className="ml-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Supplier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newSupplier.name}
                                onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                                type="text"
                                value={newSupplier.contact}
                                onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={newSupplier.email}
                                onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddSupplier}>Add Supplier</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SupplierManagement;
