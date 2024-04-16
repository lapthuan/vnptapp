import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://10.91.12.50";

export const socket = io(URL, {
  autoConnect: false
});