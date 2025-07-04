import { useState } from 'react';
import { Button } from '../components/button';
import { Form } from '../components/form';
import { Input } from '../components/input';
import { Textarea } from '../components/textarea';
import { Lesson } from '../models/lesson';

export const FormLesson = ({
  title,
  section_id,
  lesson,
  onSubmit,
  button,
}: {
  title: string;
  section_id: string,
  lesson?: Lesson;
  onSubmit: ({ lesson }: { lesson: Lesson }) => void;
  button: string;
}) => {
  const [newTitle, setNewTitle] = useState(lesson?.title || '');
  const [newDescription, setNewDescription] = useState(lesson?.description || null);
  const [newDisplayOrder, setNewDisplayOrder] = useState(String(lesson?.display_order || 1));
  const [newDurationSeconds, setNewDurationSeconds] = useState(String(lesson?.duration_seconds || 1));
  const [newResourceUrl, setNewResourceUrl] = useState(String(lesson?.resource_url || null));

  const handleSubmit = () => {
    const newLesson: Lesson = {
      id: lesson?.id ?? '',
      title: newTitle,
      section_id: section_id,
      description: newDescription,
      thumbnail_url: lesson?.thumbnail_url || null,
      background_url: lesson?.background_url || null,
      display_order: Number(newDisplayOrder),
      duration_seconds: Number(newDurationSeconds),
      resource_url: newResourceUrl,
      is_unlocked: true


    };

    onSubmit({ lesson: newLesson });
  };

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <header className="flex flex-col w-full">
        <h2 className="text-center">{title}</h2>
      </header>

      <main className="flex flex-col gap-2 w-full">
        <Input placeholder='Título' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />

        <Textarea placeholder='Descripción' value={newDescription ?? ''} onChange={(e) => setNewDescription(e.target.value)} />
        <Input placeholder='Posición' value={newDisplayOrder} onChange={(e) => setNewDisplayOrder(e.target.value)} />
        <Input placeholder='URL' value={newResourceUrl} onChange={(e) => setNewResourceUrl(e.target.value)} />
        <Input placeholder='Tiempo en segundos' value={newDurationSeconds} onChange={(e) => setNewDurationSeconds(e.target.value)} />

      </main>

      <footer className="flex">
        <Button type="submit" className="w-full">
          {button}
        </Button>
      </footer>
    </Form>
  );
};
