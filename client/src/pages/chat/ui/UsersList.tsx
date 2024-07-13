
import {useState} from 'react';
import { Stack, Button, Modal, Form } from 'react-bootstrap';
import DotOnlineIcon from '../../../ui/icons/DotOnlineIcon';
import './UsersList.css';
import useChat from '../../../hooks/useChat';
export default function UsersList() {
  const {  allUsers } = useChat();
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmitReport = () => {
  
    console.log('Отправка репорта:', { selectedOption, description });
    handleCloseModal();
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <Stack className="users-list-container">
      
      <h6>Users online({allUsers.length})</h6>
      <div>
      {allUsers.map((user) => (
        <div className="p-2" key={user.id}>
          <DotOnlineIcon />
          {user.username}
          
        </div>
      
      ))}
      
      </div>
      <Button variant="danger" className="report-button" onClick={handleShowModal}>Отправить репорт</Button>
      <Modal  className='modal' show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Label  className='input'>Отправить на:</Form.Label>
            <Form.Group controlId="reportOption">
              
              <Form.Control  className='input' as="select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                <option value="">Выберите вариант</option>
                <option value="Склад">Склад</option>
                <option value="Отдел по продажам">Отдел по продажам</option>
                <option value="Тех отдел">Тех отдел</option>
              </Form.Control>
            </Form.Group>
            <Form.Label  className='input'>Описание проблемы:</Form.Label>
            <Form.Group controlId="reportDescription">
              
              <Form.Control className='input' as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='btnClose' onClick={handleCloseModal}>Закрыть</Button>
          <Button variant="primary"  className='btnOpen' onClick={handleSubmitReport}>Отправить</Button>
        </Modal.Footer>
      </Modal>
    </Stack>
  );
}
