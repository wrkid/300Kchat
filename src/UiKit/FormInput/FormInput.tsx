import './index.scss';

interface IFormInput {
  type: string
}

const FormInput: React.FC<IFormInput> = ({type}) => {
  const placeholder = type === 'email' ? 'Почта' : 'Пароль';

  return (
    <input placeholder={placeholder}/>
  )
}

export default FormInput;