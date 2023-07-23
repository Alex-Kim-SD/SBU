import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteSetting, fetchSetting, fetchSettings } from '../../../store/convSettingsSlice';
import speech_bubble from "../../../assets/speech_bubble.png";
import EditConvButton from "../EditConvModal/EditConvButton";
import './ConvDetailPage.css';

function ConvSettingDetailPage() {
  const { settingId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSetting(settingId));
  }, [settingId, dispatch]);

  const setting = useSelector((state) => state.convSettings[settingId]);
  const history = useHistory();

  if (!setting) {
    return <div>Setting not found</div>;
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this setting?")) {
      await dispatch(deleteSetting(settingId));
      await dispatch(fetchSettings());
      history.push('/settings');
    }
  };

  return (
    <div className="conv-setting-detail">
      <img className="conv-setting-icon" src={speech_bubble} alt="Setting icon" />
      <h2 className="conv-setting-title">{setting.title}</h2>
      <p className="conv-setting-details">{setting.setting_details}</p>
      <div className='conv-button-container'>
      <EditConvButton className="conv-setting-edit" settingId={settingId} />
      <button className="conv-setting-delete" onClick={handleDelete}>Delete Conversation Setting</button>
      </div>
    </div>
  );
}

export default ConvSettingDetailPage;
