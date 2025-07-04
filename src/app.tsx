import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ApiInterceptor } from './interceptors/api';

export const App = () => {
  ApiInterceptor();

  return <RouterProvider router={router} />;
};
