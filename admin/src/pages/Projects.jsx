import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../lib/supabase'

export const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await db.projects.getAll()
      setProjects(data)
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (project) => {
    setProjectToDelete(project)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return

    try {
      // Delete image from storage if exists
      if (projectToDelete.thumbnail_url) {
        await db.storage.delete(projectToDelete.thumbnail_url)
      }

      // Delete from database
      await db.projects.delete(projectToDelete.id)

      // Reload list
      await loadProjects()
      setDeleteModalOpen(false)
      setProjectToDelete(null)
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project: ' + error.message)
    }
  }

  const toggleFeatured = async (project) => {
    try {
      await db.projects.update(project.id, { featured: !project.featured })
      await loadProjects()
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  const mediaType = (url) => {
    if (!url) return 'none'
    if (/\.(mp4|webm|ogg)$/i.test(url)) return 'video'
    if (/\.pdf$/i.test(url)) return 'pdf'
    return 'image'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display tracking-tighter">Projects</h1>
          <p className="text-slate-500 mt-1">Manage your portfolio projects</p>
        </div>
        <Link
          to="/projects/new"
          className="glow-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </Link>
      </div>

      {/* Projects Table */}
      <div className="glass-panel rounded-lg overflow-hidden">
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">No projects found. Add your first project!</p>
            <Link
              to="/projects/new"
              className="mt-4 glow-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg"
            >
              Add Project
            </Link>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">Featured</th>
                <th className="px-6 py-3 text-left text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">Tech Stack</th>
                <th className="px-6 py-3 text-right text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {project.thumbnail_url ? (
                        mediaType(project.thumbnail_url) === 'video' ? (
                          <video src={project.thumbnail_url} className="h-10 w-10 object-cover rounded-lg mr-3 bg-black" />
                        ) : mediaType(project.thumbnail_url) === 'pdf' ? (
                          <a href={project.thumbnail_url} target="_blank" rel="noopener" className="h-10 w-10 bg-slate-100 rounded-lg mr-3 flex items-center justify-center text-primary font-mono text-[10px]">PDF</a>
                        ) : (
                          <img
                            src={project.thumbnail_url}
                            alt={project.title}
                            className="h-10 w-10 object-cover rounded-lg mr-3"
                          />
                        )
                      ) : (
                        <div className="h-10 w-10 bg-slate-100 rounded-lg mr-3 flex items-center justify-center text-slate-400 text-xs">
                          No img
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-slate-900">{project.title}</div>
                        <div className="text-xs text-slate-400 font-mono truncate max-w-xs">{project.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full font-mono ${
                      project.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      project.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'PLANNED' ? 'bg-slate-100 text-slate-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleFeatured(project)}
                      className={`text-xs px-2 py-1 rounded font-mono font-medium ${
                        project.featured
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {project.featured ? '★ Featured' : '☆ Standard'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {project.tech_stack?.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack?.length > 3 && (
                        <span className="text-xs text-slate-400">+{project.tech_stack.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-mono">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/projects/edit/${project.id}`}
                        className="text-primary hover:text-primary-hover font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(project)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
          <div className="glass-panel max-w-md w-full p-6 space-y-4 rounded-lg">
            <h3 className="text-lg font-bold text-slate-900 font-display">Delete Project</h3>
            <p className="text-sm text-slate-500">
              Are you sure you want to delete <span className="font-semibold text-slate-900">{projectToDelete?.title}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-mono font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="glow-btn px-4 py-2 text-white rounded-lg text-sm font-mono font-medium"
                style={{ backgroundColor: '#dc2626' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
