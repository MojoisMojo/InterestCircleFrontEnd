import { useState, useContext } from 'react';
import { loginRequest, registerRequest } from '../../request/loginAndregistration.jsx';
import UserContext from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
export default function LoginPage() {
  const [isSign, setIsSign] = useState(true);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currUser, setCurrUser } = useContext(UserContext);
  const navigate = useNavigate();
  function emailValidation(email) {
    const re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return re.test(email);
  }

  function passwordValidation(password) {
    const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
    return re.test(password);
  }

  const handleFormChange = (event) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'nickname':
        setNickname(event.target.value);
        break;
      default:
        break;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!isSign && (!nickname || nickname.length > 7)) {
      alert('昵称长度不得为空或超过7个字符');
      return;
    }
    if (!email || !emailValidation(email)) {
      alert('请输入有效的邮箱地址');
      return;
    }
    if (!password) {
      alert('请输入密码');
      return;
    }
    if (!passwordValidation(password)) {
      alert('密码长度为6-16位，只包含大小写字母和数字，必须至少包含1个大写1个小写字母和1个数字');
      return;
    }
    setPassword('');
    let res = isSign ? await loginRequest(email, password) : await registerRequest(nickname, email, password);
    if (res.status !== 'success') {
      alert(res.msg);
      return;
    }
    // else
    console.log(res.msg);
    setCurrUser(res.data.user);
    navigate('/');
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="/logo.svg"
          alt="complex"
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isSign ? "登录" : "注册"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">


          <div style={{ display: isSign ? 'none' : 'inherit' }}>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              昵称
            </label>
            <div className="mt-2">
              <input
                id="nickname"
                name="nickname"
                type="nickname"
                value={nickname}
                autoComplete="nickname"
                onChange={handleFormChange}
                required
                className="block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              邮箱
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                autoComplete="email"
                onChange={handleFormChange}
                required
                className="block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                密码
              </label>
              <div className="text-sm">
                {
                  isSign
                    ? <a href="/aboutus" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      忘记密码？
                    </a>
                    : <div className="font-semibold text-indigo-600 hover:text-indigo-500">
                      长度6-16位，至少包含大小写字母数字各一个
                    </div>
                }
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={handleFormChange}
                required
                className="block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <button onClick={() => { setIsSign(!isSign); }} className="font-semibold text-indigo-600 hover:text-indigo-500">
                  {isSign ? "没有账号？注册一个！" : "已有账号？登录！"}
                </button>
              </div>
            </div>

          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              {isSign ? "登录" : "注册"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
