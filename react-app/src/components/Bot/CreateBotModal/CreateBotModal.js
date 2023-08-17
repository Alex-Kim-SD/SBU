import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { useHistory } from 'react-router-dom';
import './CreateBotModal.css';
import { addBot } from '../../../store/botSlice';

function CreateBotModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState('');
  const [settings, setSettings] = useState('');
  const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.session.user);

  const history = useHistory();

  const createBot = async (event) => {
  event.preventDefault();

  const botData = {
    name,
    user_id: user.id,
    settings,
  };

  dispatch(addBot(botData)) // Dispatch addBot action
    .then((res) => {
      if (res.type === "bot/addBot/fulfilled") {
        history.push(`/bots`);
        closeModal();
      } else {
        const error = res.error.message;
        setErrors([...errors, error]);
      }
    })
    .catch((err) => {
      setErrors([...errors, err.message]);
    });
};


  return (
    <div className="create-bot-modal">
      <h2>Create Bot</h2>
      {errors.map((error, i) => (
        <div key={i} className="error">{error}</div>
      ))}
      <form onSubmit={createBot}>
        <label>
          Bot Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            maxLength={25} // Maximum length
            placeholder="Enter Bot Name"
          />
        </label>
        <label>
          Bot Settings:
          <textarea
            value={settings}
            onChange={e => setSettings(e.target.value)}
            maxLength={400} // Maximum length
            placeholder="Describe your Bot! Be as specific as possible."
          />
        </label>
        <div className="button-group">
          <button type="submit" className="create-button">Create Bot</button>
          <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CreateBotModal;
