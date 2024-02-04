import './index.scss';

import { useSelector } from "react-redux";

const ChatSection = () => {
  const username = useSelector<any>(state => state.auth.userInfo.username);

  return (
    <div className="chat-section">
      <span>{`Hello, ${username}`}</span>
      <div className="chat-section__inner">

      </div>
    </div>
  );
};

export default ChatSection;