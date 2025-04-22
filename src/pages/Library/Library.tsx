import React, { useState, useEffect } from 'react';
import { Book, Star, BookOpen, CheckCircle, Plus, ArrowRight } from 'lucide-react';

interface BookType {
  id: string;
  title: string;
  author: string;
  tags: string[];
  status: 'want-to-read' | 'reading' | 'finished';
  coverUrl: string;
}

const recommendedBooks: BookType[] = [
  {
    id: '1',
    title: "Charlotte's Web",
    author: "E.B. White",
    tags: ["Animals", "Friendship"],
    status: 'want-to-read',
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&h=400"
  },
  {
    id: '2',
    title: "The Boxcar Children",
    author: "Gertrude Chandler Warner",
    tags: ["Mystery", "Adventure"],
    status: 'want-to-read',
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&h=400"
  },
  {
    id: '3',
    title: "Magic Tree House",
    author: "Mary Pope Osborne",
    tags: ["Adventure", "Time Travel"],
    status: 'want-to-read',
    coverUrl: "https://images.unsplash.com/photo-1518112166137-85f9979a43aa?auto=format&fit=crop&w=300&h=400"
  }
];

function Library() {
  const [activeTab, setActiveTab] = useState<'explore' | 'mybooks'>('explore');
  const [showAddBook, setShowAddBook] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    tags: [] as string[],
  });
  const [myBooks, setMyBooks] = useState<BookType[]>(() => {
    const saved = localStorage.getItem('myBooks');
    return saved ? JSON.parse(saved) : [];
  });
  const [starEarned, setStarEarned] = useState(false);

  useEffect(() => {
    localStorage.setItem('myBooks', JSON.stringify(myBooks));
  }, [myBooks]);

  const addToMyBooks = (book: BookType) => {
    if (!myBooks.some(b => b.id === book.id)) {
      setMyBooks([...myBooks, { ...book, status: 'want-to-read' }]);
    }
  };

  const addCustomBook = () => {
    if (!newBook.title.trim()) return;

    const customBook: BookType = {
      id: Date.now().toString(),
      title: newBook.title,
      author: newBook.author,
      tags: newBook.tags,
      status: 'want-to-read',
      coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&h=400"
    };

    setMyBooks([...myBooks, customBook]);
    setNewBook({ title: '', author: '', tags: [] });
    setShowAddBook(false);
  };

  const updateBookStatus = (bookId: string) => {
    setMyBooks(books => books.map(book => {
      if (book.id === bookId) {
        const newStatus = 
          book.status === 'want-to-read' ? 'reading' :
          book.status === 'reading' ? 'finished' :
          'finished';

        // Award stars when book is finished
        if (newStatus === 'finished' && book.status !== 'finished') {
          const currentBalance = parseInt(localStorage.getItem('bankBalance') || '0');
          localStorage.setItem('bankBalance', (currentBalance + 3).toString());
          setStarEarned(true);
          setTimeout(() => setStarEarned(false), 3000);
        }

        return { ...book, status: newStatus };
      }
      return book;
    }));
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-amber-600">Library</h1>
        <p className="mt-2 text-amber-600/80">Discover amazing stories! 📚</p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm">
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'explore'
              ? 'bg-amber-100 text-amber-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Explore Books
        </button>
        <button
          onClick={() => setActiveTab('mybooks')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'mybooks'
              ? 'bg-amber-100 text-amber-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          My Books
        </button>
      </div>

      {/* Star Earned Notification */}
      {starEarned && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          ⭐ 3 stars added to your bank!
        </div>
      )}

      {activeTab === 'explore' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-3">{book.author}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {book.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => addToMyBooks(book)}
                disabled={myBooks.some(b => b.id === book.id)}
                className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                  myBooks.some(b => b.id === book.id)
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-amber-500 text-white hover:bg-amber-600'
                }`}
              >
                {myBooks.some(b => b.id === book.id) ? 'Added to My Books' : 'Add to My Books'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">My Reading List</h2>
            <button
              onClick={() => setShowAddBook(true)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Book
            </button>
          </div>

          {myBooks.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No books yet. Add some from the Explore tab!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {myBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-4"
                >
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{book.title}</h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        book.status === 'finished'
                          ? 'bg-green-100 text-green-700'
                          : book.status === 'reading'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {book.status.replace('-', ' ')}
                      </span>
                      {book.status === 'finished' && (
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-xs font-medium">+3</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => updateBookStatus(book.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm"
                  >
                    Update Status
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Book Modal */}
      {showAddBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Book</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter book title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter author name..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={newBook.tags.join(', ')}
                  onChange={(e) => setNewBook({
                    ...newBook,
                    tags: e.target.value.split(',').map(tag => tag.trim())
                  })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Adventure, Fantasy, etc..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={addCustomBook}
                  className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors font-medium"
                >
                  Add Book
                </button>
                <button
                  onClick={() => setShowAddBook(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Library;