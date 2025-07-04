import { useEffect, useState } from 'react';
import { Course } from '../models/course';
import { services } from '../services';
import { GalleryTemplate } from '../templates/gallery-template';
import { useDrawer } from '../contexts/drawer-context';
import { Profile } from '../components/user';
import { IconFolder } from '../icons/icon-folder';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Section } from '../models/section';
import { Lesson } from '../models/lesson';
import { useAuth } from '../hooks/auth';
import { useTranslation } from 'react-i18next';
import { config } from '../config';

export const AdminCoursesPage = ({ pathname }: { pathname: string }) => {
  const navigate = useNavigate();
  const drawer = useDrawer();
  const auth = useAuth();
  const translation = useTranslation();
  const location = useLocation();
  const { '*': params } = useParams();

  const [course_id, section_id, lesson_id] = params?.split('/') ?? [];
  const [courses, setCourses] = useState<Course[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const getAllCourses = async () => {
    const response = await services.courses.get();
    setCourses(response);
  };

  const getAllSections = async () => {
    const response = await services.sections.get({ course_id });
    setSections(response);
  };

  const getAllLessons = async () => {
    const response = await services.lessons.get({ course_id, section_id });
    setLessons(response);
  };

  const validate = async () => {
    const allowed_roles = ['admin_major'];
    await auth.validate();

    const is_authorized = auth.me.roles.some((role) => allowed_roles.includes(role.name));
    if (!is_authorized) navigate('/login');
  };

  useEffect(() => {
    if (auth.me.is_active) validate();
  }, []);

  useEffect(() => {
    if (!course_id && !section_id && !lesson_id) getAllCourses();
  }, [course_id, section_id, lesson_id]);

  useEffect(() => {
    if (course_id && !section_id && !lesson_id) getAllSections();
  }, [course_id, section_id, lesson_id]);

  useEffect(() => {
    if (course_id && section_id && !lesson_id) getAllLessons();
  }, [course_id, section_id, lesson_id]);

  if (course_id && section_id) {
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
              onClick: () => navigate(location.pathname),
              is_active: true,
            },

            {
              title: translation.t('admin.courses.navbar.enrollments'),
              onClick: () => navigate(config.pages.admin.enrollments),
            },
          ],
        }}
        breadcrumbs={[
          { content: 'Cursos', onClick: () => navigate(`${pathname}`) },
          { content: 'Secciones', onClick: () => navigate(`${pathname}/${course_id}`) },
          { content: 'Lecciones', is_active: true },
        ]}
        items={lessons.map((lesson) => ({
          title: lesson.title,
          description: lesson.description,
          src: lesson.thumbnail_url,
          onClick: () =>
            drawer.fire({
              content: (
                <div className="flex flex-col h-full w-full gap-4">
                  <header className="flex flex-col justify-center items-center gap-2 w-full">
                    <h2>{lesson.title}</h2>

                    <div
                      onClick={() => navigate(`${pathname}/${course_id}/${section_id}/${lesson_id}`)}
                      className="flex gap-2 w-full justify-center items-center"
                    >
                      <IconFolder />
                    </div>
                  </header>

                  <main className="flex flex-col justify-center items-center gap-2 w-full">
                    <p>{lesson.description}</p>
                  </main>
                </div>
              ),
            }),
        }))}
      />
    );
  }

  if (course_id) {
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
              onClick: () => navigate(location.pathname),
              is_active: true,
            },

            {
              title: translation.t('admin.courses.navbar.enrollments'),
              onClick: () => navigate(config.pages.admin.enrollments),
            },
          ],
        }}
        breadcrumbs={[
          { content: 'Cursos', onClick: () => navigate(pathname) },
          { content: 'Secciones', is_active: true },
          { content: 'Lecciones', is_disabled: true },
        ]}
        items={sections.map((section) => ({
          title: section.title,
          description: section.description,
          src: section.thumbnail_url,
          onClick: () =>
            drawer.fire({
              content: (
                <div className="flex flex-col h-full w-full gap-4">
                  <header className="flex flex-col justify-center items-center gap-2 w-full">
                    <h2>{section.title}</h2>

                    <div
                      onClick={() => navigate(`${pathname}/${course_id}/${section.id}`)}
                      className="flex gap-2 w-full justify-center items-center"
                    >
                      <IconFolder />
                    </div>
                  </header>

                  <main className="flex flex-col justify-center items-center gap-2 w-full">
                    <p>{section.description}</p>
                  </main>
                </div>
              ),
            }),
        }))}
      />
    );
  }

  return (
    <GalleryTemplate
      navbar={{
        user: auth.me,
        allowed_roles: ['admin_major'],
        links: [
          {
            title: translation.t('admin.courses.navbar.home'),
            onClick: () => navigate(config.pages.admin.home),
          },

          {
            title: translation.t('admin.courses.navbar.courses'),
            onClick: () => navigate(location.pathname),
            is_active: true,
          },

          {
            title: translation.t('admin.courses.navbar.enrollments'),
            onClick: () => navigate(config.pages.admin.enrollments),
          },
        ],
      }}
      breadcrumbs={[
        { content: 'Cursos', is_active: true },
        { content: 'Secciones', is_disabled: true },
        { content: 'Lecciones', is_disabled: true },
      ]}
      items={courses.map((course) => ({
        title: course.title,
        description: course.description,
        src: course.thumbnail_url,
        onClick: () =>
          drawer.fire({
            content: (
              <div className="flex flex-col h-full w-full gap-2">
                <header className="flex flex-col justify-center items-center gap-2 w-full">
                  <h2>{course.title}</h2>
                  <Profile name={course.author.name} src={course.author.avatar_url} />

                  <div
                    onClick={() => navigate(`${pathname}/${course.id}`)}
                    className="flex gap-2 w-full justify-center items-center"
                  >
                    <IconFolder />
                  </div>
                </header>
              </div>
            ),
          }),
      }))}
    />
  );
};
