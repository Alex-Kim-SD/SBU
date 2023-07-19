import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDebate } from '../../../store/debateSlice';

function DebateDetailPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { debateId } = useParams();

  const debate = useSelector((state) => state.debate.debate);

  useEffect(() => {
    dispatch(fetchDebate(debateId));
  }, [dispatch, debateId]);


  if (!debate) {
    return <div>Loading debate...</div>;
  }

  return (
    <div>
      <h1>Debate Page</h1>
      <h2>{debate.topic}</h2>
      <p>Start Time: {debate.start_time}</p>
      <p>End Time: {debate.end_time}</p>
      <p>Result: {debate.result}</p>
    </div>
  );
}

export default DebateDetailPage;
