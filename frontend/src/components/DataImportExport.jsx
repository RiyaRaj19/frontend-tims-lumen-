import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import * as XLSX from 'xlsx';

const DataImportExport = () => {
    const [file, setFile] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImport = async () => {
        if (!file) {
            setAlertMessage('Please select a file to import.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                await axios.post('http://localhost:5000/api/products/import', { products: data });
                setAlertMessage('Data imported successfully!');
            } catch (error) {
                console.error('Error importing data:', error);
                setAlertMessage('Failed to import data. Please try again.');
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleExport = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            const ws = XLSX.utils.json_to_sheet(response.data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Products");
            XLSX.writeFile(wb, "inventory_export.xlsx");
            setAlertMessage('Data exported successfully!');
        } catch (error) {
            console.error('Error exporting data:', error);
            setAlertMessage('Failed to export data. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Data Import/Export</h2>
            {alertMessage && <Alert variant="info" onClose={() => setAlertMessage('')} dismissible>{alertMessage}</Alert>}
            <Form>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Import Inventory Data</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
                </Form.Group>
                <Button variant="primary" onClick={handleImport} className="me-2">
                    Import Data
                </Button>
                <Button variant="success" onClick={handleExport}>
                    Export Data
                </Button>
            </Form>
        </div>
    );
};

export default DataImportExport;

