// import React, { useState } from 'react';
// import { Card, Col,Button, Container, Row } from 'react-bootstrap';
// import './ChatPage.css';
// import useChat from '../hooks/useChat';
// import ChatComponent from './chat/ui/ChatComponent';
// import UsersList from './chat/ui/UsersList';
// import { useAppSelector } from "../redux/hooks";

// export default function ChatPage() {
//   const { user } = useAppSelector((state) => state.authSlice);
//   const { messages, users, typing, submitMessage, socketRef } = useChat();
//   const [isChatVisible, setIsChatVisible] = useState(false);
//   const toggleChatVisibility = () => {
//     setIsChatVisible(!isChatVisible);
//   };
//   return (
//     <Container className='chatik'>
//        <Button
//         className="chat-toggle-button"
//         onClick={toggleChatVisibility}
//         variant="primary"
//         style={{
//           position: 'fixed',
//           bottom: '20px',
//           right: '20px',
//           borderRadius: '50%',
//           width: '50px',
//           height: '50px',
//         }}
//       >
//         {isChatVisible ? 'X' : '💬'}
//       </Button>
//         {isChatVisible && (
//           <div className="chat-container">
//       <Row className="justify-content-center align-items-center text-center">
//         <Col xs={12}>
//           <h1 className="p-2 display-3">Поддержка</h1>
//         </Col>
//       </Row>
//       <Card className="p-4 chat-card">
//         <Row>
//           <Col xs={4} className="users-list-col">
//             <UsersList users={users.filter((el) => el.id !== user.id)} />
//           </Col>
//           <Col xs={8} className="chat-col">
//             <ChatComponent
//               submitHandler={submitMessage}
//               messages={messages}
//               loggedUser={user}
//               socketRef={socketRef}
//             />
//             {typing && typing.id !== user.id && <div className="typing-indicator">{typing.username} is typing...</div>}
//           </Col>
//         </Row>
//       </Card>
//       </div>
//       )}
      
//     </Container>
//   );
// }
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import ChatComponent from './chat/ui/ChatComponent';
import useChat from '../hooks/useChat';
import { useAppSelector } from "../redux/hooks";
import './ChatPage.css';
import UsersList from './chat/ui/UsersList';

export default function ChatPage() {
  const { user } = useAppSelector((state) => state.authSlice);
  const { messages, users, typing, submitMessage, socketRef } = useChat();
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

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
        
        <div className="chat-container">
          <UsersList users={users.filter((el) => el.id !== user.id)} />
          <ChatComponent
          
            submitHandler={submitMessage}
            messages={messages}
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
