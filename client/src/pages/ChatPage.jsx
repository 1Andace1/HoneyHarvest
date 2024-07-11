import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './ChatPage.css';
import useChat from '../hooks/useChat';
import ChatComponent from './chat/ui/ChatComponent';
import UsersList from './chat/ui/UsersList';
import { useAppSelector } from "../redux/hooks";

export default function ChatPage() {
  const { user } = useAppSelector((state) => state.authSlice);
  const { messages, users, typing, submitMessage, socketRef } = useChat();

  return (
    <Container className='chatik'>
      <Row className="justify-content-center align-items-center text-center">
        <Col xs={12}>
          <h1 className="p-2 display-3">Chat Support</h1>
        </Col>
      </Row>
      <Card className="p-4 chat-card">
        <Row>
          <Col xs={4} className="users-list-col">
            <UsersList users={users.filter((el) => el.id !== user.id)} />
          </Col>
          <Col xs={8} className="chat-col">
            <ChatComponent
              submitHandler={submitMessage}
              messages={messages}
              loggedUser={user}
              socketRef={socketRef}
            />
            {typing && typing.id !== user.id && <div className="typing-indicator">{typing.username} is typing...</div>}
          </Col>
        </Row>
      </Card>
    </Container>
  );
}