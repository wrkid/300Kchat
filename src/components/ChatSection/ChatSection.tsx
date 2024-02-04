import AppLabel300k from '@/UiKit/AppLabel300k';
import './index.scss';

import { useDispatch, useSelector } from "react-redux";
import FormButton from '@/UiKit/FormButton/FormButton';
import { logoutUser } from '@/store/authActions/authActions';

const ChatSection = () => {
  const username = useSelector<any>(state => state.auth.userInfo.username);

  const dispatch = useDispatch();

  return (
    <div className="chat-section">
      <div className='chat-section__header'>
        <span>{`Hello, ${username}`}</span>
        <AppLabel300k/>
        <FormButton color='leight' text="Выйти" onClick={() => dispatch(logoutUser() as any)}/>
      </div>
      <div className="chat-section__inner">

      </div>
    </div>
  );
};

export default ChatSection;