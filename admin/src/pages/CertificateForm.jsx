import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../lib/supabase'

export const CertificateForm = () => {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(isEdit)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issue_date: '',
    credential_id: '',
    verification_url: '',
    description: '',
    image_url: '',
    sort_order: 0,
  })

  useEffect(() => {
    if (isEdit) {
      loadCertificate()
    }
  }, [id])

  const loadCertificate = async () => {
    try {
      setInitialLoading(true)
      const data = await db.certificates.getById(id)
      setFormData(data)
      const url = data.image_url || ''
      const isVideo = /\.(mp4|webm|ogg)$/i.test(url)
      const isPdf = /\.pdf$/i.test(url)
      const type = isVideo ? 'video' : isPdf ? 'pdf' : 'image'
      setImagePreview(url ? { url, type } : '')
    } catch (error) {
      console.error('Error loading certificate:', error)
      alert('Failed to load certificate')
      navigate('/certificates')
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = formData.image_url

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await db.storage.upload(imageFile, 'certificates')
      }

      const certData = {
        ...formData,
        image_url: imageUrl,
        // Postgres DATE kolom menolak "" -> harus null kalau kosong
        issue_date: formData.issue_date ? formData.issue_date : null,
      }

      if (isEdit) {
        await db.certificates.update(id, certData)
      } else {
        await db.certificates.create(certData)
      }

      navigate('/certificates')
    } catch (error) {
      console.error('Error saving certificate:', error)
      alert('Failed to save certificate: ' + error.message)
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
          {isEdit ? 'Edit Certificate' : 'New Certificate'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEdit ? 'Update certificate details' : 'Add a new certificate to your portfolio'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Certificate Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="e.g. AWS Certified Solutions Architect"
          />
        </div>

        {/* Issuer */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Issuer / Organization *</label>
          <input
            type="text"
            required
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="e.g. Amazon Web Services, Dicoding, Coursera"
          />
        </div>

        {/* Issue Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Issue Date *</label>
          <input
            type="date"
            required
            value={formData.issue_date}
            onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Media */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Certificate Media (Image / Video / PDF) *</label>
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
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP, PDF up to 5MB</p>
            </div>
          </div>
        </div>

        {/* Credential ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Credential ID (Optional)</label>
          <input
            type="text"
            value={formData.credential_id || ''}
            onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="e.g. ABC-12345-XYZ"
          />
        </div>

        {/* Verification URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Verification URL (Optional)</label>
          <input
            type="url"
            value={formData.verification_url || ''}
            onChange={(e) => setFormData({ ...formData, verification_url: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="https://..."
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
          <textarea
            rows={3}
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="Brief description of the certificate or skills covered..."
          />
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sort Order</label>
          <input
            type="number"
            value={formData.sort_order || 0}
            onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/certificates')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary text-surface-dark rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Certificate' : 'Create Certificate'}
          </button>
        </div>
      </form>
    </div>
  )
}
