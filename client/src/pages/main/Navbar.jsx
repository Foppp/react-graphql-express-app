import React from "react";

import '../../assets/styles/nabvar.css';

const Navbar = () => {
  return (
    <div className="d-flex navbar">
      <div className="flex-grow-1">search</div>
      <div className="px-2">
      bell icon
      </div>
      <div className="px-2">user icon</div>
    </div>
  );
};

export default Navbar;

// import React, { useState } from "react";
// import cn from "classnames";
// import avatar from "../../assets/img/me.png";
// import logoImg from "../../assets/img/LogoImg.png";
// import logoName from "../../assets/img/LogoName3.png";

// const Navbar = () => {
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [notificationOpen, setNotificationOpen] = useState(false);

//   const onUserMenuToggle = () => {
//     setNotificationOpen(false);
//     setUserMenuOpen(!userMenuOpen);
//   };
//   const onNotificationToggle = () => {
//     setUserMenuOpen(false);
//     setNotificationOpen(!notificationOpen);
//   };

//   const userMenuClass = cn("dropdown-menu userMenu dropdown-menu-dark", {
//     show: userMenuOpen,
//   });

//   const notificationClass = cn(
//     "dropdown-menu notificationMenu dropdown-menu-dark",
//     { show: notificationOpen }
//   );

//   return (
//     <div className="content-head">
//       <div className="row">
//         <div className="col-2 col-lg-2 col-md-3 col-sm-1 brand-logo-name">
//           <div className="col my-auto text-center">
//             <img className="brand-name" src={logoName} alt="" />
//           </div>
//         </div>
//         <div className="col-2 d-flex justify-content-between">
//         <div className="col d-flex justify-content-between">
//           <div className="row my-auto ms-2">
//             <div className="searchbar">
//               <input
//                 className="search_input"
//                 type="text"
//                 name=""
//                 placeholder="Search... "
//               />
//               <i className="bx bx-search"></i>
//             </div>
//             </div>
//             </div>
//         </div>
//         <div className="col">
//           <div className="row text-center">
//             <div className="col-2">
//               <div className="notification-bell d-inline">
//                 <button
//                   type="button"
//                   className="btn btn-default"
//                   data-bs-toggle="dropdownnNotification"
//                   aria-expanded="true"
//                   onClick={onNotificationToggle}
//                   onBlur={() => setNotificationOpen(false)}
//                 >
//                   <i className="bx bx-bell">
//                     <span className="notify-circle position-absolute translate-middle p-1 bg-danger border border-light rounded-circle">
//                       <span className="visually-hidden">New alerts</span>
//                     </span>
//                   </i>
//                 </button>
//                 <ul className={notificationClass}>
//                   <li className="li">Notificationa</li>
//                   <hr className="dropdown-divider" />
//                   <li className="li">first notification</li>
//                   <li className="li">second notify</li>
//                   <hr className="dropdown-divider" />
//                   <li>Logout</li>
//                 </ul>
//               </div>
//             </div>
//             <div className="col-6">User Name</div>
//             <div className="col">
//               <button
//                 type="btn"
//                 className="btn btn-danger btn-sm"
//                 onClick={() => console.log("logout")}
//               >
//                 LogOut
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* <div className="col-2 col-lg-2 col-md-3 col-sm-1 brand-logo-name">
//           <div className="col my-auto text-center">
//             <img className="brand-name" src={logoName} alt="" />
//           </div>
//         </div>
//         <div className="col d-flex justify-content-between">
//           <div className="row my-auto ms-2">
//             <div className="searchbar">
//               <input
//                 className="search_input"
//                 type="text"
//                 name=""
//                 placeholder="Search... "
//               />
//               <i className="bx bx-search"></i>
//             </div>
//           </div>
//           <div className="my-auto">
//           <div className="notification-bell d-inline">
            // <button
            //   type="button"
            //   className="btn btn-default"
            //   data-bs-toggle="dropdownnNotification"
            //   aria-expanded="true"
            //   onClick={onNotificationToggle}
            //   onBlur={() => setNotificationOpen(false)}
            // >
            //   <i className="bx bx-bell">
            //     <span className="notify-circle position-absolute translate-middle p-1 bg-danger border border-light rounded-circle">
            //       <span className="visually-hidden">New alerts</span>
            //     </span>
            //   </i>
            // </button>
            // <ul className={notificationClass}>
            //   <li className="li">Notificationa</li>
            //   <hr className="dropdown-divider" />
            //   <li className="li">first notification</li>
            //   <li className="li">second notify</li>
            //   <hr className="dropdown-divider" />
            //   <li>Logout</li>
            // </ul>
//           </div>
//             <div className="d-inline">dgdgg</div>
//             <div className="d-inline"><button
//               type="btn"
//               className="btn btn-danger btn-sm"
//               onClick={() => console.log("logout")}
//             >
//               LogOut
//             </button></div>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
