// components/AddBookForm.tsx
'use client'
import React, { useState, FormEvent } from 'react';

// Define a type for the book form data
type BookFormData = {
  title: string;
  author: string;
  isbn: string;
};

const AddBookForm: React.FC = () => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    isbn: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // API call to add the book to your database
    console.log('Submitting book data:', formData);
    // Reset form (if needed) after submission
    setFormData({
      title: '',
      author: '',
      isbn: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form form-control">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="input input-bordered"
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        className="input input-bordered"
      />
      <input
        type="text"
        name="isbn"
        placeholder="ISBN"
        value={formData.isbn}
        onChange={handleChange}
        className="input input-bordered"
      />
      <button type="submit" className="btn btn-primary">
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
