import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DemandForecasting = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [forecastData, setForecastData] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchProducts();
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

    const handleForecast = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/forecast/${selectedProduct}`);
            setForecastData(response.data);
        } catch (error) {
            console.error('Error fetching forecast:', error);
            setAlertMessage('Failed to generate forecast. Please try again.');
        }
    };

    const chartData = {
        labels: forecastData ? forecastData.dates : [],
        datasets: [
            {
                label: 'Actual Demand',
                data: forecastData ? forecastData.actual : [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Forecasted Demand',
                data: forecastData ? forecastData.forecast : [],
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Demand Forecast'
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Demand Forecasting</h2>
            {alertMessage && <Alert variant="info" onClose={() => setAlertMessage('')} dismissible>{alertMessage}</Alert>}
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                        <option value="">Select a product</option>
                        {products.map(product => (
                            <option key={product._id} value={product._id}>{product.name}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={6}>
                    <Button onClick={handleForecast} disabled={!selectedProduct}>Generate Forecast</Button>
                </Col>
            </Row>
            {forecastData && (
                <>
                    <div style={{ height: '400px' }}>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Actual Demand</th>
                                <th>Forecasted Demand</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecastData.dates.map((date, index) => (
                                <tr key={date}>
                                    <td>{date}</td>
                                    <td>{forecastData.actual[index]}</td>
                                    <td>{forecastData.forecast[index]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </div>
    );
};

export default DemandForecasting;

