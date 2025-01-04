import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Col } from 'react-bootstrap';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState({ startDate: '', endDate: '', type: '' });

    useEffect(() => {
        // Fetch transactions from API
        // For now, we'll use dummy data
        setTransactions([
            { id: 1, date: '2024-01-04', type: 'in', productName: 'Product A', quantity: 50 },
            { id: 2, date: '2024-01-03', type: 'out', productName: 'Product B', quantity: 20 },
        ]);
    }, []);

    const filteredTransactions = transactions.filter(transaction => {
        return (
            (!filter.startDate || transaction.date >= filter.startDate) &&
            (!filter.endDate || transaction.date <= filter.endDate) &&
            (!filter.type || transaction.type === filter.type)
        );
    });

    return (
        <div>
            <h2>Transaction History</h2>
            <Form className="mb-3">
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={filter.startDate}
                                onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={filter.endDate}
                                onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={filter.type}
                                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                            >
                                <option value="">All</option>
                                <option value="in">Stock In</option>
                                <option value="out">Stock Out</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Product</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.type === 'in' ? 'Stock In' : 'Stock Out'}</td>
                            <td>{transaction.productName}</td>
                            <td>{transaction.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TransactionHistory;
