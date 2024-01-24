import './index.scss';

const mailIcon = require('../../assets/img/mail.png');
const passwordIcon = require('../../assets/img/lock.png');

interface IFormInput {
  type: string,
  onChange: (type: string, newValue: string) => void
}

const FormInput: React.FC<IFormInput> = ({onChange, type = 'email'}) => {

  const placeholder = type === 'email' ? 'Почта' : 'Пароль';
  const icon = type === 'email' ? mailIcon : passwordIcon;
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
        htmlFor={id}><img src={String(icon)}></img></label>
    </div>
  )
}

export default FormInput;