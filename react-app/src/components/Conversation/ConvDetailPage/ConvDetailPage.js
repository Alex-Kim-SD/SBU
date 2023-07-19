import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteSetting, fetchSetting, fetchSettings } from '../../../store/convSettingsSlice';
import speech_bubble from "../../../assets/speech_bubble.png";
import EditConvButton from "../EditConvModal/EditConvButton";

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
    <div>
      <img src={speech_bubble} alt="Setting icon" />
      <h2>{setting.title}</h2>
      <p>{setting.setting_details}</p>
      <button onClick={handleDelete}>Delete ConvSetting</button>
      <EditConvButton settingId={settingId} />
    </div>
  );
}

export default ConvSettingDetailPage;
