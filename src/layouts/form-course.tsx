import { useState } from 'react';
import { Autocomplete } from '../components/autocomplete';
import { Avatar } from '../components/avatar';
import { Button } from '../components/button';
import { Form } from '../components/form';
import { Input } from '../components/input';
import { Textarea } from '../components/textarea';
import { Course } from '../models/course';
import { User } from '../models/user';

export const FormCourse = ({
  title,
  course,
  onSubmit,
  button,
  authors,
}: {
  title: string;
  course?: Course;
  onSubmit: ({ course }: { course: Course }) => void;
  button: string;
  authors: User[];
}) => {
  const [newTitle, setNewTitle] = useState(course?.title || '');
  const [newDescription, setNewDescription] = useState(course?.description || null);
  const [newManualUrl, setNewManualUrl] = useState(course?.manual_url || null);
  const [newAuthor, setNewAuthor] = useState(
    course?.author || {
      id: '',
      name: '',
      avatar_url: '',
    },
  );

  const handleSubmit = () => {
    const newCourse: Course = {
      id: course?.id ?? '',
      title: newTitle,
      description: newDescription,
      thumbnail_url: course?.thumbnail_url || null,
      background_url: course?.background_url || null,
      manual_url: newManualUrl,

      author: {
        id: newAuthor.id,
        name: newAuthor.name,
        avatar_url: newAuthor.avatar_url,
      },
    };

    onSubmit({ course: newCourse });
  };

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <header className="flex flex-col w-full">
        <h2 className="text-center">{title}</h2>
      </header>

      <main className="flex flex-col gap-2 w-full">
        <Input placeholder="Título" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />

        <div className="flex gap-2">
          <Autocomplete
            placeholder="Autor"
            defaultSelectedKey={newAuthor.id}
            onSelectionChange={(value) => {
              const selectedAuthor = authors.find((a) => a.id === value);
              if (selectedAuthor) setNewAuthor(selectedAuthor);
            }}
            name="input-new-enrollment"
            items={authors.map((author) => ({
              key: author.id,
              label: `${author.code} - ${author.name}`,
            }))}
          />

          <Avatar src={newAuthor.avatar_url} />
        </div>

        <Textarea
          placeholder="Descripción"
          value={newDescription ?? ''}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <Input
          placeholder="URL de manual"
          value={newManualUrl ?? ''}
          onChange={(e) => setNewManualUrl(e.target.value)}
        />
      </main>

      <footer className="flex">
        <Button type="submit" className="w-full">
          {button}
        </Button>
      </footer>
    </Form>
  );
};
