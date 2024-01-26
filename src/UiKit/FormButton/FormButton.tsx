import './index.scss';

interface IFormButton {
  color?: string,
  text?: string,
  onClick?: () => void
}

const FormButton: React.FC<IFormButton> = ({color = 'dark', text = 'Button', onClick}) => {

  const styleColor = color === 'dark' ? '#fff' : '#0386D0';
  const bgColor = color === 'dark' ? '#0386D0' : '#fff';

  const style = {
    color: styleColor,
    backgroundColor: bgColor
  }

  return (
    <button className='form-button' style={style} onClick={onClick}>
      {text}
    </button>
  )
};

export default FormButton; 