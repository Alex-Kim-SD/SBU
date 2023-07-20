import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDebate } from '../../../store/debateSlice';
import MessageList from '../DebateMessageDisplay/DebateMessagesDisplay';
import { fetchMessages } from '../../../store/messageSlice';
import './DebateDetailPage.css';

function DebateDetailPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { debateId } = useParams();

  const messages = useSelector((state) => state.message.messages);
  const debate = useSelector((state) => state.debate.debate);

  useEffect(() => {
    dispatch(fetchDebate(debateId));
    dispatch(fetchMessages(debateId));
  }, [dispatch, debateId]);

  if (!debate) {
    return <div>Loading debate...</div>;
  }

  return (
    <div className="debate-detail-page">
      <h1 className="debate-heading">Debate Page</h1>
      <h2 className="debate-topic">{debate.topic}</h2>
      <p className="debate-id">Debate Id: {debate.id}</p>
      <div className='debate-transcript'>
        <MessageList messages={messages} />
      </div>
    </div>
  );
}

export default DebateDetailPage;
