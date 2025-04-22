import React, { useState, useEffect } from 'react';
import { Plus, Clock, CheckCircle, ArrowRight, Upload, Trash2, PenSquare, Image as ImageIcon } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  status: 'in-progress' | 'completed';
  lastModified: string;
  tool: string;
}

function MyDesignProjects() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const stored = localStorage.getItem('designProjects');
    return stored ? JSON.parse(stored) : [
      {
        id: '1',
        title: 'Magical Forest Scene',
        description: 'Weekly challenge submission',
        thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=300&h=200',
        status: 'in-progress',
        lastModified: '2 hours ago',
        tool: 'Adobe Fresco'
      },
      {
        id: '2',
        title: 'Character Portrait',
        description: 'Digital painting practice',
        thumbnail: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=300&h=200',
        status: 'completed',
        lastModified: 'Yesterday',
        tool: 'Adobe Illustrator'
      }
    ];
  });

  const [isCreating, setIsCreating] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tool: 'Adobe Fresco'
  });

  useEffect(() => {
    localStorage.setItem('designProjects', JSON.stringify(projects));
  }, [projects]);

  const handleCreateProject = () => {
    if (!newProject.title.trim()) return;

    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description,
      thumbnail: null,
      status: 'in-progress',
      lastModified: 'Just now',
      tool: newProject.tool
    };

    setProjects([project, ...projects]);
    setIsCreating(false);
    setNewProject({ title: '', description: '', tool: 'Adobe Fresco' });
  };

  const toggleProjectStatus = (id: string) => {
    setProjects(projects.map(project => 
      project.id === id 
        ? { 
            ...project, 
            status: project.status === 'completed' ? 'in-progress' : 'completed'
          }
        : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* New Project Form */}
      {isCreating ? (
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Project</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter project title..."
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What's this project about?"
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="tool" className="block text-sm font-medium text-gray-700 mb-1">
                Design Tool
              </label>
              <select
                id="tool"
                value={newProject.tool}
                onChange={(e) => setNewProject({ ...newProject, tool: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Adobe Fresco">Adobe Fresco</option>
                <option value="Adobe Illustrator">Adobe Illustrator</option>
                <option value="Adobe Photoshop">Adobe Photoshop</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreateProject}
                className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Create Project
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsCreating(true)}
          className="w-full bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex flex-col items-center gap-4 text-gray-400 hover:text-purple-500">
            <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center">
              <Plus className="w-8 h-8" />
            </div>
            <span className="font-medium">Start New Project</span>
          </div>
        </button>
      )}

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="relative mb-4 rounded-xl overflow-hidden">
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-purple-50 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-purple-200" />
                </div>
              )}
              <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Upload className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  <p className="text-sm text-purple-500 mt-1">{project.tool}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-500 transition-colors">
                    <PenSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{project.lastModified}</span>
                </div>

                <button
                  onClick={() => toggleProjectStatus(project.id)}
                  className="flex items-center gap-1 text-sm font-medium transition-all"
                >
                  {project.status === 'completed' ? (
                    <span className="flex items-center gap-1 text-green-500">
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-purple-500 group-hover:gap-2">
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyDesignProjects;