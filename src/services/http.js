import { http } from "../config/axios.config";

/**
 * @author Andrews
 *
 * Serviço genérico para requisições http
 */
export default {
  getAll: (path) => {
    return http.get(path);
  },

  getById: (path, id) => {
    return http.get(`${path}/${id}`);
  },

  post: (path, payload) => {
    return http.post(path, payload);
  },

  put: (path, payload) => {
    return http.put(path, payload);
  },

  delete: (path, id) => {
    return http.delete(`${path}/${id}`);
  },
};
