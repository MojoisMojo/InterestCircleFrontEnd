import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/Home'
import HeaderLayout from './layout/HeaderLayout';
import LoginAndRegister from './pages/Login/index';
import FindInterestsPage from './pages/FindInterests/index';
import MyInterests from './pages/MyInterests/index';

export default function App() {
  return (
    <>
    <Router>
      <HeaderLayout/>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginAndRegister />} />
        <Route path="/findInterests" element={<FindInterestsPage />} />
        <Route path="/myInterests" element={<MyInterests />} />
      </Routes>
    </Router>
    </>
  );
}

