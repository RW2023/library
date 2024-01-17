// components/BooksList.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient'; // Ensure this is the correct path
import Loading from '@/app/components/ui/Loading'; // Adjust the import path as needed
import SubHeading from '@/app/components/ui/SubHeading'; // Adjust the import path as needed

// Define a type for the book
type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  format: string;
  isbn: string;
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

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4 bg-base-200 m-5 rounded mt-2">
      {/* Book List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-md bg-base-200 border border-1 p-3">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id}
              className="card-compact bg-base-300 shadow-xl border border-1"
            >
              <div className="card-body text-center p-3">
                <SubHeading title={`Title: ${book.title}`} />
                <div className="border border-1 bg-base-200 rounded p-2">
                  <p className="font-bold text-headline">
                    Author: {book.author}
                  </p>
                  <p>Genre: {book.genre}</p>
                  <p className="text-blue-500">ISBN: {book.isbn}</p>
                  <p className="text-success">Format: {book.format}</p>
                </div>
                <div className="bg-base-100 border border-1 rounded m-2 p-2">
                  <SubHeading title="Description" />
                  <p className='text-left'>{book.description}</p>
                </div>
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
