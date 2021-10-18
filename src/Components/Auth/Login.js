// import React from 'react';

// import { GoogleLogin } from 'react-google-login';
// // refresh token
// import { refreshTokenSetup } from '../Utils/refreshToken';
// import { setCookie } from '../Utils/Utils';

// const clientId =
//   '1063172906853-5j0q99bf26aq69rq0mt321qbphfau8j2.apps.googleusercontent.com';
  

// function Login() {
//   const onSuccess = (res) => {
//     setCookie("Amit","1");
//     refreshTokenSetup(res);
//     window.location.reload();
//   };

//   const onFailure = (res) => {
//     console.log('Login failed: res:', res);
//     alert(
//       `Failed to login.${res}`
//     );
//   };

//   return (
//     <div>
//       <GoogleLogin
//         clientId={clientId}
//         buttonText="Login"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         cookiePolicy={'single_host_origin'}
//         style={{ marginTop: '100px' }}
//         isSignedIn={true}
//       />
//     </div>
//   );
// }

// export default Login;
