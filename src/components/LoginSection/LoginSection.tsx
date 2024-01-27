import { useState } from 'react';
import FormButton from '../../UiKit/FormButton/FormButton';
import FormInput from '../../UiKit/FormInput';

import './index.scss';
import AppLabel300k from '../../UiKit/AppLabel300k';

import login from '../../assets/img/login.png';

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

  const handleSubmit = () => {
    console.log(mail, password, secretPhrase);
  }

  return (
    <div className="login-section">
      <div className='login-section__inner'>
        <img src={String(login)} alt='login'/>
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