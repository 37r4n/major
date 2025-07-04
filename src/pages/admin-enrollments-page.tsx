import React, { useEffect, useState } from 'react';
import { ListTemplate } from '../templates/list-template';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import { config } from '../config';
import { useTranslation } from 'react-i18next';
import { GalleryTemplate } from '../templates/gallery-template';
import { Course } from '../models/course';
import { services } from '../services';
import { IconCreate } from '../icons/icon-create';
import { useDrawer } from '../contexts/drawer-context';
import { Form } from '../components/form';
import { User } from '../models/user';
import { Autocomplete } from '../components/autocomplete';
import { Button } from '../components/button';
import { Enrollment } from '../models/enrollment';
import { Avatar } from '../components/avatar';

export const AdminEnrollmentsPage = ({ pathname }: { pathname: string }) => {
  const auth = useAuth({ allowed_roles: [config.roles.admin] });
  const navigate = useNavigate();
  const translation = useTranslation();
  const location = useLocation();
  const drawer = useDrawer();
  const { '*': params } = useParams();

  const [course_id] = params?.split('/') ?? [];
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const getAllCourses = async () => {
    const response = await services.courses.get();
    setCourses(response);
  };

  const getAllUsers = async () => {
    const response = await services.users.get({ limit: 9999 });
    setUsers(response);
  };

  const getEnrollments = async () => {
    const response = await services.enrollments.get({ course_id });
    setEnrollments(response);
  };

  const createEnrollment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const value = (form.elements.namedItem('input-new-enrollment') as HTMLInputElement)?.value;
    const [code] = value.split(' - ');
    const user = await services.users.first({ id: code });
    await services.enrollments.create({ user_id: user.id, course_id });
    getEnrollments();
  };

  useEffect(() => {
    getAllCourses();
    getAllUsers();
    getEnrollments();
  }, []);

  if (course_id) {
    return (
      <ListTemplate
        navbar={{
          user: auth.me,

          links: [
            {
              title: translation.t('admin.courses.navbar.home'),
              onClick: () => navigate(config.pages.admin.home),
            },

            {
              title: translation.t('admin.courses.navbar.courses'),
              onClick: () => navigate(config.pages.admin.courses),
            },

            {
              title: translation.t('admin.courses.navbar.enrollments'),
              onClick: () => navigate(location.pathname),
              is_active: true,
            },
          ],

          actions: [
            {
              content: <IconCreate />,
              onClick: () =>
                drawer.fire({
                  content: (
                    <Form onSubmit={createEnrollment}>
                      <Autocomplete
                        name="input-new-enrollment"
                        items={users.map((user) => ({
                          key: user.id,
                          label: `${user.code} - ${user.name}`,
                        }))}
                      />

                      <Button type="submit">Crear</Button>
                    </Form>
                  ),
                }),
            },
          ],
        }}
        items={enrollments.map((enrollment) => {
          return {
            left: (
              <div className="flex items-center gap-2 w-full">
                <Avatar src={enrollment.user.avatar_url} />
                <p>{enrollment.user.name}</p>
              </div>
            ),

            center: (
              <div className="flex justify-center items-center">
                <h3>{enrollment.course.title}</h3>
              </div>
            ),
          };
        })}
      />
    );
  }

  return (
    <GalleryTemplate
      navbar={{
        user: auth.me,

        links: [
          {
            title: translation.t('admin.courses.navbar.home'),
            onClick: () => navigate(config.pages.admin.home),
          },

          {
            title: translation.t('admin.courses.navbar.courses'),
            onClick: () => navigate(config.pages.admin.courses),
          },

          {
            title: translation.t('admin.courses.navbar.enrollments'),
            onClick: () => navigate(location.pathname),
            is_active: true,
          },
        ],
      }}
      items={courses.map((course) => ({
        title: course.title,
        description: course.description,
        src: course.thumbnail_url,
        onClick: () => navigate(`${pathname}/${course.id}`),
      }))}
    />
  );
};
