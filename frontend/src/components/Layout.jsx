// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';
// import './Layout.css';

// const Layout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className={`layout ${sidebarOpen ? '' : 'sidebar-closed'}`}>
//       <Sidebar isOpen={sidebarOpen} />
//       <div className="main-content">
//         <Navbar toggleSidebar={toggleSidebar} />
//         <div className="content-area">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;



import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './Layout.css';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`layout ${sidebarOpen ? '' : 'sidebar-closed'}`}>
      <Sidebar isOpen={sidebarOpen} />
      <div className="main-content">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

