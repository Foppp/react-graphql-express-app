import React from 'react'
import { useParams } from 'react-router-dom';
import Test from './Test.jsx';
import Test2 from './Test2.jsx';

const pages = {
  test: Test,
  test2: Test2,
}

const MenuPages = () => {
  const { page } = useParams();
  const Component = pages[page];
  return <Component />
}

export default MenuPages
