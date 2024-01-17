// components/BooksList.tsx
'use client';
// Assuming you have a file that exports an initialized Supabase client
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import LoadingInline from '@/app/components/ui/LoadingInline';

// Define a type for the book
type Book = {
  id: number;
  title: string;
  author: string;
};

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await supabase
          .from('books')
          .select('*');

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

  if (isLoading) return <LoadingInline/>;
  return (
    <div>
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))
      ) : (
        <div>No books found.</div>
      )}
    </div>
  );
};

export default BooksList;
