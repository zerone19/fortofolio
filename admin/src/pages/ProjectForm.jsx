import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../lib/supabase'

export const ProjectForm = () => {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(isEdit)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [techInput, setTechInput] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    thumbnail_url: '',
    tech_stack: [],
    github_url: '',
    demo_url: '',
    status: 'COMPLETED',
    featured: false,
    project_date: '',
    sort_order: 0,
  })

  useEffect(() => {
    if (isEdit) {
      loadProject()
    }
  }, [id])

  const loadProject = async () => {
    try {
      setInitialLoading(true)
      const data = await db.projects.getById(id)
      setFormData(data)
      const url = data.thumbnail_url || ''
      const isVideo = /\.(mp4|webm|ogg)$/i.test(url)
      const isPdf = /\.pdf$/i.test(url)
      const type = isVideo ? 'video' : isPdf ? 'pdf' : 'image'
      setImagePreview(url ? { url, type } : '')
    } catch (error) {
      console.error('Error loading project:', error)
      alert('Failed to load project')
      navigate('/projects')
    } finally {
      setInitialLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const isVideo = file.type.startsWith('video/')
      const isPdf = file.type === 'application/pdf'
      const type = isVideo ? 'video' : isPdf ? 'pdf' : 'image'
      setImagePreview({ url: URL.createObjectURL(file), type })
    }
  }

  const handleAddTech = () => {
    if (techInput.trim() && !formData.tech_stack.includes(techInput.trim())) {
      setFormData({
        ...formData,
        tech_stack: [...formData.tech_stack, techInput.trim()],
      })
      setTechInput('')
    }
  }

  const handleRemoveTech = (techToRemove) => {
    setFormData({
      ...formData,
      tech_stack: formData.tech_stack.filter((tech) => tech !== techToRemove),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let thumbnailUrl = formData.thumbnail_url

      // Upload new image if selected
      if (imageFile) {
        thumbnailUrl = await db.storage.upload(imageFile, 'projects')
      }

      const projectData = {
        ...formData,
        thumbnail_url: thumbnailUrl,
        // Postgres DATE kolom menolak "" -> harus null kalau kosong
        project_date: formData.project_date ? formData.project_date : null,
      }

      if (isEdit) {
        await db.projects.update(id, projectData)
      } else {
        await db.projects.create(projectData)
      }

      navigate('/projects')
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Failed to save project: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Edit Project' : 'New Project'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEdit ? 'Update project details' : 'Add a new project to your portfolio'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="e.g. Personal Portfolio Website"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug (Optional)</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="e.g. personal-portfolio (auto-generated if empty)"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description *</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="Describe your project, key features, and your role..."
          />
        </div>

        {/* Thumbnail / Media */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Media (Image / Video / PDF) *</label>
          <div className="mt-2 flex items-center gap-6">
            {imagePreview ? (
              imagePreview.type === 'video' ? (
                <video
                  src={imagePreview.url}
                  controls
                  className="h-32 w-48 object-cover rounded-lg border border-gray-200 bg-black"
                />
              ) : imagePreview.type === 'pdf' ? (
                <a
                  href={imagePreview.url}
                  target="_blank"
                  rel="noopener"
                  className="h-32 w-48 flex items-center justify-center rounded-lg border border-gray-200 bg-slate-100 text-primary font-mono text-xs text-center px-2"
                >
                  PDF SELECTED<br />Click to open
                </a>
              ) : (
                <img
                  src={imagePreview.url}
                  alt="Preview"
                  className="h-32 w-48 object-cover rounded-lg border border-gray-200"
                />
              )
            ) : (
              <div className="h-32 w-48 bg-gray-100 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                No media
              </div>
            )}
            <div>
              <input
                type="file"
                accept="image/*,video/*,application/pdf"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP, MP4, WebM, or PDF up to 5MB</p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tech Stack *</label>
          <div className="mt-1 flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="e.g. React (press Enter to add)"
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tech_stack.map((tech, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTech(tech)}
                  className="hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
            <input
              type="url"
              value={formData.github_url || ''}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="https://github.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Live Demo URL</label>
            <input
              type="url"
              value={formData.demo_url || ''}
              onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Status & Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            >
              <option value="COMPLETED">Completed</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="PLANNED">Planned</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Date</label>
            <input
              type="date"
              value={formData.project_date || ''}
              onChange={(e) => setFormData({ ...formData, project_date: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sort Order</label>
            <input
              type="number"
              value={formData.sort_order || 0}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center">
          <input
            id="featured"
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
            Featured Project (Showcase on homepage)
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary text-surface-dark rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  )
}
