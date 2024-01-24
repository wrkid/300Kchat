import { useState } from 'react';
import FormButton from '../../UiKit/FormButton/FormButton';
import FormInput from '../../UiKit/FormInput';
import './index.scss';

const login = require('../../assets/img/login.png');

const LoginSection = () => {

  const [ mail, setMail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleInput = (name: string, v: string) => {
    if (name === 'email') {
      setMail(v)
    } else if ( name === 'password' ) {
      setPassword(v)
    }
  };

  console.log(mail, password);

  return (
    <div className="login-section">
      <div className='login-section__inner'>
        <img src={String(login)} />
        <span>300K Chat</span>
          <FormInput 
            type='email'
            onChange={handleInput}
          />
          <FormInput 
            type='password'
            onChange={handleInput}
          />
          <input
            className='login-section__inner__input--secret-phrase' 
            placeholder='Секретная фраза'
          />
          <div className='login-section__inner__buttons'>
            <FormButton color='dark' text='Войти' />
            <FormButton color='light' text='Регистрация' />
          </div>
      </div>
    </div>
  );
}

export default LoginSection;