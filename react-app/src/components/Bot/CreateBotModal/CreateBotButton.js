import React from 'react';
import { useModal } from '../../../context/Modal';
import CreateBotModal from './CreateBotModal';

function CreateBotButton() {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = () => {
    setModalContent(<CreateBotModal />);
    setOnModalClose(() => {
      console.log("Modal has been closed.");
    });
  };

  return (
    <button onClick={handleClick}>
      Open CreateBotModal
    </button>
  );
}

export default CreateBotButton;
