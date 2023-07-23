// SBU/react-app/src/components/Conversation/ConvDashboard/ConvDashboard.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchSettings } from '../../../store/convSettingsSlice';
import ConvCardArray from '../ConvCardArray/ConvCardArray';
import CreateConvButton from '../CreateConvModal/CreateConvButton';
import './ConvDashboard.css';

function ConvDashboard() {
  const { convId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    } else {
      dispatch(fetchSettings());
    }
  }, [convId, dispatch, currentUser, history]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="conv-dashboard">
      <h1 className="conv-dashboard-title">Conversations</h1>
      <CreateConvButton />
      <ConvCardArray userId={currentUser.id} />
    </div>
  );
}

export default ConvDashboard;
