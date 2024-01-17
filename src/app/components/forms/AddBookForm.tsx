// components/AddBookForm.tsx
'use client';
import React, { useState, FormEvent } from 'react';

// Define a type for the book form data
type BookFormData = {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  description: string;
};

const AddBookForm: React.FC = () => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // API call to add or update the book in your database
    console.log('Submitting book data:', formData);
    // Reset form after submission
    setFormData({
      title: '',
      author: '',
      isbn: '',
      genre: '',
      description: '',
    });
  };

  return (
    <div className="card bg-base-300 shadow-xl p-4 w-3/4 mx-auto border border-1 rounded-md">
      <form onSubmit={handleSubmit} className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered"
        />

        <label className="label">
          <span className="label-text">Author</span>
        </label>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="input input-bordered"
        />

        <label className="label">
          <span className="label-text">ISBN</span>
        </label>
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          className="input input-bordered"
        />

        <label className="label">
          <span className="label-text">Genre</span>
        </label>
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          className="input input-bordered"
        />

        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered h-24"
        ></textarea>

        <div className="form-action mt-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
