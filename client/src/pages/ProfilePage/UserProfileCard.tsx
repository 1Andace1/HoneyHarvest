import { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Image,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';
import { useAppDispatch } from '../../redux/hooks';
import { updateUser } from '../../redux/slices/authSlice';
import axiosInstance from '../../axiosInstance';

interface UserProfileCardProps {
  user: any;
}

const { VITE_API, VITE_BASE_URL }: ImportMeta['env'] = import.meta.env;

const UserProfileCard = ({ user }: UserProfileCardProps) => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
    telephone: user?.telephone,
    userCity: user?.userCity,
    password: '',
    profilePhoto: null,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'profilePhoto') {
      setFormData({ ...formData, profilePhoto: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append('username', formData.username);
      formDataObj.append('email', formData.email);
      formDataObj.append('telephone', formData.telephone);
      formDataObj.append('userCity', formData.userCity);
      if (formData.password) {
        formDataObj.append('password', formData.password);
      }
      if (formData.profilePhoto) {
        formDataObj.append('profilePhoto', formData.profilePhoto);
      }
      const res = await axiosInstance.put(
        `${import.meta.env.VITE_API}/profile/users/${user.id}`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const updatedUser = res.data.user;
      dispatch(updateUser(updatedUser));
      setIsEditing(false);
      onClose();
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      setFormData({
        username: user?.username,
        email: user?.email,
        telephone: user?.telephone,
        userCity: user?.userCity,
        password: '',
        profilePhoto: null,
      });
    }
  }, [isEditing, user]);

  return (
    <Box
      bg="RGBA(0, 0, 0, 0.24)"
      color="#f8f9fb"
      p={6}
      borderRadius="md"
      w="full"
      maxW="md"
      boxShadow="md"
      textAlign="center"
    >
      <Image
        src={
          user.photo
            ? `http://localhost:3000/${user.photo}?t=${new Date().getTime()}`
            : 'http://localhost:3000/no-photo.jpg'
        }
        alt="Profile Photo"
        boxSize="150px"
        borderRadius="full"
        mx="auto"
        mb={4}
      />
      <Text fontSize="lg" fontWeight="bold">
        Имя пользователя: {user.username}
      </Text>
      <Text fontSize="lg" fontWeight="bold">
        Email: {user.email}
      </Text>
      <Button
        colorScheme="blue"
        mt={4}
        bg="#2F855A"
        _hover={{ bg: 'teal.700' }}
        _active={{ bg: 'teal.800' }}
        _focus={{ boxShadow: 'none' }}
        onClick={() => {
          setIsEditing(true);
          onOpen();
        }}
      >
        Редактировать профиль
      </Button>

      {isEditing && (
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
      )}
    </Box>
  );
};

export default UserProfileCard;