import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DebateCard from '../DebateCard/DebateCard';
import { fetchAllDebates } from '../../../store/debateSlice';

function DebateCardArray() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDebates());
  }, [dispatch]);

  const debates = useSelector((state) => state.debate.debates) || [];

  if (!debates.length) {
    return <div>No debates found</div>;
  }

  return (
    <div className="card-list">
      {debates.map((debate) => (
        <DebateCard key={debate.id} debate={debate} />
      ))}
    </div>
  );
}

export default DebateCardArray;
