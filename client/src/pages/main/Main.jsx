import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';

import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import Content from './Content.jsx';

const Main = () => {
  const { path } = useRouteMatch();
  console.log(path)
  return (
      <div className='home'>
        <Navbar />
        <Sidebar />
        <Switch>
          {/* <Redirect from='/' to='/dashboard' />
          <Route path='/:content'>
            <Content />
          </Route> */}
        </Switch>
      </div>
  );
};

export default Main;

// import React from 'react'
// import { useQuery, gql } from '@apollo/client';
// import { Link, useRouteMatch } from 'react-router-dom';
// import useAuth from '../../hooks/index.jsx';
// // import Test from './Test.jsx';
// // import Test2 from './Test2.jsx';
// // import MenuPages from './MenuPages.jsx';

// const GET_USERS = gql`
//   query getUsers {
//     getUsers {
//       _id, username, email, displayName
//     }
//   }
// `;

// // const pages = {
// //   test: Test,
// //   test2: Test2,
// // }

// const Main = () => {
//   const { data } = useQuery(GET_USERS);
//   const auth = useAuth();
//   const { url } = useRouteMatch();
//   return (
//     <div className="text-center">
//       <Link to={`${url}/test`}>Test 1</Link>
//       <Link to={`${url}/test2`}>Test 2</Link>
//       <h1>This is main page</h1>
//       {data && data.getUsers.map((user) => (
//         <p key={user._id}>{user.displayName}</p>
//       ))}
//       <button type="button" onClick={() => auth.logOut()}>LogOut</button>
//     </div>
//   )
// }

// export default Main