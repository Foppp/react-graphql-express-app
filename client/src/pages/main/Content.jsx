import React from 'react';
import { useParams } from 'react-router-dom';

import '../../assets/styles/content.css';

import Dashboard from '../../components/Dashboard/Dashboard.jsx';
import Orders from '../../components/Orders/Orders.jsx';
import Artists from '../../components/Artists/Artists.jsx';
import Todos from '../../components/Todos/Todos.jsx';
import Calendar from '../../components/Calendar/Calendar.jsx';
import Groups from '../../components/Groups/Groups.jsx';

const menuContent = {
  dashboard: Dashboard,
  orders: Orders,
  artists: Artists,
  todos: Todos,
  calendar: Calendar,
  groups: Groups,
};

const Content = () => {
  const { content } = useParams();
  console.log(content)
  const ContentComponent = menuContent[content];

  return (
    <div className='content'>
      <ContentComponent />
    </div>
  );
};

export default Content;
