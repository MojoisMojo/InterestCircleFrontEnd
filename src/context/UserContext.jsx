import React from 'react';
import { static_empty_user } from '../assets/static';

const UserContext = React.createContext({...static_empty_user});

export default UserContext;