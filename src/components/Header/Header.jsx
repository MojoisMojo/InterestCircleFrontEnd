import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { static_empty_user } from '../../assets/static';
import { logoutRequest } from '../../request/loginAndregistration';
import { BellIcon } from '@heroicons/react/20/solid';


// 最好改成这样 https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu
// https://mui.com/material-ui/react-menu/
const barNavigation = [
  { name: '发现圈子', href: '/home' },
  { name: '联系我们', href: '/aboutus' },
]
const userNavigation = [
  { name: '我的贴子', href: '/myPosts' },
  { name: '我的圈子', href: '/myCircles' },
  { name: '个人设置', href: '/mySettings' },
]

const loginNavigation = { name: '登录', href: '/login' }

const logoutNavigation = { name: '登出', href: '/login' }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const BellButton = ({ className }) => {
  return (
    <button
      type="button"
      className={`${className} \
relative rounded-full bg-gray-700 p-1 text-gray-400 \
hover:text-white \
focus:outline-none focus:ring-2 focus:ring-white \
focus:ring-offset-2 focus:ring-offset-gray-700`}
    > {/* bell button */}
      <span className="absolute -inset-1.5" />
      <span className="sr-only">View notifications</span>
      <BellIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currUser, setCurrUser } = useContext(UserContext);

  const isActive = (path) => location.pathname === path;
  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-700">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-[1980px] px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <button className="flex items-center" onClick={(e) => { navigate('/home'); return; }}>
                    <div className="flex-shrink-0"
                    > {/** logo */}
                      <img
                        className="h-8 w-8"
                        src="/logo.svg"
                        alt="Your Company"
                      />
                    </div>
                    <div className=
                      "ml-4 flex items-baseline \
                    text-gray-300 text-lg font-bold font-serif"> {/** name */}
                      Interests Circle
                    </div>
                  </button>
                  <div className="hidden md:block"> {/** nav button */}
                    <div className="ml-10 flex items-baseline space-x-4 font-bold">
                      {barNavigation.map((item) => (
                        <button
                          key={item.name}
                          onClick={(e) => { navigate(item.href); return; }}
                          className={classNames(
                            isActive(item.href)
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                          aria-current={isActive(item.href) ? 'page' : undefined}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6"> {/* PC menu buttons */}
                    <div className={!!currUser.uid ? 'flex' : 'hidden'}>
                      <BellButton />
                      <Menu as="div" className="relative ml-3"> {/* Profile dropdown */}
                        <div>
                          <MenuButton className=
                            "relative flex max-w-xs items-center rounded-full bg-gray-700 text-sm \
                          focus:outline-none focus:ring-2 focus:ring-white \
                          focus:ring-offset-2 focus:ring-offset-gray-700">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={currUser.avatarUrl} alt="" />
                          </MenuButton>
                        </div>
                        <MenuItems
                          transition
                          className=
                          "absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md \
                          bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition \
                          focus:outline-none \
                          data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 \
                          data-[enter]:duration-100 data-[leave]:duration-75 \
                          data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          {userNavigation.map((item) => (
                            <MenuItem key={item.name}>
                              {({ focus }) => (
                                <button
                                  onClick={(e) => {
                                    navigate(item.href);
                                    return;
                                  }}
                                  className={classNames(
                                    focus ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700 text-center w-full',
                                  )}
                                >
                                  {item.name}
                                </button>
                              )}
                            </MenuItem>
                          ))}
                          <MenuItem key={logoutNavigation.name}>
                            {({ focus }) => (
                              <button onClick={(e) => {
                                setCurrUser(static_empty_user);
                                logoutRequest();
                                navigate(logoutNavigation.href);
                              }}
                                className={classNames(
                                  focus ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700 text-center w-full',
                                )}
                              >
                                {logoutNavigation.name}
                              </button>
                            )}
                          </ MenuItem>
                        </MenuItems>
                      </Menu>
                    </div>
                    <div className={!currUser.uid ? 'flex' : 'hidden'}>
                      <button
                        onClick={(e) => { navigate(loginNavigation.href); return; }}
                        className={classNames(
                          'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                        aria-current={undefined}
                      >
                        {loginNavigation.name}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="-mr-2 flex md:hidden"> {/* Mobile menu button */}
                  <DisclosureButton className=
                    "relative inline-flex items-center justify-center \
                    rounded-md bg-gray-700 p-2 text-gray-400 \
                    hover:bg-gray-700 hover:text-white \
                    focus:outline-none focus:ring-2 \
                    focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <DisclosurePanel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3"> {/** part 1 */}
                {barNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    onClick={(e) => {
                      navigate(item.href); return;
                    }}
                    className={classNames(
                      item.current ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4"> {/** part 2 */}
                <div className={classNames(!!currUser.uid ? 'flex px-5' : 'hidden', "items-center")}>
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={currUser.avatarUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{currUser.name}</div>
                    <div style={{ marginTop: '0.5rem' }}></div>
                    <div className="text-sm font-medium leading-none text-gray-400">{currUser.email}</div>
                  </div>
                  <BellButton className="ml-auto flex-shrink-0" />
                </div>
                <div className="space-y-1 px-2">
                  <div className={!!currUser.uid ? 'mt-3 block' : 'hidden'}>
                    {userNavigation.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        onClick={(e) => {
                          navigate(item.href);
                          return;
                        }}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 \
                        hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                    <DisclosureButton
                      key={logoutNavigation.name}
                      onClick={(e) => {
                        setCurrUser(static_empty_user);
                        logoutRequest();
                        navigate(logoutNavigation.href);
                      }}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 \
                      hover:bg-gray-700 hover:text-white"
                    >
                      {logoutNavigation.name}
                    </DisclosureButton>
                  </div>
                  <div className={!currUser.uid ? 'block' : 'hidden'}>
                    <DisclosureButton
                      className=
                      "block rounded-md px-3 py-2 text-base font-medium text-gray-400 \
                      hover:bg-gray-700 hover:text-white"
                      key={loginNavigation.name}
                      onClick={(e) => {
                        navigate(loginNavigation.href);
                      }}
                    >
                      {loginNavigation.name}
                    </DisclosureButton>
                  </div>
                </div>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
