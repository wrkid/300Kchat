import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormButton from '@/UiKit/FormButton/FormButton';
import FormInput from '@/UiKit/FormInput';
import login from '@/assets/img/login.png';

import './index.scss';
import AppLabel300k from '../../UiKit/AppLabel300k';
import { loginUser } from '@/store/actions/authActions';

const LoginSection = () => {

  const [ mail, setMail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ _, setSecretPhrase ] = useState('');

  const handleInput = (name: string, value: string) => {
    if (name === 'login') {
      setMail(value)
    } else if ( name === 'password' ) {
      setPassword(value)
    } else if ( name === 'phrase' ) {
      setSecretPhrase(value)
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const body = {
      "login": mail,
      "password": password
    };

    dispatch(loginUser(body) as any)
  }

  return (
    <div className="login-section">
      <div className='login-section__inner'>
        <img src={login} alt='login'/>
          <AppLabel300k size='medium'/>
          <FormInput 
            type='login'
            onChange={handleInput}
          />
          <FormInput 
            type='password'
            onChange={handleInput}
          />
          <div className='login-section__inner__buttons'>
            <FormButton 
              color='dark' 
              text='Войти'
              onClick={handleSubmit}
            />
            <FormButton 
              color='light' 
              text='Регистрация' 
            />
          </div>
      </div>
    </div>
  );
}

export default LoginSection;