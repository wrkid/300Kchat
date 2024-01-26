import LoginSection from '../LoginSection';
import RegisterSection from '../RegisterSection';
import './AuthPage.scss';

const AuthPage = () => {
  return (
    <div className="auth-page">
      <LoginSection />
      <RegisterSection />
    </div>
  )
}

export default AuthPage;