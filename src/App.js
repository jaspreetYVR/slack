import React from 'react';
import Header from './components/Header';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useAuthState } from "react-firebase-hooks/auth"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import styled from 'styled-components';
import { auth } from './firebase';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Spinner from "react-spinkit";

function App() {

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContent>
          <img src='https://assets.stickpng.com/images/5cb480cd5f1b6d3fbadece79.png' alt='slack logo' />
          <Spinner name="ball-spin-fade-loader" color="red" fadeIn='none' />
        </AppLoadingContent>
      </AppLoading>
    )
  }

  return (
    <Router>
      <div className="app">
        {!user ? <Login /> : (
          <AppContainer>
            <Header />
            <AppBody>
              <Sidebar />
              <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/chat' element={<Chat />} />
              </Routes>

            </AppBody>
          </AppContainer>
        )}
      </div>
    </Router>
  );
}

export default App;


const AppContainer = styled.div`
  height: 100vh;
`;

const AppBody = styled.div`
  display: flex;
  height: 94vh;
`;


const AppLoading = styled.div`
  height: 100vh;
  display: grid;
  place-items:center;
  background-color: #E1D9D1;
`;

const AppLoadingContent = styled.div`
  display: flex;
  flex-direction: column;   
  text-align: center;
  padding-bottom: 100px;
  justify-content: center;
  align-items: center;

  img{
    height: 200px;
    object-fit: contain;
    margin-bottom: 50px;
    background-color:#E1D9D1 ;
  }
`;
