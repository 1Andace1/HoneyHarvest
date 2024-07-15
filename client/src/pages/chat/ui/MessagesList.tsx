
import { Stack } from 'react-bootstrap';
import ChatMessage from './ChatMessage';
import './MessagesList.css';
import { Message, IUser } from '../../../types/stateTypes';

interface MessagesListProps {
  messages: Message[];
  loggedUser: IUser;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function MessagesList({ messages, loggedUser, messagesEndRef }: MessagesListProps) {
  return (
    <div className="messages-list overflow-auto">
      <Stack>
        {messages.map((message) => (
          <ChatMessage message={message} key={message.id} loggedUser={loggedUser} />
        ))}
        <div ref={messagesEndRef} />
      </Stack>
    </div>
  );
}