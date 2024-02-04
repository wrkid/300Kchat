import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import io from 'socket.io-client';

import './index.scss';

import AppLabel300k from '@/UiKit/AppLabel300k';
import FormButton from '@/UiKit/FormButton/FormButton';

import sendit from '../../assets/img/sendit.svg';

import { logoutUser } from '@/store/authActions/authActions';

import { IUser } from '@/types/authTypes';
import { IMessage } from '@/types/messagesType';

import ChatMessage from '../ChatMessage';

const ChatSection = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [value, setValue] = useState('');
  const {id, username} = useSelector<any, IUser>(state => state.auth.userInfo);
  const dispatch = useDispatch();

  const socket = io('http://localhost:2001', {
    withCredentials: true,
  });

  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // При обновлении messages, прокручиваем блок вниз
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);
  
  useEffect(() => {
    // получаем сообщения с бд
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:2001/chat/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    // подписываемся на событие нового сообщения и пушим в стейт
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

    // чистим инпут
    setValue('');
  };

  const renderMessages = () => {
    return (
        messages.map((msg) => {
          let owner = false;
            if (msg.userid === id) {
              owner = true
            }
          return (
          <ChatMessage key={msg._id} username={msg.username} content={msg.content} owner={owner}/>
          )
        })
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
        <div ref={messagesRef} className='chat-section__inner__messages'>
          {renderMessages()}  
        </div>
        <div className='chat-section__inner__bottom'>
          <input 
            className='chat-section__inner__bottom__input'
            placeholder='Введи вообщение тут...'
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            onKeyDown={handleKeyDown}
          />
          <button><img src={sendit}/></button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;