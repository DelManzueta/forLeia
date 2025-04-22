import React, { useState } from 'react';
import { 
  CheckSquare, 
  Calendar, 
  Clock, 
  Star, 
  Plus,
  Tag,
  Filter,
  Search,
  MoreVertical,
  Trash2,
  Palette,
  Book,
  Heart,
  Code,
  Music,
  Brain
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  completed: boolean;
  starReward?: number;
}

const categories = [
  { id: 'art', label: 'Art', icon: Palette, color: 'from-rose-400 to-rose-500' },
  { id: 'reading', label: 'Reading', icon: Book, color: 'from-amber-400 to-amber-500' },
  { id: 'fitness', label: 'Fitness', icon: Heart, color: 'from-red-400 to-red-500' },
  { id: 'coding', label: 'Coding', icon: Code, color: 'from-blue-400 to-blue-500' },
  { id: 'music', label: 'Music', icon: Music, color: 'from-yellow-400 to-yellow-500' },
  { id: 'mindfulness', label: 'Mindfulness', icon: Brain, color: 'from-purple-400 to-purple-500' }
];

function TaskMaster() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: 'Complete Math Homework',
        description: 'Chapter 5 exercises 1-10',
        dueDate: '2025-04-20',
        priority: 'high',
        category: 'reading',
        completed: false,
        starReward: 2
      },
      {
        id: '2',
        title: 'Practice Piano',
        description: 'Practice new song for 30 minutes',
        dueDate: '2025-04-15',
        priority: 'medium',
        category: 'music',
        completed: false,
        starReward: 1
      }
    ];
  });

  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [showStarEarned, setShowStarEarned] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    priority: 'medium',
    category: 'reading',
    completed: false,
    starReward: 1
  });

  const handleAddTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      priority: newTask.priority as 'low' | 'medium' | 'high',
      category: newTask.category || 'reading',
      completed: false,
      starReward: newTask.starReward || 1
    };

    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setShowAddTask(false);
    setNewTask({ priority: 'medium', category: 'reading', completed: false, starReward: 1 });
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        // If completing the task, award stars
        if (!task.completed) {
          const currentBalance = parseInt(localStorage.getItem('bankBalance') || '0');
          const stars = task.starReward || 1;
          localStorage.setItem('bankBalance', (currentBalance + stars).toString());
          setEarnedStars(stars);
          setShowStarEarned(true);
          setTimeout(() => setShowStarEarned(false), 3000);
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'active') return !task.completed;
      return true;
    })
    .filter(task => 
      categoryFilter === 'all' ? true : task.category === categoryFilter
    )
    .filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-teal-600">Task Master</h1>
        <p className="mt-2 text-teal-600/80">Organize your goals! ✅</p>
      </header>

      {/* Star Earned Notification */}
      {showStarEarned && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          ⭐ {earnedStars} {earnedStars === 1 ? 'star' : 'stars'} added to your bank!
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
            <button
              onClick={() => setShowAddTask(true)}
              className="px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const CategoryIcon = categories.find(cat => cat.id === task.category)?.icon || CheckSquare;
          return (
            <div
              key={task.id}
              className={`bg-white rounded-2xl p-4 shadow-lg transition-all ${
                task.completed ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? 'bg-teal-500 border-teal-500'
                      : 'border-gray-300 hover:border-teal-500'
                  }`}
                >
                  {task.completed && <CheckSquare className="w-4 h-4 text-white" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-medium ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    {task.dueDate && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-sm">
                      <Tag className="w-4 h-4" />
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <CategoryIcon className="w-4 h-4" />
                      <span>{categories.find(cat => cat.id === task.category)?.label}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-amber-500">
                      <Star className="w-4 h-4" />
                      <span>+{task.starReward}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No tasks found. Add some tasks to get started!</p>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New Task</h3>
              <button
                onClick={() => setShowAddTask(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MoreVertical className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newTask.title || ''}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter task title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description || ''}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter task description..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate || ''}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Star Reward
                  </label>
                  <select
                    value={newTask.starReward}
                    onChange={(e) => setNewTask({ ...newTask, starReward: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value={1}>1 Star</option>
                    <option value={2}>2 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddTask}
                  className="flex-1 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors font-medium"
                >
                  Add Task
                </button>
                <button
                  onClick={() => setShowAddTask(false)}
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

export default TaskMaster;