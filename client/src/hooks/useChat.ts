/* eslint-disable no-unused-vars */
//! --- 4 ---
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useAppSelector } from "../redux/hooks";
const { VITE_API, VITE_BASE_URL } = import.meta.env;
export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers]=useState([]);
  const [typing, setTyping] = useState(false);
  const { user } = useAppSelector((state) => state.authSlice);
  const socketRef = useRef(null);

  useEffect(() => {
    axiosInstance(`${VITE_BASE_URL}${VITE_API}/messages`).then(({ data }) => setMessages(data));
  }, []);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:3000');

    const socket = socketRef.current;

    socket.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case 'SET_USERS_FROM_SERVER':
          console.log('SET_USERS_FROM_SERVER',payload)
          setUsers([user]);
          setAllUsers(payload);
          break;
          

        case 'ADD_MESSAGE_FROM_SERVER':
          setMessages((prev) => [...prev, payload]);
          break;

        //! useEffect в MessageForm для установки и очистки елемента с выводом строки typing
        case 'CLIENT_TYPING_FROM_SERVER':
          setTyping(payload);
          break;

        case 'TYPING_FROM_SERVER_STOP':
          setTyping(false);
          break;

        default:
          break;
      }
    };
  }, [user]);

  const submitMessage = (input) => {
    const socket = socketRef.current;

    socket.send(
      JSON.stringify({ type: 'ADD_MESSAGE_FROM_CLIENT', payload: input })
    );
  };

  return {
    messages,
    users,
    // typing,
    allUsers,
    submitMessage,
    socketRef,
  };
}
