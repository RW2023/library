import { FC } from 'react';
import AddBookForm from '@/app/components/forms/AddBookForm';
import BooksList from '@/app/components/BookList';
import Heading from '../components/ui/Heading';

interface Props {}

const page: FC<Props> = (): JSX.Element => {
  return (
    <div>
     <Heading title='DevDash' />
      <AddBookForm />
      <BooksList />
    </div>
  );
};

export default page;