import './index.scss';

interface IChatMessage {
  username: string;
  content: string;
  owner: boolean
}

const ChatMessage: React.FC<IChatMessage> = ({username, content, owner}) => {

  const color = owner ? "#ABE1FF" : '#46B8F7';
  const position = owner ? 'flex-end' : 'flex-start'

  const styleColor = {
    backgroundColor: color,
  }

  const stylePosition = {
    alignSelf: position
  }


  return (
    <div  style={stylePosition} className='chat-message'>
      <div className='chat-message__user-info'>
        {username}
      </div>
      <div style={styleColor} className='chat-message__content'> 
        <span>{content}</span>
      </div>
    </div>
  );
};

export default ChatMessage;