import React from 'react';
import { Mail, Send, Inbox, Star, Trash2, Edit } from 'lucide-react';

interface Email {
  id: string;
  subject: string;
  from: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
}

const mockEmails: Email[] = [
  {
    id: '1',
    subject: 'Welcome to Email Explorer!',
    from: 'teacher@school.com',
    preview: 'Learn how to write and manage emails effectively...',
    date: '2025-04-15',
    read: false,
    starred: false
  },
  {
    id: '2',
    subject: 'Your First Email Challenge',
    from: 'challenges@emailquest.com',
    preview: 'Complete this challenge to earn stars...',
    date: '2025-04-14',
    read: true,
    starred: true
  }
];

function EmailExplorer() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-indigo-600">Email Explorer</h1>
        <p className="mt-2 text-indigo-600/80">Learn to communicate! 📧</p>
      </header>

      {/* Email Interface */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Compose
          </button>

          <div className="mt-6 space-y-2">
            <button className="w-full px-4 py-2 text-left rounded-xl bg-indigo-50 text-indigo-700 flex items-center gap-2">
              <Inbox className="w-4 h-4" />
              Inbox
            </button>
            <button className="w-full px-4 py-2 text-left rounded-xl hover:bg-gray-50 text-gray-700 flex items-center gap-2">
              <Send className="w-4 h-4" />
              Sent
            </button>
            <button className="w-full px-4 py-2 text-left rounded-xl hover:bg-gray-50 text-gray-700 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Starred
            </button>
            <button className="w-full px-4 py-2 text-left rounded-xl hover:bg-gray-50 text-gray-700 flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Trash
            </button>
          </div>
        </div>

        {/* Email List */}
        <div className="md:col-span-3 bg-white rounded-3xl p-6 shadow-lg">
          <div className="space-y-4">
            {mockEmails.map((email) => (
              <div
                key={email.id}
                className={`p-4 rounded-xl transition-colors ${
                  email.read ? 'bg-gray-50' : 'bg-indigo-50'
                } hover:bg-gray-100 cursor-pointer`}
              >
                <div className="flex items-start gap-4">
                  <button className={`mt-1 ${
                    email.starred ? 'text-yellow-500' : 'text-gray-400'
                  }`}>
                    <Star className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${
                        email.read ? 'text-gray-700' : 'text-indigo-700'
                      }`}>
                        {email.subject}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {new Date(email.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{email.from}</p>
                    <p className="text-sm text-gray-500 mt-2">{email.preview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coming Soon Features */}
      <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4">Coming Soon!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <h3 className="font-medium mb-2">Email Templates</h3>
            <p className="text-sm opacity-90">Learn to write professional emails with guided templates.</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <h3 className="font-medium mb-2">Writing Challenges</h3>
            <p className="text-sm opacity-90">Complete email writing challenges to earn stars.</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <h3 className="font-medium mb-2">Email Etiquette</h3>
            <p className="text-sm opacity-90">Learn best practices for email communication.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailExplorer;