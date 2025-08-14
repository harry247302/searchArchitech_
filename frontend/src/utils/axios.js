import axios from 'axios';



// console.log(process.env.NEXT_PUBLIC_DEV_URL)
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MODE=="DEV"? process.env.NEXT_PUBLIC_DEV_URL: process.env.NEXT_PUBLIC_PROD_URL ,
  withCredentials: true, // ✅ This is critical for sending cookies
});

export default instance;