// components/BooksList.tsx
'use client';
// Assuming you have a file that exports an initialized Supabase client
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import LoadingInline from '@/app/components/ui/LoadingInline';
import SubHeading from '@/app/components/ui/SubHeading';

// Define a type for the book
type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
};

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await supabase.from('books').select('*');

        if (error) throw error;

        setBooks(data || []);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (isLoading) return <LoadingInline />;
  return (
    <div className="container mx-auto p-4 bg-base-200 m-2 rounded ">
      <div className="form-control">
        {/* Assuming you have a form component here */}
        {/* <YourFormComponent /> */}
      </div>
      <div className="divider"></div> {/* Divider line between form and list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border border-1 rounded-md bg-base-200">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="card bg-base-300 shadow-xl">
              <div className="card-body">
                <SubHeading title={` Title: ${book.title}`} />
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>Description: {book.description}</p>
                {/* You can add more book details here */}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No books found.</div>
        )}
      </div>
    </div>
  );
};
export default BooksList;
