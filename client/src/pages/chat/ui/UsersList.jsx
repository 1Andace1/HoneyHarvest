
import React from 'react';
import { Stack } from 'react-bootstrap';
import DotOnlineIcon from '../../../ui/icons/DotOnlineIcon';; // Предполагается, что это ваш компонент с иконкой
import './UsersList.css';

export default function UsersList({ users }) {
  console.log(users)
  return (
    <Stack>
      {users.map((user) => (
        <div className="user-item p-2" key={user.id}>
          <DotOnlineIcon /> <span className="username"></span>
        </div>
      ))}
    </Stack>
  );
}
