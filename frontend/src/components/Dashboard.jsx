// // 
// import React, { useState, useEffect } from 'react';
// import { Row, Col, Card, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { FaBox, FaTruck, FaClipboardList, FaUsers, FaChartLine, FaFileImport } from 'react-icons/fa';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalSuppliers: 0,
//     totalOrders: 0,
//     lowStockItems: 0
//   });
//   const [recentSales, setRecentSales] = useState([]);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [productsRes, suppliersRes, ordersRes, salesRes] = await Promise.all([
//         axios.get('http://localhost:5000/api/products/count'),
//         axios.get('http://localhost:5000/api/suppliers/count'),
//         axios.get('http://localhost:5000/api/orders/count'),
//         axios.get('http://localhost:5000/api/sales/recent')
//       ]);

//       setStats({
//         totalProducts: productsRes.data.count,
//         totalSuppliers: suppliersRes.data.count,
//         totalOrders: ordersRes.data.count,
//         lowStockItems: productsRes.data.lowStockCount
//       });

//       setRecentSales(salesRes.data);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     }
//   };

//   const chartData = {
//     labels: recentSales.map(sale => sale.date),
//     datasets: [
//       {
//         label: 'Recent Sales',
//         data: recentSales.map(sale => sale.amount),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       }
//     ]
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Recent Sales'
//       }
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Dashboard</h2>
//       <Row className="mb-4">
//         <Col md={3}>
//           <Card className="dashboard-card">
//             <Card.Body>
//               <Card.Title>{stats.totalProducts}</Card.Title>
//               <Card.Text>Total Products</Card.Text>
//               <FaBox className="dashboard-icon" />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="dashboard-card">
//             <Card.Body>
//               <Card.Title>{stats.totalSuppliers}</Card.Title>
//               <Card.Text>Total Suppliers</Card.Text>
//               <FaTruck className="dashboard-icon" />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="dashboard-card">
//             <Card.Body>
//               <Card.Title>{stats.totalOrders}</Card.Title>
//               <Card.Text>Total Orders</Card.Text>
//               <FaClipboardList className="dashboard-icon" />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="dashboard-card bg-warning text-white">
//             <Card.Body>
//               <Card.Title>{stats.lowStockItems}</Card.Title>
//               <Card.Text>Low Stock Items</Card.Text>
//               <FaBox className="dashboard-icon" />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//       <Row className="mb-4">
//         <Col md={8}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Recent Sales</Card.Title>
//               <Bar data={chartData} options={chartOptions} />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Quick Actions</Card.Title>
//               <div className="d-grid gap-2">
//                 <Button as={Link} to="/dashboard/products" variant="primary">
//                   <FaBox className="me-2" /> Manage Products
//                 </Button>
//                 <Button as={Link} to="/dashboard/suppliers" variant="secondary">
//                   <FaTruck className="me-2" /> Manage Suppliers
//                 </Button>
//                 <Button as={Link} to="/dashboard/orders" variant="success">
//                   <FaClipboardList className="me-2" /> Manage Orders
//                 </Button>
//                 <Button as={Link} to="/dashboard/forecast" variant="info">
//                   <FaChartLine className="me-2" /> Demand Forecast
//                 </Button>
//                 <Button as={Link} to="/dashboard/import-export" variant="warning">
//                   <FaFileImport className="me-2" /> Import/Export Data
//                 </Button>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { Row, Col, Card, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { FaBox, FaTruck, FaClipboardList, FaUsers, FaChartLine, FaFileImport } from 'react-icons/fa';
// import axios from 'axios';
// import { Bar, Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalSuppliers: 0,
//     totalOrders: 0,
//     lowStockItems: 0
//   });
//   const [recentSales, setRecentSales] = useState([]);
//   const [monthlyRevenue, setMonthlyRevenue] = useState([]);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [productsRes, suppliersRes, ordersRes, salesRes, revenueRes] = await Promise.all([
//         axios.get('http://localhost:5000/api/products/count'),
//         axios.get('http://localhost:5000/api/suppliers/count'),
//         axios.get('http://localhost:5000/api/orders/count'),
//         axios.get('http://localhost:5000/api/sales/recent'),
//         axios.get('http://localhost:5000/api/sales/monthly-revenue')
//       ]);

//       setStats({
//         totalProducts: productsRes.data.count,
//         totalSuppliers: suppliersRes.data.count,
//         totalOrders: ordersRes.data.count,
//         lowStockItems: productsRes.data.lowStockCount
//       });

//       setRecentSales(salesRes.data);
//       setMonthlyRevenue(revenueRes.data);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     }
//   };

//   const salesChartData = {
//     labels: recentSales.map(sale => sale.date),
//     datasets: [
//       {
//         label: 'Recent Sales',
//         data: recentSales.map(sale => sale.amount),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       }
//     ]
//   };

//   const revenueChartData = {
//     labels: monthlyRevenue.map(item => item.month),
//     datasets: [
//       {
//         label: 'Monthly Revenue',
//         data: monthlyRevenue.map(item => item.revenue),
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1
//       }
//     ]
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Sales and Revenue'
//       }
//     }
//   };

