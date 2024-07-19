import  { useEffect, useRef } from 'react';
import { Stack } from 'react-bootstrap';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';
import './ChatComponent.css';
import { IUser } from '../../../types/stateTypes';
import { Message } from '../../../types/stateTypes';
interface ChatComponentProps {
  submitHandler: (message: string) => void;
  messages: Message[];
  loggedUser: IUser;
  socketRef: React.MutableRefObject<WebSocket | null>;
}


export default function ChatComponent({ submitHandler, messages, loggedUser, socketRef }: ChatComponentProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
 
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