import React from 'react';
import { useModal } from '../../../context/Modal';
import CreateConvModal from './CreateConvModal';

function CreateConvButton() {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = () => {
    setModalContent(<CreateConvModal />);
    setOnModalClose(() => {
      console.log("Modal has been closed.");
    });
  };

  return (
    <button className='create-conv-modal-button' onClick={handleClick}>
      Create new settings
    </button>
  );
}

export default CreateConvButton;
