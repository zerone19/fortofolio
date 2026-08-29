import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../lib/supabase'

export const Certificates = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [certToDelete, setCertToDelete] = useState(null)

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = async () => {
    try {
      setLoading(true)
      const data = await db.certificates.getAll()
      setCertificates(data)
    } catch (error) {
      console.error('Error loading certificates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (cert) => {
    setCertToDelete(cert)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!certToDelete) return

    try {
      // Delete image from storage if exists
      if (certToDelete.image_url) {
        await db.storage.delete(certToDelete.image_url)
      }

      // Delete from database
      await db.certificates.delete(certToDelete.id)

      // Reload list
      await loadCertificates()
      setDeleteModalOpen(false)
      setCertToDelete(null)
    } catch (error) {
      console.error('Error deleting certificate:', error)
      alert('Failed to delete certificate: ' + error.message)
    }
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
          <h1 className="text-2xl font-extrabold text-slate-900 font-display tracking-tighter">Certificates</h1>
          <p className="text-slate-500 mt-1">Manage your certificates and credentials</p>
        </div>
        <Link
          to="/certificates/new"
          className="glow-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Certificate
        </Link>
      </div>

      {/* Certificates Table */}
      <div className="glass-panel rounded-lg overflow-hidden">
        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">No certificates found. Add your first certificate!</p>
            <Link
              to="/certificates/new"
              className="mt-4 glow-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg"
            >
              Add Certificate
            </Link>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">Certificate</th>
                <th className="px-6 py-3 text-left text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">Issuer</th>
                <th className="px-6 py-3 text-left text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">Issue Date</th>
                <th className="px-6 py-3 text-left text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">Credential ID</th>
                <th className="px-6 py-3 text-right text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {certificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {cert.image_url ? (
                        /\.(mp4|webm|ogg)$/i.test(cert.image_url) ? (
                          <video src={cert.image_url} className="h-10 w-10 object-cover rounded-lg mr-3 bg-black" />
                        ) : /\.pdf$/i.test(cert.image_url) ? (
                          <a href={cert.image_url} target="_blank" rel="noopener" className="h-10 w-10 bg-slate-100 rounded-lg mr-3 flex items-center justify-center text-primary font-mono text-[10px]">PDF</a>
                        ) : (
                          <img
                            src={cert.image_url}
                            alt={cert.title}
                            className="h-10 w-10 object-cover rounded-lg mr-3"
                          />
                        )
                      ) : (
                        <div className="h-10 w-10 bg-slate-100 rounded-lg mr-3 flex items-center justify-center text-slate-400 text-xs">
                          No img
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-slate-900">{cert.title}</div>
                        <div className="text-xs text-slate-400 font-mono truncate max-w-xs">{cert.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">{cert.issuer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                    {new Date(cert.issue_date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                    {cert.credential_id || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-mono">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/certificates/edit/${cert.id}`}
                        className="text-primary hover:text-primary-hover font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(cert)}
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
            <h3 className="text-lg font-bold text-slate-900 font-display">Delete Certificate</h3>
            <p className="text-sm text-slate-500">
              Are you sure you want to delete <span className="font-semibold text-slate-900">{certToDelete?.title}</span>? This action cannot be undone.
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
