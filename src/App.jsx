import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import MyPostsPage from './pages/MyPostsPage'
import Header from './components/Header/Header';
import LoginPage from './pages/LoginPage/index';
import FindCirclesPage from './pages/FindCirclesPage/index';
import MyCirclePage from './pages/MyCirclePage/index';
import NotFoundPage from './pages/ErrorPages/NotFoundPage';
import CirclePage from './pages/CirclePage';
import AboutusPage from './pages/AboutUsPage';
import { useState, useEffect } from 'react';
import { static_empty_user } from './assets/static'
import UserContext from './context/UserContext'
import Cookie from 'js-cookie';
import { getUserInfoWithUid } from './utils/loginAndregistration';
import TmpApp from './tmp';
import { checkCookie } from './utils/cookie';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // 0
      sm: 600, // 600
      md: 768, // 900
      lg: 1280, // 1280
      xl: 1920, // 1920
    },
  },
});
export default function App() {
  const [currUser, setCurrUser] = useState(static_empty_user)

  function checkLogin(page) {
    if (currUser.uid || Cookie.get('uid')) {
      return page;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  async function checkCookieAndSetUser() {
    let uid = await checkCookie();
    if (uid) {
      console.log('getCookie:', uid);
      let userRes = await getUserInfoWithUid(uid);
      if (userRes.status !== 'success') {
        Cookie.remove('uid');
        alert(userRes.msg);
        return;
      }
      let user = userRes.data.user;
      user.uid = uid;
      setCurrUser(user);
      console.log(user);
    }
  };
  // 使用useEffect确保checkCookieAndSetUser仅在组件挂载时执行一次
  useEffect(() => {
    checkCookieAndSetUser();
  }, []); // 依赖数组为空，意味着仅在组件挂载时执行

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ currUser, setCurrUser }}>
        <div className='scrollElement'>
          <Router>
            <Header />
            <Routes>
              <Route exact path='/' element={<Navigate to="/home" replace />} />
              <Route path="/login" element={currUser.uid ? <Navigate to="/home" replace /> : <LoginPage />} />
              <Route path="/myPosts" element={checkLogin(<MyPostsPage />)} />
              <Route path="findCircles" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={checkLogin(<FindCirclesPage />)} />
              <Route path="/myCircles" element={checkLogin(<MyCirclePage />)} />
              <Route path="/circle" element={checkLogin(<CirclePage />)} />
              <Route path='/aboutus' element={<AboutusPage />} />
              <Route path='/tmp' element={<TmpApp />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Router >
        </div>
      </UserContext.Provider >
    </ThemeProvider>
  );
}

