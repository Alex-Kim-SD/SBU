import React from 'react';
import { useModal } from '../../../context/Modal';
import CreateBotModal from './CreateBotModal';
import './CreateBotButton.css'; // Import the CSS file for styling

function CreateBotButton() {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = () => {
    setModalContent(<CreateBotModal />);
    setOnModalClose(() => {
      console.log("Modal has been closed.");
    });
  };

  return (
    <div className='create-bot-container'>
      <h3 className='create-bot-title'>
        Add a new bot?
      </h3>
      <button className='create-bot-button' onClick={handleClick}>
        Create
      </button>
    </div>
  );
}

export default CreateBotButton;
