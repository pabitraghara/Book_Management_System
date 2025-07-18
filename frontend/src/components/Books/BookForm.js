import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const BookForm = ({ book, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isEditing = !!book;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: book || {},
  });

  useEffect(() => {
    if (book) {
      reset(book);
    }
  }, [book, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    // Remove forbidden properties
    const cleanData = {
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      genre: data.genre,
      description: data.description,
      publishedYear: data.publishedYear,
      status: data.status,
      publisher: data.publisher,
    };

    try {
      if (isEditing) {
        await axios.patch(`/books/api/v1/${book.id}`, cleanData);
        toast.success("Successfully Edited!");
      } else {
        await axios.post("/books/api/v1/add-book", cleanData);
        toast.success("Successfully Created!");
      }
      console.log("data", cleanData);

      onSuccess();
      if (!isEditing) {
        reset();
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-semibold text-gray-900">
          {isEditing ? "Edit Book" : "Add New Book"}
        </h3>
      </div>

      <div className="card-body">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="form-label">
                Title *
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className="form-input"
                placeholder="Enter book title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="author" className="form-label">
                Author *
              </label>
              <input
                id="author"
                type="text"
                {...register("author", { required: "Author is required" })}
                className="form-input"
                placeholder="Enter author name"
              />
              {errors.author && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.author.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="isbn" className="form-label">
                ISBN *
              </label>
              <input
                id="isbn"
                type="text"
                {...register("isbn", { required: "ISBN is required" })}
                className="form-input"
                placeholder="Enter ISBN"
              />
              {errors.isbn && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.isbn.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="genre" className="form-label">
                Genre
              </label>
              <input
                id="genre"
                type="text"
                {...register("genre")}
                className="form-input"
                placeholder="Enter genre"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              {...register("description")}
              className="form-input"
              placeholder="Enter book description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="publishedYear" className="form-label">
                Published Year
              </label>
              <input
                id="publishedYear"
                type="number"
                {...register("publishedYear", {
                  min: { value: 1000, message: "Year must be at least 1000" },
                  max: {
                    value: 2024,
                    message: "Year cannot be greater than 2025",
                  },
                })}
                className="form-input"
                placeholder="2023"
              />
              {errors.publishedYear && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.publishedYear.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                {...register("status")}
                className="form-input"
              >
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>
            <div>
              <label htmlFor="publisher" className="form-label">
                Publisher
              </label>
              <input
                id="publisher"
                type="text"
                {...register("publisher")}
                className="form-input"
                placeholder="Enter publisher"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? "Saving..." : isEditing ? "Update Book" : "Add Book"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
