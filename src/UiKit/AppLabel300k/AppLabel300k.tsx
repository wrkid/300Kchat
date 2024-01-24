  import './index.scss'

  type TLabel300k = {
    size?: string
  }
  
  const AppLabel300k: React.FC<TLabel300k> = ({size = 'medium'}) => {

    const styleSize = 
      size === 'large' ? '60px' : 
      size === 'medium' ? '40px' : 
      size === 'small' ? '20px' :
      '40px';

    const style = {
      fontSize: styleSize,
    }

    return (
      <span className="app-label-300k" style={style}>300K Chat</span>
    );
};

export default AppLabel300k;