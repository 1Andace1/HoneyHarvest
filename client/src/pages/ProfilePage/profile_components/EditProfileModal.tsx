//  🟪 МОДАЛЬНОЕ ОКНО РЕДАКТИРОВАНИЯ ПРОФИЛЯ
import { useRef, ChangeEvent } from 'react';
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
    profilePhoto?: File;
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
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      handleChange(event); // Optional: propagate change to parent component
    }
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
              value={formData.username}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
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
              value={formData.telephone}
              onChange={handleChange}
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
              value={formData.userCity}
              onChange={handleChange}
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
            {formData.profilePhoto && (
              <p style={{ marginBottom: '10px' }}>
                Выбран файл: {formData.profilePhoto.name}
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
