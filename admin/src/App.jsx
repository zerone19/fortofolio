import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Projects } from './pages/Projects'
import { ProjectForm } from './pages/ProjectForm'
import { Certificates } from './pages/Certificates'
import { CertificateForm } from './pages/CertificateForm'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Projects Routes */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Layout>
                  <Projects />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProjectForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProjectForm />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Certificates Routes */}
          <Route
            path="/certificates"
            element={
              <ProtectedRoute>
                <Layout>
                  <Certificates />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificates/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <CertificateForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificates/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <CertificateForm />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
