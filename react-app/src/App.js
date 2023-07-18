import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

import BotDetailPage from "./components/Bot/BotDetailPage/BotDetailPage"
import BotDashboard from "./components/Bot/BotDashboard/BotDashboard"

import ConvDashboard from "./components/Conversation/ConvDashboard/ConvDashboard";
import ConvSettingDetailPage from "./components/Conversation/ConvDetailPage/ConvDetailPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/home">
          </Route>
          <Route exact path="/bots">
            <BotDashboard />
          </Route>
          <Route path="/bots/:botId">
            <BotDetailPage />
          </Route>
          <Route exact path="/settings">
            <ConvDashboard/>
          </Route>
          <Route exact path="/settings/:settingId">
            <ConvSettingDetailPage/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
