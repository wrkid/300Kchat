import { Outlet } from 'react-router-dom';

import './index.scss';


const Layout: React.FC = () => {
  return (
    <div className='layout'>
      <Outlet />
    </div>
  )
}

export default Layout;