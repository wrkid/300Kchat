import FormButton from '../../UiKit/FormButton/FormButton';
import FormInput from '../../UiKit/FormInput';
import './index.scss'
import login from '../../assets/img/login.png';

const LoginSection = () => {
  return (
    <div className="login-section">
      <div className='login-section__inner'>
        <img src={login} alt="login"></img>
        <span>300K Chat</span>
          <FormInput type='email'/>
          <FormInput type='password'/>
          <div className='login-section__inner__buttons'>
            <FormButton color='dark' text='Войти' />
            <FormButton color='light' text='Регистрация' />
          </div>
      </div>
    </div>
  );
}

export default LoginSection;