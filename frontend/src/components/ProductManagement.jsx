import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit, FaTrash, FaFileImport, FaFileExport, FaSearch } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import React, { useState } from 'react';
import { addProduct } from './api';

const AddProductPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAddProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            await addProduct(token, { name, description });
            setSuccess('Product added successfully');
            setName('');
            setDescription('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleAddProduct}>Add Product</button>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    );
};
export default AddProductPage;

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ name: '', category: '', stockLevel: 0, reorderPoint: 0 });
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStockStatus, setFilterStockStatus] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setAlertMessage('Failed to fetch products. Please try again.');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentProduct._id) {
                await axios.put(`http://localhost:5000/api/products/${currentProduct._id}`, currentProduct);
            } else {
                await axios.post('http://localhost:5000/api/products', currentProduct);
            }
            setShowModal(false);
            fetchProducts();
            setAlertMessage('Product saved successfully!');
        } catch (error) {
            console.error('Error saving product:', error);
            setAlertMessage('Failed to save product. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                fetchProducts();
                setAlertMessage('Product deleted successfully!');
            } catch (error) {
                console.error('Error deleting product:', error);
                setAlertMessage('Failed to delete product. Please try again.');
            }
        }
    };

    const handleStockTransaction = async (id, type) => {
        const quantity = prompt(`Enter quantity to ${type}:`);
        if (quantity) {
            try {
                await axios.post(`http://localhost:5000/api/products/${id}/transaction`, { type, quantity });
                fetchProducts();
                setAlertMessage(`Stock ${type} recorded successfully!`);
            } catch (error) {
                console.error('Error recording stock transaction:', error);
                setAlertMessage('Failed to record stock transaction. Please try again.');
            }
        }
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            importProducts(data);
        };
        reader.readAsBinaryString(file);
    };

    const importProducts = async (data) => {
        try {
            await axios.post('http://localhost:5000/api/products/import', { products: data });
            fetchProducts();
            setAlertMessage('Products imported successfully!');
        } catch (error) {
            console.error('Error importing products:', error);
            setAlertMessage('Failed to import products. Please try again.');
        }
    };

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(products);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Products");
        XLSX.writeFile(wb, "products_export.xlsx");
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === '' || product.category === filterCategory) &&
        (filterStockStatus === '' ||
            (filterStockStatus === 'low' && product.stockLevel <= product.reorderPoint) ||
            (filterStockStatus === 'out' && product.stockLevel === 0))
    );

    return (
        <div className="container-fluid mt-4">
            <h2>Product Management</h2>
            {alertMessage && <Alert variant="info" onClose={() => setAlertMessage('')} dismissible>{alertMessage}</Alert>}
            <Row className="mb-3">
                <Col md={4}>
                    <InputGroup>
                        <InputGroup.Text><FaSearch /></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={3}>
                    <Form.Select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category._id} value={category.name}>{category.name}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Select
                        value={filterStockStatus}
                        onChange={(e) => setFilterStockStatus(e.target.value)}
                    >
                        <option value="">All Stock Status</option>
                        <option value="low">Low Stock</option>
                        <option value="out">Out of Stock</option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Button variant="primary" onClick={() => { setCurrentProduct({}); setShowModal(true); }} className="w-100">
                        Add New Product
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={6}>
                    <Button variant="success" onClick={() => document.getElementById('fileInput').click()} className="me-2">
                        <FaFileImport /> Import
                    </Button>
                    <input
                        id="fileInput"
                        type="file"
                        accept=".xlsx, .xls"
                        style={{ display: 'none' }}
                        onChange={handleImport}
                    />
                    <Button variant="info" onClick={handleExport}>
                        <FaFileExport /> Export
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Stock Level</th>
                        <th>Reorder Point</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.stockLevel}</td>
                            <td>{product.reorderPoint}</td>
                            <td>
                                <Button variant="primary" size="sm" onClick={() => { setCurrentProduct(product); setShowModal(true); }} className="me-2">
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)} className="me-2">
                                    <FaTrash />
                                </Button>
                                <Button variant="success" size="sm" onClick={() => handleStockTransaction(product._id, 'in')} className="me-2">
                                    Stock In
                                </Button>
                                <Button variant="warning" size="sm" onClick={() => handleStockTransaction(product._id, 'out')}>
                                    Stock Out
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentProduct._id ? 'Edit Product' : 'Add New Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentProduct.name || ''}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                value={currentProduct.category || ''}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category.name}>{category.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Stock Level</Form.Label>
                            <Form.Control
                                type="number"
                                value={currentProduct.stockLevel || 0}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, stockLevel: parseInt(e.target.value) })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Reorder Point</Form.Label>
                            <Form.Control
                                type="number"
                                value={currentProduct.reorderPoint || 0}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, reorderPoint: parseInt(e.target.value) })}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Product
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ProductManagement;

