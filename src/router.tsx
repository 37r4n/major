import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages/login-page';
import { AdminCoursesPage } from './pages/admin-courses-page';
import { AdminEnrollmentsPage } from './pages/admin-enrollments-page';
import { config } from './config';
import { PageNotFound } from './pages/page-not-found';
import { UserCoursesPage } from './pages/user-courses-page';
import { HomePage } from './pages/home-page';
import { AdminHomePage } from './pages/admin-home-page';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/', element: <HomePage /> },

  { path: '/courses/*', element: <UserCoursesPage pathname={config.pages.user.courses} /> },

  { path: '/admin/*', element: <AdminHomePage pathname={config.pages.admin.home} /> },
  { path: '/admin/courses/*', element: <AdminCoursesPage pathname={config.pages.admin.courses} /> },
  { path: '/admin/enrollments/*', element: <AdminEnrollmentsPage pathname={config.pages.admin.enrollments} /> },

  { path: '*', element: <PageNotFound /> },
]);
