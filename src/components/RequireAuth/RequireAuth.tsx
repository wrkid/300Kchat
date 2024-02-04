import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Spin } from 'antd';
import { ReactNode, useEffect } from 'react';
import { RootState } from '@/types/authTypes';

interface IProp {
  children: ReactNode;
}

const RequireAuth: React.FC<IProp> = ({children}) => {
  const navigate = useNavigate();
  const { isAuth, loading } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if (isAuth) navigate('/chat');
  }, [isAuth])

  if (loading) return <Spin />

  return children;
}

export default RequireAuth;