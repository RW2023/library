// components/AddBookForm.tsx
'use client';
import React, { useState, FormEvent } from 'react';
import {supabase} from '@/utils/supabaseClient'; // Replace with the path to your Supabase client initialization

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

    try {
      const { data, error } = isUpdateMode
        ? await supabase.from('books').update(formData).eq('id', formData.id) // Ensure there's an ID for update operations
        : await supabase.from('books').insert([formData]);

      if (error) throw error;

      console.log('Book data submitted:', data);
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
      console.error('Error submitting book data:', error);
    }
  };

  return (
    <div className="card bg-base-300 shadow-xl p-4 w-3/4 mx-auto border border-1 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {isUpdateMode ? 'Update Book' : 'Add Book'}
        </h2>
        <button onClick={handleModeToggle} className="btn btn-outline">
          {isUpdateMode ? 'Switch to Add Mode' : 'Switch to Update Mode'}
        </button>
      </div>
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
