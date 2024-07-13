import React, { useEffect, useRef } from 'react';
import { Stack } from 'react-bootstrap';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';
import './ChatComponent.css';

export default function ChatComponent({ submitHandler, messages, loggedUser, socketRef }) {
  const messagesEndRef = useRef(null);
 
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Stack className="chat-stack">
      <MessagesList messages={messages} loggedUser={loggedUser} messagesEndRef={messagesEndRef} />
      <MessageForm submitHandler={submitHandler} socketRef={socketRef} />
    </Stack>
  );
}