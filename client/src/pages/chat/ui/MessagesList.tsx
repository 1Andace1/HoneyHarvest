
import { Stack } from 'react-bootstrap';
import ChatMessage from './ChatMessage';
import './MessagesList.css';

export default function MessagesList({ messages, loggedUser, messagesEndRef }) {
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