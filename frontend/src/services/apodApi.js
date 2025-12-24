import axios from "axios";

// const BASE_URL = "http://localhost:5001/api/apod";
const BASE_URL = "https://your-backend.onrender.com/api/apod";


async function http(path) {
  const res = await fetch(path);
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`HTTP ${res.status}: ${msg}`);
  }
  return res.json();
}

export const getToday = () => http(`${BASE_URL}/today`);
export const getByDate = (date) => http(`${BASE_URL}/${date}`);
export const getRecent = () => http(`${BASE_URL}/recent`);
// export function getRecent(count = 10) {
//   return axios.get(`${BASE_URL}/apod/recent?count=${count}`);
// }

export const getRange = (start, end) =>
  http(`${BASE_URL}/range?start_date=${start}&end_date=${end}`);
