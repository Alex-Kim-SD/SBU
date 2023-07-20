import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { fetchSetting, editSetting } from '../../../store/convSettingsSlice';
import './EditConvModal.css';

function ConvSettingsModal({ settingId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [settingName, setSettingName] = useState('')
  const [settingDetails, setSettingDetails] = useState('');
  const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(fetchSetting(settingId));
  }, [settingId, dispatch]);

  const setting = useSelector(state => state.convSettings.settings[settingId]);

  useEffect(() => {
    if (setting) {
      setSettingName(setting.title);
      setSettingDetails(setting.setting_details);
    }
  }, [setting]);

  const updateSetting = async (event) => {
    event.preventDefault();

    const updatedSetting = {
      title: settingName, 
      setting_details: settingDetails,
    };

    dispatch(editSetting(settingId, updatedSetting))
      .then(() => {
        closeModal();
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  return (
    <div className="conv-settings-modal">
      <h2>Edit Conversation Setting</h2>
      {errors.map((error, i) => (
        <div key={i} className="error">{error}</div>
      ))}
      <form onSubmit={updateSetting}>
        <label>
          Setting Name:
          <input type="text" value={settingName} onChange={e => setSettingName(e.target.value)} required />
        </label>
        <label>
          Setting Details:
          <textarea value={settingDetails} onChange={e => setSettingDetails(e.target.value)} />
        </label>
        <div className="button-group">
          <button type="submit" className="save-button">Save Changes</button>
          <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ConvSettingsModal;
