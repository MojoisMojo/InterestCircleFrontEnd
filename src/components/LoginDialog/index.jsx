// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { useState, useContext } from 'react';
// import { loginRequest, registerRequest } from '../../utils/loginAndregistration'
// import UserContext from '../../context/UserContext'

// export default function FormDialog() {
//   const [open, setOpen] = React.useState(false);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { currUser, setCurrUser } = useContext(UserContext);
//   function emailValidation(email) {
//     const re = /\S+@\S+\.\S+/;
//     return re.test(email);
//   }

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   async function handleSubmit(event) {
//     event.preventDefault()
//     if (!email || !emailValidation(email)) {
//       alert('请输入有效的邮箱地址');
//       return;
//     }
//     if (!password) {
//       alert('请输入密码');
//       return;
//     }
//     setPassword('');
//     let res = await loginRequest(email, password);
//     if (res.status !== 'success') {
//       alert(res.msg);
//       return;
//     }
//     // else
//     console.log(res.msg);
//     setCurrUser(res.data.user);
//     console.log(res.data.user);
//     navigate('/');
//   };
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open form dialog
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           component: 'form',
//           onSubmit: (event) => {
//             event.preventDefault();
//             const formData = new FormData(event.currentTarget);
//             const formJson = Object.fromEntries(formData.entries());
//             const email = formJson.email;
//             console.log(email);
//             handleClose();
//           },
//         }}
//       >
//         <DialogTitle>Subscribe</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To subscribe to this website, please enter your email address here. We
//             will send updates occasionally.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="name"
//             name="email"
//             label="Email Address"
//             type="email"
//             fullWidth
//             variant="standard"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button type="submit">Subscribe</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }
