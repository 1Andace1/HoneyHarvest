// import React from 'react';
// import { Card } from 'react-bootstrap';
// import './ChatMessage.css'
// export default function ChatMessage({ message, loggedUser }) {
//   const justifyContent = loggedUser.id === message.User?.id ? 'border-1px-sold-black' : 'justify-content-start';
//   return (
//     <div className={`d-flex ${justifyContent} mt-2 mb-2`}>
//       <Card style={{ width: '15rem' }}>
//         <Card.Body>
//           <Card.Subtitle className="mb-2 text-muted">{message.User?.username}</Card.Subtitle>
//           <Card.Text>{message.text}</Card.Text>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }
// import React from 'react';
// import { Card } from 'react-bootstrap';
// import './ChatMessage.css'
// export default function ChatMessage({ message, loggedUser }: {
//   message: any;
//   loggedUser: any;
// }): React.JSX.Element {
//   // const justifyContent = loggedUser.id === message.User?.id ? 'border-1px-sold-black' : 'justify-content-start';

//   return (
//     <div className={loggedUser.id === message.User?.id ? 'you' : 'other'}>
//       <Card style={{ width: '15rem' }}>
//         <Card.Body>
//           <Card.Subtitle className={loggedUser.id === message.User?.id ? 'youName' : 'otherName'}>{message.User?.username}</Card.Subtitle>
//           <Card.Text>{message.text}</Card.Text>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

import React from 'react';
import { Card } from 'react-bootstrap';
import './ChatMessage.css'

export default function ChatMessage({ message, loggedUser }: {
  message: any;
  loggedUser: any;
}): React.JSX.Element {
  return (
    <div className={loggedUser.id === message.User?.id ? 'you' : 'other'}>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Subtitle className={loggedUser.id === message.User?.id ? 'youName' : 'otherName'}>
            {message.User?.username}
          </Card.Subtitle>
          <Card.Text className="message-text">
            {message.text}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
