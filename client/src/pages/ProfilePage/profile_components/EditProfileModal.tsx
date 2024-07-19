import React, { useRef, ChangeEvent, FocusEvent, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Button,
} from '@chakra-ui/react';

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    username: string;
    email: string;
    password: string;
    telephone: string;
    userCity: string;
    profilePhoto?: File | string;
  };
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  formData,
  handleChange,
  handleSubmit,
}: EditProfileModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentFormData, setCurrentFormData] = useState({ ...formData });
  const [initialFormData, setInitialFormData] = useState({ ...formData });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    if (!focusedField) {
      setFocusedField(name);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    if (
      focusedField === name &&
      !currentFormData[name as keyof typeof currentFormData]
    ) {
      setCurrentFormData({
        ...currentFormData,
        [name]: initialFormData[name as keyof typeof initialFormData],
      });
    }
    setFocusedField(null);
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      handleChange(event);
    }
  };

  const handleChangeInternal = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentFormData({ ...currentFormData, [name]: value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        style={{
          backgroundColor: 'RGBA(255, 255, 255, 0.92)',
          color: '#4A5568',
        }}
      >
        <ModalHeader
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginBottom: '10px',
          }}
        >
          Редактировать профиль
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Input
              name="username"
              value={currentFormData.username}
              onChange={handleChangeInternal}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Имя пользователя"
              mb={3}
              style={{
                backgroundColor: '#ffffff',
                color: '#3f3e3e',
                borderColor: '#ccc',
              }}
            />
            <Input
              name="email"
              value={currentFormData.email}
              onChange={handleChangeInternal}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Эл.почта"
              mb={3}
              style={{
                backgroundColor: '#ffffff',
                color: '#3f3e3e',
                borderColor: '#ccc',
              }}
            />
            <Input
              type="password"
              name="password"
              value={currentFormData.password}
              onChange={handleChangeInternal}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Пароль"
              mb={3}
              style={{
                backgroundColor: '#ffffff',
                color: '#3f3e3e',
                borderColor: '#ccc',
              }}
            />
            <Input
              type="telephone"
              name="telephone"
              value={currentFormData.telephone}
              onChange={handleChangeInternal}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Номер телефона"
              mb={3}
              style={{
                backgroundColor: '#ffffff',
                color: '#3f3e3e',
                borderColor: '#ccc',
              }}
            />
            <Input
              type="userCity"
              name="userCity"
              value={currentFormData.userCity}
              onChange={handleChangeInternal}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Город"
              mb={3}
              style={{
                backgroundColor: '#ffffff',
                color: '#3f3e3e',
                borderColor: '#ccc',
              }}
            />
            <label
              htmlFor="profilePhoto"
              style={{ display: 'block', marginBottom: '10px' }}
            >
              Нажмите, чтобы загрузить фото
            </label>
            <input
              id="profilePhoto"
              ref={fileInputRef}
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
            {currentFormData.profilePhoto && (
              <p style={{ marginBottom: '10px' }}>
                Выбран файл:{' '}
                {currentFormData.profilePhoto instanceof File
                  ? currentFormData.profilePhoto.name
                  : 'Файл загружен'}
              </p>
            )}
            <Button
              type="submit"
              colorScheme="blue"
              style={{
                backgroundColor: '#8bbd6c',
                color: '#ffffff',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Сохранить
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileModal;
