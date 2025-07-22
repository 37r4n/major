import axios from 'axios';
import Cookies from 'js-cookie';
import { useToast } from '../contexts/toast-context';

export const ApiInterceptor = () => {
  const toast = useToast();

  axios.interceptors.request.use(function (request) {
    if (request.url?.includes('assets') || request.headers?.Authorization) {
      return request;
    }

    const access_token = Cookies.get('access_token');
    request.headers.set('Authorization', access_token);
    request.headers.set('Content-Type', 'application/json');
    return request;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.data?.error?.message) {
        if(error.status) window.location.href = '/login';


        toast.fire({
          title: 'Error',
          description: error.response.data.error.message,
          color: 'danger',
        });
      }

      return Promise.resolve(error.response.data.data);
    },
  );
};
