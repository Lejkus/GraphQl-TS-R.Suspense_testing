import Tabs from './Tabs';
import { Outlet } from 'react-router';

export default () => {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  );
};