/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import SendIcon from '../../../ui/icons/SendIcon';
import './MessageForm.css'
export default function MessageForm({ submitHandler, socketRef }) {
  const [input, setInput] = useState('');
  const changeHandler = (e) => setInput(e.target.value);

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    socket.send(JSON.stringify({ type: 'CLIENT_TYPING_FROM_SERVER' }));

    const time = setTimeout(() => {
      socket.send(JSON.stringify({ type: 'TYPING_FROM_SERVER_STOP' }));
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  }, [input]);

  return (
    <Form
    
      onSubmit={(event) => {
        event.preventDefault()
       
        submitHandler(input);
        setInput('');
      }}
    >
      <InputGroup className='mb-3'>
        <Form.Control className='inputs '
          placeholder='Your message'
          value={input}
          sx={{
            _focus: {
              outline: "none",
            },
          }}
          onChange={changeHandler}
        />
        <InputGroup.Text id='basic-addon2'>
          <Button variant='outline-primary' type='submit'  className='btn-outline-primary'>
            <SendIcon />
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
// import React, { useEffect, useState } from 'react';
// import { Button, Form, InputGroup } from 'react-bootstrap';
// import SendIcon from '../../../ui/icons/SendIcon';
// import './MessageForm.css';

// export default function MessageForm({ submitHandler, socketRef }) {
//   const [input, setInput] = useState('');
//   const [isSocketOpen, setIsSocketOpen] = useState(false);

//   const changeHandler = (e) => setInput(e.target.value);

//   useEffect(() => {
//     if (!socketRef.current) return;

//     const socket = socketRef.current;

//     const handleOpen = () => {
//       setIsSocketOpen(true);
//     };

//     const handleClose = () => {
//       setIsSocketOpen(false);
//     };

//     socket.addEventListener('open', handleOpen);
//     socket.addEventListener('close', handleClose);

//     return () => {
//       socket.removeEventListener('open', handleOpen);
//       socket.removeEventListener('close', handleClose);
//     };
//   }, [socketRef]);

//   useEffect(() => {
//     if (!socketRef.current || !isSocketOpen) return;

//     const socket = socketRef.current;

//     socket.send(JSON.stringify({ type: 'CLIENT_TYPING_FROM_SERVER' }));

//     const time = setTimeout(() => {
//       socket.send(JSON.stringify({ type: 'TYPING_FROM_SERVER_STOP' }));
//     }, 1000);

//     return () => {
//       clearTimeout(time);
//     };
//   }, [input, isSocketOpen, socketRef]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (isSocketOpen && input.trim()) {
//       submitHandler(input);
//       setInput('');
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <InputGroup className='mb-3'>
//         <Form.Control
//           className='inputs'
//           placeholder='Your message'
//           value={input}
//           onChange={changeHandler}
//           style={{ outline: 'none' }}
//         />
//         <InputGroup.Text id='basic-addon2'>
//           <Button variant='outline-primary' type='submit'>
//             <SendIcon />
//           </Button>
//         </InputGroup.Text>
//       </InputGroup>
//     </Form>
//   );
// }