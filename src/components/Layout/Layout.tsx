import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Spin } from 'antd';

import './index.scss';


const Layout: React.FC = () => {

  const isLoadin = useSelector(state => state.auth.loading)

  return (
    <div className='layout'>
      {isLoadin && <Spin size='large'/>}
      <Outlet />
    </div>
  )
}

export default Layout;