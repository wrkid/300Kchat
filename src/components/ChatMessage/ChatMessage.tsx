import './index.scss';

interface IChatMessage {
  username: string;
  content: string;
  owner: boolean
}

const ChatMessage: React.FC<IChatMessage> = ({username, content, owner}) => {

  const color = owner ? "#ABE1FF" : '#46B8F7';
  const position = owner ? 'flex-end' : 'flex-start'

  const style = {
    backgroundColor: color,
    alignSelf: position
  }


  return (
    <div  style={style} className='chat-message'>
      <div className='chat-message__user-info'>
        {username}
      </div>
      <div className='chat-message__content'> 
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;