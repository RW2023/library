// components/BooksList.tsx
'use client'
import React, { useState, useEffect } from 'react';
import Loading from '@/app/components/ui/Loading';

// Define a type for the book
type Book = {
  id: number;
  title: string;
  author: string;
};

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/books'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (isLoading) return<Loading />; // Or use your custom <Loading /> component here
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {books.length > 0 ? (
        books.map((book: Book) => (
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
