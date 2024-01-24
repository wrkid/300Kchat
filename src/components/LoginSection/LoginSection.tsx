import { useState } from 'react';
import FormButton from '../../UiKit/FormButton/FormButton';
import FormInput from '../../UiKit/FormInput';

import './index.scss';
import AppLabel300k from '../../UiKit/AppLabel300k';

const login = require('../../assets/img/login.png');


const LoginSection = () => {

  const [ mail, setMail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ secretPhrase, setSecretPhrase ] = useState('');

  const handleInput = (name: string, v: string) => {
    if (name === 'email') {
      setMail(v)
    } else if ( name === 'password' ) {
      setPassword(v)
    } else if ( name === 'phrase' ) {
      setSecretPhrase(v)
    }
  };

  // const handleSubmit = () => {

  // }

  console.log(mail, password, secretPhrase);

  return (
    <div className="login-section">
      <div className='login-section__inner'>
        <img src={String(login)} />
          <AppLabel300k size='medium'/>
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
            value={secretPhrase}
            onChange={(e) => handleInput('phrase', e.target.value)}
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