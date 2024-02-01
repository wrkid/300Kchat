import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import ErrorPage from './routes/ErrorPage';
import RegistrationRoute from './routes/Registration/RegistrationRoute';
import LoginRoute from './routes/Login/LoginRoute';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/reg" element={<RegistrationRoute />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="*" element={<ErrorPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
