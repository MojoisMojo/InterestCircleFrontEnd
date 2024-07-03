import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import HomePage from './pages/Home'
import Header from './components/Header/Header';
import LoginAndRegister from './pages/Login/index';
import FindInterestsPage from './pages/FindInterests/index';
import MyInterests from './pages/MyInterests/index';
import NotFoundPage from './pages/ErrorPages/NotFoundPage';
import CirclePage from './pages/CirclePage';
let curr_user = {
  id: '123',
  name: 'Mojo',
  email: 'mojo@example.com',
  avatarUrl: '/logo.svg',
}
export default function App() {
  function checkLogin(page) {
    if (curr_user.id) {
      return page;
    }else{
      return <Navigate to="/login" replace/>;
    }
  }
  return (
    <>
      <Router>
        <Header user={curr_user} />
        <Routes>
          <Route exact path='/' element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<LoginAndRegister />} />
          <Route path="/home" element={checkLogin(<HomePage />)} />
          <Route path="/findInterests" element={checkLogin(<FindInterestsPage />)} />
          <Route path="/myInterests" element={checkLogin(<MyInterests />)} />
          <Route path="/circle" element={checkLogin(<CirclePage />)}/>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

