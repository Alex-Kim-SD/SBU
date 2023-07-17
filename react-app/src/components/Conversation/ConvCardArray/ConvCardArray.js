import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ConvCard from '../ConvCard/ConvCard';
import { fetchSettings } from '../../../store/convSettingsSlice';

function ConvCardArray({ userId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const convs = useSelector(state => {
    const conversations = state.convSettings;
    if (conversations) {
      return Object.values(conversations).filter(conv => conv.user_id === userId);
    }
    return [];
  });

  if (!convs.length) {
    return <div>No conversations found</div>;
  }

  return (
    <div className="card-list">
      {convs.map(conv => (
        <ConvCard key={conv.id} conv={conv} />
      ))}
    </div>
  );
}

export default ConvCardArray;
