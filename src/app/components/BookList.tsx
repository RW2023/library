// components/BooksList.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Loading from '@/app/components/ui/Loading';
import SubHeading from '@/app/components/ui/SubHeading';
import LoadingAi from '@/app/components/ui/LoadingAi';

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
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [similarTitles, setSimilarTitles] = useState<{
    [key: number]: string[];
  }>({});

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

  const fetchSimilarTitles = async (bookId: number, title: string) => {
    if (similarTitles[bookId]) return; // Skip if already fetched

    setAiLoading(true);
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Return up to 3 books similar to ${title}? Include the title and author only`,
        }),
      });
      const data = await response.json();
      setSimilarTitles((prev) => ({
        ...prev,
        [bookId]: data.reply.split(', '),
      }));
    } catch (error) {
      console.error('Error fetching similar titles:', error);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    books.forEach((book) => {
      fetchSimilarTitles(book.id, book.title);
    });
  }, [books]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery) ||
      book.author.toLowerCase().includes(searchQuery) ||
      book.genre.toLowerCase().includes(searchQuery),
  );

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4 bg-base-200 m-5 rounded mt-2">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search books..."
          className="input input-bordered input-primary w-full"
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="card card-compact bg-base-300 shadow-xl border"
            >
              <div className="card-body">
                <SubHeading title={`Title: ${book.title}`} />
                <div className="border rounded p-2 my-2">
                  <p className="font-bold">Author: {book.author}</p>
                  <p>Genre: {book.genre}</p>
                  <p className="text-blue-500">ISBN: {book.isbn}</p>
                  <p className="text-success">Format: {book.format}</p>
                </div>
                <div className="rounded p-2 my-2">
                  <SubHeading title="Description" />
                  <p>{book.description}</p>
                </div>
                <div className="bg-base-100 rounded p-2 my-2 border border-1 mb-3">
                  <div className="border border-1">
                    <SubHeading title="Similar Titles" />
                  </div>
                  {aiLoading ? (
                    <LoadingAi />
                  ) : (
                    <ul className="list-none pl-5">
                      {similarTitles[book.id] &&
                        similarTitles[book.id].map((title, index) => (
                          <li key={index} className="text-sm flex flex-col">
                            {title}
                          </li>
                        ))}
                    </ul>
                  )}
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
