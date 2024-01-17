//src/app/components/forms/AddBookForm.tsx
'use client';
import React, { useState, FormEvent } from 'react';
import { supabase } from '@/utils/supabaseClient'; // Ensure this is the correct path

type BookFormData = {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  format: string;
  genre: string;
  published_year?: number;
  cover_image_url: string;
  description: string;
};

const AddBookForm: React.FC = () => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    isbn: '',
    format: '',
    genre: '',
    published_year: undefined,
    cover_image_url: '',
    description: '',
  });
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(''); // State for the message
  const [isError, setIsError] = useState<boolean>(false); // State for the error status

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
    });
  };

  const handleModeToggle = () => {
    setIsUpdateMode(!isUpdateMode);
    setFormData({
      // Reset form data when mode changes
      title: '',
      author: '',
      isbn: '',
      format: '',
      genre: '',
      published_year: undefined,
      cover_image_url: '',
      description: '',
    });
  };

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsError(false); // Reset error state
  setMessage(''); // Clear previous messages

  try {
    const { data, error } = isUpdateMode
      ? await supabase.from('books').update(formData).eq('id', formData.id)
      : await supabase.from('books').insert([formData]);

    if (error) throw error;

    setMessage(
      isUpdateMode ? 'Book updated successfully!' : 'Book added successfully!',
    );
    setFormData({
      title: '',
      author: '',
      isbn: '',
      format: '',
      genre: '',
      published_year: undefined,
      cover_image_url: '',
      description: '',
    });
  } catch (error) {
    setIsError(true);
    if (error instanceof Error) {
      setMessage('Error submitting book data: ' + error.message);
    } else {
      setMessage('An unknown error occurred');
    }
  }
};

  return (
    <div className="card bg-base-300 shadow-xl p-4 w-3/4 mx-auto border border-1 rounded-md">
      {/* Feedback message */}
      {message && (
        <div
          className={`p-3 my-2 text-sm ${
            isError ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-control">
        {/* Title Field */}
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

        {/* Author Field */}
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

        {/* ISBN Field */}
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

        {/* Genre Field */}
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

        {/* Format Field */}
        <label className="label">
          <span className="label-text">Format</span>
        </label>
        <input
          type="text"
          name="format"
          placeholder="Format"
          value={formData.format}
          onChange={handleChange}
          className="input input-bordered"
        />

        {/* Published Year Field */}
        <label className="label">
          <span className="label-text">Published Year</span>
        </label>
        <input
          type="number"
          name="published_year"
          placeholder="Published Year"
          value={formData.published_year}
          onChange={handleChange}
          className="input input-bordered"
        />

        {/* Cover Image URL Field */}
        <label className="label">
          <span className="label-text">Cover Image URL</span>
        </label>
        <input
          type="text"
          name="cover_image_url"
          placeholder="Cover Image URL"
          value={formData.cover_image_url}
          onChange={handleChange}
          className="input input-bordered"
        />

        {/* Description Field */}
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered"
        ></textarea>

        {/* Submit Button */}
        <div className="form-action mt-4">
          <button type="submit" className="btn btn-primary">
            {isUpdateMode ? 'Update Book' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
