import './index.scss';

interface IFormButton {
  color: string,
  text: string
}

const FormButton: React.FC<IFormButton> = ({color, text}) => {
  const styleColor = color === 'dark' ? '#fff' : '#0386D0';
  const bgColor = color === 'dark' ? '#0386D0' : '#fff';

  const style = {
    color: styleColor,
    backgroundColor: bgColor
  }

  return (
    <button style={style}>{text}</button>
  )
};

export default FormButton; 