import { Button } from '../components/button';
import { Card } from '../components/card';
import { Form } from '../components/form';
import { Image } from '../components/image';
import { Input, InputProps } from '../components/input';
import { Screen } from '../components/screen';

export interface LoginTemplateProps {
  title: string;
  subtitle?: string;
  src: string;
  button: string;
  fields: { username: InputProps };
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginTemplate = ({ title, subtitle, src, fields, onSubmit, button }: LoginTemplateProps) => {
  return (
    <Screen className="flex justify-center items-center">
      <Card className="flex flex-row h-[500px] w-[800px]">
        <Image src={src} className={`w-[60%] object-cover object-right fade-right`} />

        <Form onSubmit={onSubmit} className="flex flex-col justify-center p-[20px] gap-4 flex-1">
          <header className="w-full flex flex-col text-center">
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
          </header>

          <main className="flex flex-col gap-2">
            <Input {...fields?.username} />
          </main>

          <footer className="flex flex-col gap-2">
            <Button type="submit">{button}</Button>
          </footer>
        </Form>
      </Card>
    </Screen>
  );
};
