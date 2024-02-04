import AppLabel300k from '@/UiKit/AppLabel300k';
import './index.scss';

import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import FormButton from '@/UiKit/FormButton/FormButton';
import { logoutUser } from '@/store/authActions/authActions';

import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Message } from '@/types/messagesType';
import { IUser } from '@/types/authTypes';

const ChatSection = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState('');
  const {id, username} = useSelector<any, IUser>(state => state.auth.userInfo);
  const dispatch = useDispatch();

  const socket = io('http://localhost:2001', {
    withCredentials: true,
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:2001/chat/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    //подписываемся на событие нового сообщения
    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    console.log(value)
    const messageData = {
      username,
      userid: id,
      timeStamp: new Date(),
      content: value,
    };

    // отправляем сообщение на сервер
    socket.emit('chat message', messageData);

    setValue('');
  };

  const renderMessages = () => {
    return (
      <ul>
        {messages.map((msg) => (
          <li key={msg._id}>{msg.content}</li>
        ))}
      </ul>
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-section">
      <div className='chat-section__header'>
        <span>{`Hello, ${username}`}</span>
        <AppLabel300k/>
        <FormButton color='leight' text="Выйти" onClick={() => dispatch(logoutUser() as any)}/>
      </div>
      <div className="chat-section__inner">
        <div className='chat-section__inner__messages'>
        {renderMessages()}  
        </div>
        <input 
          className='chat-section__inner__input'
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default ChatSection;