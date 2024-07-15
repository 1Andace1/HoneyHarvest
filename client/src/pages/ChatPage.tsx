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
import { IUser } from "../types/stateTypes";

interface IMessage {
  authorId: number;
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}

const ChatPage: React.FC = () => {
  const user: IUser | null = useAppSelector((state) => state.authSlice.user);
  const { messages, allUsers, submitMessage, socketRef } = useChat();
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

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  const typedAllUsers: IUser[] = allUsers;
  

  const filteredMessages: IMessage[] = messages.filter(message => {
    const sender: IUser | undefined = typedAllUsers.find(u => u.id === message.authorId);
    return message.authorId === user?.id || (sender && sender.isAdmin === true);
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
            <div className={user.isAdmin ? "chat-container-foAdm" : "chat-container"}>
              
              <div className={user.isAdmin ? 'usersOnline' : 'suport'}>
                {user.isAdmin ?
                  (<UsersList/>)
                   : (<div className="sup"> Тех.Поддержка</div>)}
              </div>
              <ChatComponent
                submitHandler={submitMessage}
                messages={user.isAdmin ? messages : filteredMessages}
                loggedUser={user}
                socketRef={socketRef}
              />
            </div>
          )}
        </Container>
      )}
    </>
  );
};

export default ChatPage;
{/* <div>test</div>: (<div className="sup"> Тех.Поддержка</div>) */}