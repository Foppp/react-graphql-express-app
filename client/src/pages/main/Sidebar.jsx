import React from "react";
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import '../../assets/styles/sidebar.css'

const Sidebar = () => {

  const { url } = useRouteMatch();
  return (
    <div id="mySidebar" className="sidebar">
      <div className="container sidebar-wrapper">
        <Link to={`${url}/dashboard`} className="sidebar-link d-flex">
          <div className="d-inline sidebar-icon">
            <i className="bi bi-speedometer2"></i>
          </div>
          <div className="d-inline sidebar-item">Home</div>
        </Link>
        <Link to={`${url}/orders`} className="sidebar-link d-flex">
          <div className="d-inline">@</div>
          <div className="d-inline sidebar-item">About</div>
        </Link>
        <Link to={`${url}/artists`} className="sidebar-link d-flex">
          <div className="d-inline">@</div>
          <div className="d-inline sidebar-item">Srvices</div>
        </Link>
        <Link to={`${url}/calendar`} className="sidebar-link d-flex">
          <div className="d-inline">@</div>
          <div className="d-inline sidebar-item">Contact</div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

// import React from 'react';
// import { Link, useRouteMatch, useLocation } from 'react-router-dom';
// import cn from 'classnames';
// import { Col } from 'react-bootstrap';

// const navItems = [
//   { id: 1, path: 'dashboard', name: 'Dashboard', icon: 'bi bi-speedometer2' },
//   { id: 2, path: 'artists', name: 'Artists', icon: 'bi bi-person' },
//   { id: 3, path: 'groups', name: 'Groups', icon: 'bi bi-people' },
//   { id: 4, path: 'orders', name: 'Orders', icon: 'bi bi-card-list' },
//   { id: 5, path: 'calendar', name: 'Calendar', icon: 'bi bi-calendar-week' },
//   { id: 6, path: 'todos', name: 'Todos', icon: 'bi bi-check2-square' },
// ];

// const Sidebar = () => {
//   const { url, path } = useRouteMatch();
//   const location = useLocation();
//   const [, activePath] = location.pathname.split(`${path}/`);

//   return (
//     <Col lg={2} md={3} sm={1} xs={2} className='sidebar border-end px-2'>
//       <div className='col sidebar-body justify-content-between mb-2 ps-1 pe-2 p-2 border-bottom border-secondary'>
//         {navItems.map(({ id, path, name, icon }) => {
//           const className = cn('row nav-item mt-3 justify-content-center', {
//             active: activePath === path,
//           });
//           return (
//             <Link to={`${url}/${path}`} key={id} className={className}>
//               <div className='col col-1 nav-item-icon me-4'>
//                 <i className={icon}></i>
//               </div>
//               <div className='col nav-item-name my-auto'>{name}</div>
//             </Link>
//           );
//         })}
//       </div>
//     </Col>
//   );
// };

// export default Sidebar;
