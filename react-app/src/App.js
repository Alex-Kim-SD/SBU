// /SBU/react-app/src/App.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from './components/LoginFormPage';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';
import SideNavBar from './components/SideNavBar/SideNavBar';

import HomePage from './components/HomePage/HomePage/HomePage';
import BotDetailPage from './components/Bot/BotDetailPage/BotDetailPage'
import BotDashboard from './components/Bot/BotDashboard/BotDashboard'

import ConvDashboard from './components/Conversation/ConvDashboard/ConvDashboard';
import ConvSettingDetailPage from './components/Conversation/ConvDetailPage/ConvDetailPage';

import OtherBotsPage from './components/OtherBots/OtherBotsPage/OtherBotsPage';

import ChallengePage from './components/Challenge/ChallengePage/ChallengePage';

import DebateDetailPage from './components/Debate/DebateDetailPage/DebateDetailPage';
import DebatePage from './components/Debate/DebatePage/DebatePage';

import Background from './components/Background/background';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';

  return (
    <>
    <Background />
      {!isLoginPage && !isSignupPage && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <div className="app-content">
          {!isLoginPage && !isSignupPage && <SideNavBar />}

          <div className="RightContent">
            <Switch>
              <Route path="/login"> <LoginFormPage /> </Route>

              <Route path="/signup"> <SignupFormPage /> </Route>

              <Route path="/home"> <HomePage /> </Route>

              <Route path="/challenge"><ChallengePage /> </Route>

              <Route exact path="/bots"> <BotDashboard /> </Route>
              <Route exact path="/other-bots"> <OtherBotsPage /> </Route>
              <Route path="/bots/:botId"> <BotDetailPage /> </Route>

              <Route exact path="/settings"> <ConvDashboard /> </Route>
              <Route exact path="/settings/:settingId"> <ConvSettingDetailPage /> </Route>

              <Route exact path="/debates"> <DebatePage/> </Route>
              <Route exact path="/debates/:debateId"> <DebateDetailPage/> </Route>
            </Switch>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
