//  🟪 МОДАЛЬНОЕ ОКНО РЕДАКТИРОВАНИЯ ПРОФИЛЯ 

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Button
} from '@chakra-ui/react';

const EditProfileModal = ({ isOpen, onClose, formData, handleChange, handleSubmit }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Редактировать профиль</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Имя пользователя"
            mb={3}
          />
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Эл.почта"
            mb={3}
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Пароль"
            mb={3}
          />
          <Input
            type="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Номер телефона"
            mb={3}
          />
          <Input
            type="userCity"
            name="userCity"
            value={formData.userCity}
            onChange={handleChange}
            placeholder="Город"
            mb={3}
          />
          <Input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleChange}
            mb={3}
          />
          <Button type="submit" colorScheme="blue">
            Сохранить
          </Button>
        </form>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default EditProfileModal;