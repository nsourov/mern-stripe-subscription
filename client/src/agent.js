import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const getPlans = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const processPayment = async body => {
  const res = await axios.post(`${API}/processPayment`, body);
  return res;
};
