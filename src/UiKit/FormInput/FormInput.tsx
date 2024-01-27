import './index.scss';

import mailIcon from '../../assets/img/mail.png';
import passwordIcon from '../../assets/img/lock.png';
import nameIcon from '../../assets/img/name.png';

interface IFormInput {
  type: string,
  onChange: (type: string, newValue: string) => void
}

const FormInput: React.FC<IFormInput> = ({onChange, type = 'login'}) => {

  const placeholder = 
    type === 'email' ? 'Почта' : 
    type === 'password' ? 'Пароль' :
    type === 'password-repeat' ? 'Повтори пароль' :
    type === 'login' ? 'Логин' :
    type === 'name' ? 'Имя в чате' :
    'Логин';


  const icon = 
    type === 'email' ? mailIcon : 
    type === 'login' ? mailIcon :
    type === 'name' ? nameIcon :
    type === 'password' ? passwordIcon :
    type === 'password-repeat' ? passwordIcon :
    mailIcon;

  const id = `${type}${Math.random()*10}`

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(type, newValue);
  }

  return (
    <div style={{position: 'relative', width: '315px'}}>
      <input 
        type={type}
        id={id} 
        className='form-input' 
        placeholder={placeholder}
        onChange={handleValue}
      />
      <label 
        className='form-input-label'
        htmlFor={id}><img src={String(icon)} alt="icon"/></label>
    </div>
  )
}

export default FormInput;