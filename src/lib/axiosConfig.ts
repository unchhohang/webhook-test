
import axios from 'axios';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

// You can use an env variable here too
axios.defaults.baseURL =
  'https://brantlee-nondegrading-shrinkingly.ngrok-free.dev/';
axios.defaults.withCredentials = true;

export default axios;
