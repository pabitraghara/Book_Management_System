import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import BookForm from "./BookForm";
import toast, { Toaster } from "react-hot-toast";

const BookList = ({ showMyBooks = false }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [viewingBook, setViewingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, [showMyBooks]);

  const fetchBooks = async () => {
    setLoading(true);
    setError("");

    try {
      const endpoint = showMyBooks
        ? "/books/api/v1/all-books?my=true"
        : "/books/api/v1/all-books";
      const response = await axios.get(endpoint);
      setBooks(response.data);
    } catch (err) {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchBooks();
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`/books/api/v1/search?q=${searchTerm}`);
      setBooks(response.data);
    } catch (err) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleView = (book) => {
    setViewingBook(book);
  };

  const handleDelete = async (book) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }

    try {
      await axios.delete(`/books/api/v1/${book.id}`);
      toast.success("Successfully Deleted!");

      fetchBooks();
    } catch (err) {
      setError("Failed to delete book");
    }
  };

  const handleFormSuccess = () => {
    setEditingBook(null);
    fetchBooks();
  };

  const BookDetailView = ({ book, onClose }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "available":
          return "bg-green-100 text-green-800";
        case "borrowed":
          return "bg-yellow-100 text-yellow-800";
        case "reserved":
          return "bg-blue-100 text-blue-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Book Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div>
              {book.coverImage && (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full max-w-md mx-auto h-96 object-cover rounded-lg shadow-md mb-6"
                />
              )}

              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h3>
                <p className="text-lg text-gray-600 mb-4">by {book.author}</p>

                <div className="flex justify-center lg:justify-start">
                  <span
                    className={`px-4 py-2 text-sm rounded-full ${getStatusColor(
                      book.status
                    )}`}
                  >
                    {book.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Book Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">ISBN</p>
                    <p className="text-sm text-gray-900">{book.isbn}</p>
                  </div>

                  {book.genre && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Genre</p>
                      <p className="text-sm text-gray-900">{book.genre}</p>
                    </div>
                  )}

                  {book.publishedYear && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Published Year
                      </p>
                      <p className="text-sm text-gray-900">
                        {book.publishedYear}
                      </p>
                    </div>
                  )}

                  {book.publisher && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Publisher
                      </p>
                      <p className="text-sm text-gray-900">{book.publisher}</p>
                    </div>
                  )}

                  {book.pages && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pages</p>
                      <p className="text-sm text-gray-900">{book.pages}</p>
                    </div>
                  )}

                  {book.language && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Language
                      </p>
                      <p className="text-sm text-gray-900">{book.language}</p>
                    </div>
                  )}
                </div>
              </div>

              {book.description && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button onClick={onClose} className="btn btn-primary px-8">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (editingBook) {
    return (
      <BookForm
        book={editingBook}
        onSuccess={handleFormSuccess}
        onCancel={() => setEditingBook(null)}
      />
    );
  }

  if (viewingBook) {
    return (
      <BookDetailView book={viewingBook} onClose={() => setViewingBook(null)} />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {showMyBooks ? "My Books" : "All Books"}
        </h2>

        <form onSubmit={handleSearch} className="mt-4 sm:mt-0">
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search books..."
              className="form-input rounded-r-none"
            />
            <button type="submit" className="btn btn-primary rounded-l-none">
              Search
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-600">Loading books...</div>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {showMyBooks
              ? "You haven't added any books yet."
              : "No books found."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <BookCard
              key={book.isbn || index}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
