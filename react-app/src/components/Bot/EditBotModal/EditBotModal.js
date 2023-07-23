import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../../context/Modal";
import { fetchBot, editBot } from '../../../store/botSlice';
import './EditBotModal.css';

function EditBotModal({ botId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState('');
  const [settings, setSettings] = useState('');
  const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(fetchBot(botId));
  }, [botId, dispatch]);

 const bot = useSelector(state => state.bots.your_bots[botId]);


  useEffect(() => {
    if (bot) {
      setName(bot.name);
      setSettings(bot.settings);
    }
  }, [bot]);

  const updateBot = async (event) => {
    event.preventDefault();
    const updatedBot = {
      name,
      settings,
    };

    dispatch(editBot({ botId, bot: updatedBot }))
      .then((res) => {
        closeModal();
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  return (
    <div className="edit-bot-modal">
      <h2>Edit Bot</h2>
      {errors.map((error, i) => (
        <div key={i} className="error">{error}</div>
      ))}
      <form onSubmit={updateBot}>
        <label>
          Bot Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength="25"
            required
          />
        </label>
        <label>
          Bot Settings:
          <textarea
            value={settings}
            onChange={e => setSettings(e.target.value)}
            maxLength="400"
          />
        </label>
        <div className="button-group">
          <button type="submit" className="save-button">Save Changes</button>
          <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );

}

export default EditBotModal;
