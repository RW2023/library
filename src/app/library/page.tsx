import { FC } from 'react';
import BooksList from '../components/BookList';
import Heading from '../components/ui/LightHeading';

interface Props {}

const page: FC<Props> = (props): JSX.Element => {
  return (
    <>
    <Heading title='Library' />
    <BooksList />
    </>
  );
};

export default page;