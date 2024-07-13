import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance, { setAccessToken } from "../axiosInstance";
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import ChatComponent from './chat/ui/ChatComponent';
import useChat from '../hooks/useChat';
import { useAppSelector } from "../redux/hooks";
import './ChatPage.css';
import UsersList from './chat/ui/UsersList';
import { setUser } from '../redux/slices/authSlice';

export default function ChatPage(): React.FC {
  const { user } = useAppSelector((state) => state.authSlice);
  const { messages, users,allUsers, submitMessage, socketRef } = useChat();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance(`${import.meta.env.VITE_API}/tokens/refresh`).then((res) => {
      dispatch(setUser(res.data.user));
      setAccessToken(res.data.accessToken);
      
    }).catch((error) => {
      console.error("Failed to refresh token", error);
    });
  }, [dispatch]);
  console.log('все+++++++++++++++',allUsers)
  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };
  console.log('Юзер', user)
  console.log('Юзеры', users)
  console.log('Сообщения', messages)
  const admins = allUsers.filter(u => u.isAdmin);
  console.log('eqddqwqwd',admins)
  // const filteredMessages = messages.filter(message => message.authorId === 1 ||  message.authorId === user.id)
  // const filteredMessages = user.isAdmin
  // ? messages
  // : messages.filter(message => 
  //     message.authorId === user.id ||  message.authorId === 1
      
  //   );
  const filteredMessages = messages.filter(message => {
    const sender = allUsers.find(u => u.id === message.authorId);
    return message.authorId === user.id || (sender && sender.isAdmin === true);
  });
   

  return (
    <>
      {user && (
        <Container className='chatik'>
          <Button
            className="chat-toggle-button"
            onClick={toggleChatVisibility}
            variant="primary"
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              borderRadius: '50%',
              border: '1px solid black',
              width: '50px',
              height: '50px',
            }}
          >
            {isChatVisible ? 'X' : '💬'}  
          </Button>
          {isChatVisible && (
            
            <div className={user.isAdmin? "chat-container-foAdm" : "chat-container"}>
            <div className= {user.isAdmin? 'usersOnline' : 'suport'}>
               {user.isAdmin ?
                (<UsersList users={allUsers.filter((el) => el.id !== user.id)} />) : (<div className="sup"> Тех.Поддержка</div>)}
               </div>
              <ChatComponent
                submitHandler={submitMessage}
                 messages={user.isAdmin? messages  : filteredMessages} 
                // messages={ messages}
                loggedUser={user}
                socketRef={socketRef}
              />
              
            </div>
          )}
        </Container>
      )}
    </>
  );
}
{/* <div>test</div>: (<div className="sup"> Тех.Поддержка</div>) */}