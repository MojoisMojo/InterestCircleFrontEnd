import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Header from './components/Header/Header';
import LoginPage from './pages/LoginPage/index';
import FindInterestsPage from './pages/FindInterests/index';
import MyInterestsPage from './pages/MyInterestsPage/index';
import NotFoundPage from './pages/ErrorPages/NotFoundPage';
import CirclePage from './pages/CirclePage';
import AboutusPage from './pages/AboutUsPage';
import { useState } from 'react';
import { static_empty_user } from './assets/static'
import UserContext from './context/UserContext'

export default function App() {
  const [currUser, setCurrUser] = useState(static_empty_user)
  function checkLogin(page) {
    console.log(currUser);
    if (currUser.uid) {
      return page;
    } else {
      return <Navigate to="/login" replace />;
    }
  }
  return (
    <>
      <UserContext.Provider value={{ currUser, setCurrUser }}>
        <Router>
          <Header />
          <Routes>
            <Route exact path='/' element={<Navigate to="/home" replace />} />
            <Route path="/login" element={currUser.uid ? <Navigate to="/home" replace /> : <LoginPage />} />
            <Route path="/home" element={checkLogin(<HomePage />)} />
            <Route path="/findInterests" element={checkLogin(<FindInterestsPage />)} />
            <Route path="/myInterests" element={checkLogin(<MyInterestsPage />)} />
            <Route path="/circle" element={checkLogin(<CirclePage />)} />
            <Route path='aboutus' element={<AboutusPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router >
      </UserContext.Provider>
    </>
  );
}

