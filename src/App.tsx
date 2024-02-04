import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import ErrorPage from './routes/ErrorPage';
import RegistrationRoute from './routes/Registration/RegistrationRoute';
import LoginRoute from './routes/Login/LoginRoute';
import ChatRoute from './routes/Chat/ChatRoute';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { chechAuth } from './store/authActions/authActions';

import PrivateRoute from './components/PrivateRoute';
import RequireAuth from './components/RequireAuth';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem('token')) {
        await dispatch(chechAuth() as any);
      }
    };
  
    checkAuth();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ChatRoute />}/>
        <Route path="/registration" element={<RequireAuth children={<RegistrationRoute/>}/>} />
        <Route path="/login" element={<RequireAuth children={<LoginRoute />}/>} />
        <Route path="/chat" element={
          <PrivateRoute>
            <ChatRoute />
          </PrivateRoute>
        } />
        <Route path="*" element={<ErrorPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
