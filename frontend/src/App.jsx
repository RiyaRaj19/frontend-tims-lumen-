import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import SupplierManagement from './components/SupplierManagement';
import OrderManagement from './components/OrderManagement';
import InventoryManagement from './components/InventoryManagement';
import SalesManagement from './components/SalesManagement';
import DemandForecasting from './components/DemandForecasting';
import DataImportExport from './components/DataImportExport';
import EmployeeManagement from './components/EmployeeManagement';
import Settings from './components/Settings';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="suppliers" element={<SupplierManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="sales" element={<SalesManagement />} />
          <Route path="forecast" element={<DemandForecasting />} />
          <Route path="import-export" element={<DataImportExport />} />
          <Route path="employees" element={<EmployeeManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

