import React from 'react'
import { useParams } from 'react-router-dom';
import Test from './Test.jsx';
import Test2 from './Test2.jsx';

const pages = {
  test: Test,
  test2: Test2,
}

const MenuPages = () => {
  const { nav } = useParams();
  console.log(nav)
  const Component = pages[nav];
  return <Component />
}

export default MenuPages
