import React from 'react';
import { useModal } from '../../../context/Modal';
import EditBotModal from './EditBotModal';

function EditBotButton({ botId }) {
  const { setModalContent, setOnModalClose } = useModal();

  const handleEditClick = () => {
    setModalContent(<EditBotModal botId={botId} />);
    setOnModalClose(() => {
      console.log("Modal has been closed.");
    });
  };

  return (
    <button onClick={handleEditClick}>
      Edit
    </button>
  );
}

export default EditBotButton;
