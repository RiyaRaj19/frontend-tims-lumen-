// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Nav } from 'react-bootstrap';
// import { FaBox, FaTruck, FaClipboardList, FaUsers, FaChartBar, FaCog, FaChartLine, FaFileImport } from 'react-icons/fa';
// import './Sidebar.css';

// const Sidebar = () => {
//   const location = useLocation();

//   const isActive = (path) => location.pathname.startsWith(path);

//   return (
//     <Nav className="sidebar flex-column bg-dark text-light">
//       <div className="sidebar-header">
//         <h3>TIMS</h3>
//       </div>
//       <Nav.Item>
//         <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
//           <FaBox className="me-2" /> Dashboard
//         </Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Link to="/dashboard/orders" className={`nav-link ${isActive('/dashboard/orders') ? 'active' : ''}`}>
//           <FaClipboardList className="me-2" /> Orders
//         </Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Link to="/dashboard/suppliers" className={`nav-link ${isActive('/dashboard/suppliers') ? 'active' : ''}`}>
//           <FaTruck className="me-2" /> Suppliers
//         </Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Link to="/dashboard/inventory" className={`nav-link ${isActive('/dashboard/inventory') ? 'active' : ''}`}>
//           <FaBox className="me-2" /> Inventory
//         </Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Link to="/dashboard/sales" className={`nav-link ${isActive('/dashboard/sales') ? 'active' : ''}`}>
//           <FaChartBar className="me-2" /> Sales
//         </Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Link to="/dashboard/forecast" className={`nav-link ${isActive('/dashboard/forecast') ? 'active' : ''}`}>
//           <FaChartLine className="me-2" /> Demand Forecast
//         </Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Link to="/dashboard/import-export" className={`nav-link ${isActive('/dashboard/import-export') ? 'active' : ''}`}>
//           <FaFileImport className="me-2" /> Import/Export
//         </Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Link to="/dashboard/employees" className={`nav-link ${isActive('/dashboard/employees') ? 'active' : ''}`}>
//           <FaUsers className="me-2" /> Employees
//         </Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Link to="/dashboard/settings" className={`nav-link ${isActive('/dashboard/settings') ? 'active' : ''}`}>
//           <FaCog className="me-2" /> Settings
//         </Link>
//       </Nav.Item>
//     </Nav>
//   );
// };

// export default Sidebar;



import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaBox, FaTruck, FaClipboardList, FaUsers, FaChartBar, FaCog, FaChartLine, FaFileImport } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Nav className={`sidebar flex-column bg-dark text-light ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>TIMS</h3>
      </div>
      <Nav.Item>
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
          <FaBox className="me-2" /> Dashboard
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/orders" className={`nav-link ${isActive('/orders') ? 'active' : ''}`}>
          <FaClipboardList className="me-2" /> Orders
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/suppliers" className={`nav-link ${isActive('/suppliers') ? 'active' : ''}`}>
          <FaTruck className="me-2" /> Suppliers
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/inventory" className={`nav-link ${isActive('/inventory') ? 'active' : ''}`}>
          <FaBox className="me-2" /> Inventory
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/sales" className={`nav-link ${isActive('/sales') ? 'active' : ''}`}>
          <FaChartBar className="me-2" /> Sales
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/forecast" className={`nav-link ${isActive('/forecast') ? 'active' : ''}`}>
          <FaChartLine className="me-2" /> Demand Forecast
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/import-export" className={`nav-link ${isActive('/import-export') ? 'active' : ''}`}>
          <FaFileImport className="me-2" /> Import/Export
        </Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Link to="/employees" className={`nav-link ${isActive('/employees') ? 'active' : ''}`}>
          <FaUsers className="me-2" /> Employees
        </Link>
      </Nav.Item> */}
      <Nav.Item>
        <Link to="/settings" className={`nav-link ${isActive('/settings') ? 'active' : ''}`}>
          <FaCog className="me-2" /> Settings
        </Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;

