import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DebateCard from '../DebateCard/DebateCard';
import { fetchAllDebates } from '../../../store/debateSlice';
import './DebateCardArray.css'

function DebateCardArray() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDebates());
  }, [dispatch]);

  const debates = useSelector((state) => state.debate.debates) || [];
  console.log('\n','Debates:'.debates,'\n')

  if (!debates.length) {
    return <div>No debates found</div>;
  }

  return (
    <div className="card-list-container">
      {debates.map((debate) => (
        <DebateCard key={debate.id} debate={debate} />
      ))}
    </div>
);

}

export default DebateCardArray;
