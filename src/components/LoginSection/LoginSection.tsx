import React, { useState } from 'react';
import FormButton from '../../UiKit/FormButton/FormButton';
import FormInput from '../../UiKit/FormInput';
import login from '../../assets/img/login.png';

import './index.scss';
import AppLabel300k from '../../UiKit/AppLabel300k';

const LoginSection = () => {

  const [ mail, setMail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ secretPhrase, setSecretPhrase ] = useState('');

  const handleInput = (name: string, value: string) => {
    if (name === 'login') {
      setMail(value)
    } else if ( name === 'password' ) {
      setPassword(value)
    } else if ( name === 'phrase' ) {
      setSecretPhrase(value)
    }
  };

  const handleSubmit = async () => {
    const body = {
      "username": mail,
      "password": password
    };

    await fetch('http://127.0.0.1:2001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err))
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