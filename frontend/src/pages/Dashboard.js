import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Navigation from "../components/Layout/Navigation";
import BookList from "../components/Books/BookList";
import BookForm from "../components/Books/BookForm";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("books");

  const renderContent = () => {
    switch (activeTab) {
      case "books":
        return <BookList showMyBooks={false} />;
      case "myBooks":
        return <BookList showMyBooks={true} />;
      case "addBook":
        return <BookForm onSuccess={() => setActiveTab("myBooks")} />;
      default:
        return <BookList showMyBooks={false} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
