// const someCommonValues = ['common', 'values'];
const logingUserCookie = "userLoggedIn";

export const getImagePath = (path) => {
   return `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${ path}`;
};

export const getPosterImagePath = (path) => {
   return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${ path}`;
};

export const getServerIP = () => {
   return `192.168.0.109`;
};

export const setCookie = (cvalue) => {
   const d = new Date();
   // d.setTime(d.getTime() + (exdays*24*60*60*1000));
   d.setTime(d.getTime() + (5*60*1000));
   let expires = "expires="+ d.toUTCString();
   document.cookie = logingUserCookie + "=" + cvalue + ";" + expires + ";path=/";
 };

 export const getCookie = () => {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${logingUserCookie}=`);
   if (parts.length === 2) return parts.pop().split(';').shift();
 }

 export const deleteCookie = () => {
   let expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
   document.cookie = logingUserCookie + "=;" + expires + ";path=/";
 };
 