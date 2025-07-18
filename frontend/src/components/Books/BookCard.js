import React from "react";
import { useAuth } from "../../context/AuthContext";

const BookCard = ({ book, onEdit, onDelete, onView }) => {
  const { user } = useAuth();
  const canModify = user && user.id === book.userId;

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
    <div className="card hover:shadow-lg transition-shadow">
      <div className="card-body">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
          </div>
          {/* <span
            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
              book.status
            )}`}
          >
            {book.status}
          </span> */}
        </div>

        {book.coverImage && (
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-48 object-cover rounded-md mb-3"
          />
        )}

        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong>ISBN:</strong> {book.isbn}
          </p>
          {book.genre && (
            <p>
              <strong>Genre:</strong> {book.genre}
            </p>
          )}
          {book.publishedYear && (
            <p>
              <strong>Published:</strong> {book.publishedYear}
            </p>
          )}
          {book.publisher && (
            <p>
              <strong>Publisher:</strong> {book.publisher}
            </p>
          )}
          {book.pages && (
            <p>
              <strong>Pages:</strong> {book.pages}
            </p>
          )}
          {book.language && (
            <p>
              <strong>Language:</strong> {book.language}
            </p>
          )}
        </div>

        {book.description && (
          <p className="mt-3 text-sm text-gray-700 line-clamp-3">
            {book.description}
          </p>
        )}

        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => onView(book)}
            className="btn btn-secondary flex-1"
          >
            View
          </button>
          {canModify && (
            <>
              <button
                onClick={() => onEdit(book)}
                className="btn btn-primary flex-1"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(book)}
                className="btn btn-danger flex-1"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
