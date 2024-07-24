import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { getCircleActiveUsersRequest } from '../../server/circles';

export default function UsersList({ cid }) {
  const [users, setUsers] = React.useState([{}, {}, {}]);

  React.useEffect(() => {
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
          <ListItem alignItems="flex-start">
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
            <Divider variant="fullWidth" component="li" />
            : null,
        ])}
    </List>
  );
}
