import React from 'react';
import { useModal } from '../../../context/Modal';
import EditBotModal from './EditBotModal';

function EditBotButton({ botId }) {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = () => {
    setModalContent(<EditBotModal botId={botId} />);
    setOnModalClose(() => {
      console.log("Modal has been closed.");
    });
  };

  return (
    <button onClick={handleClick}>
      Open EditBotModal
    </button>
  );
}

export default EditBotButton;
