import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { getCircleActiveUsersRequest } from '../../request/circles';

export default function UsersList({ cid }) {
  const [users, setUsers] = React.useState([{ uid: 1 }, { uid: 2 }, { uid: 3 }]);

  React.useEffect(() => {
    if (!cid) {
      return;
    }
    getCircleActiveUsersRequest(cid).then((res) => {
      if (res.status !== 'success') {
        alert(res.msg);
        return;
      }
      setUsers(res.data.users);
    })
  }, [cid]);
  return (
    <List sx={{ width: '100%', p: 0 }}>
      {
        users.slice(0, 6).flatMap((user, index) => [
          <ListItem
            alignItems="flex-start"
            key={user.uid}
          >
            <ListItemAvatar sx={{ display: { xs: 'none', sm: 'flex' } }} >
              <Avatar alt={user.name} src={user.avatarUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={
                <React.Fragment>
                  {user.bio}
                </React.Fragment>
              }
            />
          </ListItem>,
          index < users.length - 1 ?
            <Divider key={`divider-${user.uid}`} variant="fullWidth" component="li" />
            : null,
        ])}
    </List>
  );
}
