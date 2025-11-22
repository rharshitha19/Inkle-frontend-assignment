import axios from 'axios';

const BASE_URL = 'https://685013d7e7c42cfd17974a33.mockapi.io';

export const api = {
  // Get all tax records
  getTaxes: () => axios.get(`${BASE_URL}/taxes`),
  
  // Update a tax record
  updateTax: (id, data) => axios.put(`${BASE_URL}/taxes/${id}`, data),
  
  // Get countries list
  getCountries: () => axios.get(`${BASE_URL}/countries`)
};