//   return (
//     <div className="dashboard">
//       <h2 className="mb-4">Dashboard</h2>
//       <Row className="mb-4">
//         <Col md={3}>
//           <Card className="dashboard-card">
//             <Card.Body>
//               <Card.Title>{stats.totalProducts}</Card.Title>
//               <Card.Text>Total Products</Card.Text>
//               <FaBox className="dashboard-icon" />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="dashboard-card">
//             <Card.Body>
//               <Card.Title>{stats.totalSuppliers}</Card.Title>
//               <Card.Text>Total Suppliers</Card.Text>
//               <FaTruck className="dashboard-icon" />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="dashboard-card">
//             <Card.Body>
//               <Card.Title>{stats.totalOrders}</Card.Title>
//               <Card.Text>Total Orders</Card.Text>
//               <FaClipboardList className="dashboard-icon" />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="dashboard-card bg-warning text-white">
//             <Card.Body>
//               <Card.Title>{stats.lowStockItems}</Card.Title>
//               <Card.Text>Low Stock Items</Card.Text>
//               <FaBox className="dashboard-icon" />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//       <Row className="mb-4">
//         <Col md={8}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Sales Overview</Card.Title>
//               <div style={{ height: '300px' }}>
//                 <Bar data={salesChartData} options={chartOptions} />
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Monthly Revenue</Card.Title>
//               <div style={{ height: '300px' }}>
//                 <Line data={revenueChartData} options={chartOptions} />
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//       <Row>
//         <Col md={12}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Quick Actions</Card.Title>
//               <div className="d-flex justify-content-between flex-wrap">
//                 <Button as={Link} to="/dashboard/products" variant="primary" className="mb-2">
//                   <FaBox className="me-2" /> Manage Products
//                 </Button>
//                 <Button as={Link} to="/dashboard/suppliers" variant="secondary" className="mb-2">
//                   <FaTruck className="me-2" /> Manage Suppliers
//                 </Button>
//                 <Button as={Link} to="/dashboard/orders" variant="success" className="mb-2">
//                   <FaClipboardList className="me-2" /> Manage Orders
//                 </Button>
//                 <Button as={Link} to="/dashboard/forecast" variant="info" className="mb-2">
//                   <FaChartLine className="me-2" /> Demand Forecast
//                 </Button>
//                 <Button as={Link} to="/dashboard/import-export" variant="warning" className="mb-2">
//                   <FaFileImport className="me-2" /> Import/Export Data
//                 </Button>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBox, FaTruck, FaClipboardList, FaUsers, FaChartLine, FaFileImport } from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 150,
    totalSuppliers: 25,
    totalOrders: 1000,
    lowStockItems: 10
  });

  const [recentSales, setRecentSales] = useState([
    { date: '2023-01-01', amount: 5000 },
    { date: '2023-01-02', amount: 6000 },
    { date: '2023-01-03', amount: 4500 },
    { date: '2023-01-04', amount: 7000 },
    { date: '2023-01-05', amount: 5500 },
  ]);

  const [monthlyRevenue, setMonthlyRevenue] = useState([
    { month: 'Jan', revenue: 50000 },
    { month: 'Feb', revenue: 55000 },
    { month: 'Mar', revenue: 60000 },
    { month: 'Apr', revenue: 58000 },
    { month: 'May', revenue: 65000 },
  ]);

  const salesChartData = {
    labels: recentSales.map(sale => sale.date),
    datasets: [
      {
        label: 'Recent Sales',
        data: recentSales.map(sale => sale.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  const revenueChartData = {
    labels: monthlyRevenue.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Revenue',
        data: monthlyRevenue.map(item => item.revenue),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales and Revenue'
      }
    }
  };

  return (
    <div className="dashboard">
      <h2 className="mb-4">Dashboard</h2>
      <Row className="mb-4">
        <Col md={3}>
          <Card className="dashboard-card bg-primary text-white">
            <Card.Body>
              <Card.Title>{stats.totalProducts}</Card.Title>
              <Card.Text>Total Products</Card.Text>
              <FaBox className="dashboard-icon" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card bg-success text-white">
            <Card.Body>
              <Card.Title>{stats.totalSuppliers}</Card.Title>
              <Card.Text>Total Suppliers</Card.Text>
              <FaTruck className="dashboard-icon" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card bg-info text-white">
            <Card.Body>
              <Card.Title>{stats.totalOrders}</Card.Title>
              <Card.Text>Total Orders</Card.Text>
              <FaClipboardList className="dashboard-icon" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card bg-warning text-white">
            <Card.Body>
              <Card.Title>{stats.lowStockItems}</Card.Title>
              <Card.Text>Low Stock Items</Card.Text>
              <FaBox className="dashboard-icon" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Sales Overview</Card.Title>
              <div style={{ height: '300px' }}>
                <Bar data={salesChartData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Monthly Revenue</Card.Title>
              <div style={{ height: '300px' }}>
                <Line data={revenueChartData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Quick Actions</Card.Title>
              <div className="d-flex justify-content-between flex-wrap">
                <Button as={Link} to="/products" variant="outline-primary" className="mb-2">
                  <FaBox className="me-2" /> Manage Products
                </Button>
                <Button as={Link} to="/suppliers" variant="outline-secondary" className="mb-2">
                  <FaTruck className="me-2" /> Manage Suppliers
                </Button>
                <Button as={Link} to="/orders" variant="outline-success" className="mb-2">
                  <FaClipboardList className="me-2" /> Manage Orders
                </Button>
                <Button as={Link} to="/forecast" variant="outline-info" className="mb-2">
                  <FaChartLine className="me-2" /> Demand Forecast
                </Button>
                <Button as={Link} to="/import-export" variant="outline-warning" className="mb-2">
                  <FaFileImport className="me-2" /> Import/Export Data
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

