import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../lib/supabase'

export const Dashboard = () => {
  const [stats, setStats] = useState({
    projectsCount: 0,
    certificatesCount: 0,
    featuredCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [recentProjects, setRecentProjects] = useState([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [projects, certificates] = await Promise.all([
        db.projects.getAll(),
        db.certificates.getAll(),
      ])

      const featured = projects.filter((p) => p.featured).length

      setStats({
        projectsCount: projects.length,
        certificatesCount: certificates.length,
        featuredCount: featured,
      })

      setRecentProjects(projects.slice(0, 5))
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display tracking-tighter">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's an overview of your portfolio content.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">Total Projects</p>
              <p className="text-3xl font-extrabold text-slate-900 font-display mt-2">{stats.projectsCount}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4 font-mono">{stats.featuredCount} featured on homepage</p>
        </div>

        <div className="glass-panel p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">Certificates</p>
              <p className="text-3xl font-extrabold text-slate-900 font-display mt-2">{stats.certificatesCount}</p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(253,212,0,0.12)', color: '#8a6d00' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4 font-mono">Credentials & achievements</p>
        </div>

        <div className="glass-panel p-6 rounded-lg" style={{ borderColor: 'rgba(0,118,163,0.3)', boxShadow: '0 0 15px rgba(0,118,163,0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">Featured Projects</p>
              <p className="text-3xl font-extrabold text-slate-900 font-display mt-2">{stats.featuredCount}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4 font-mono">Shown on main showcase</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-panel p-6 rounded-lg">
        <h2 className="text-lg font-bold text-slate-900 font-display mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/projects/new"
            className="glow-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Project
          </Link>
          <Link
            to="/certificates/new"
            className="glow-outline-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Certificate
          </Link>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="glass-panel p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 font-display">Recent Projects</h2>
          <Link to="/projects" className="text-sm font-medium text-primary hover:underline font-mono">
            View All →
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <p className="text-slate-500 text-sm py-4">No projects yet. Add your first project!</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentProjects.map((project) => (
              <div key={project.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {project.thumbnail_url && (
                    /\.(mp4|webm|ogg)$/i.test(project.thumbnail_url) ? (
                      <video src={project.thumbnail_url} className="w-10 h-10 object-cover rounded-lg bg-black" />
                    ) : /\.pdf$/i.test(project.thumbnail_url) ? (
                      <a href={project.thumbnail_url} target="_blank" rel="noopener" className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-primary font-mono text-[10px]">PDF</a>
                    ) : (
                      <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                    )
                  )}
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{project.title}</p>
                    <p className="text-xs text-slate-400 font-mono">{project.tech_stack?.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {project.featured && (
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full font-mono">
                      Featured
                    </span>
                  )}
                  <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full font-mono">
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
