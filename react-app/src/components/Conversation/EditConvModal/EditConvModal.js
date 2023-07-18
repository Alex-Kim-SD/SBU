import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../../context/Modal"
import { fetchSetting, editSetting } from '../../../store/convSettingsSlice';

function ConvSettingsModal({ settingId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [settingDetails, setSettingDetails] = useState('');
    const [errors, setErrors] = useState([]);

    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchSetting(settingId));
    }, [settingId, dispatch]);

    const setting = useSelector(state => state.convSettings.settings[settingId]);
    useEffect(() => {
        if (setting) {
            setSettingDetails(setting.setting_details);
        }
    }, [setting]);

    const updateSetting = async (event) => {
        event.preventDefault();

        const updatedSetting = {
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
        <>
            <h2>Edit Conversation Setting</h2>
            {errors.map((error, i) => (
                <div key={i}>{error}</div>
            ))}
            <form onSubmit={updateSetting}>
                <label>
                    Setting Details:
                    <textarea value={settingDetails} onChange={e => setSettingDetails(e.target.value)} />
                </label>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeModal}>Cancel</button>
            </form>
        </>
    );
}

export default ConvSettingsModal;
