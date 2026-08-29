/* ============================================================================
 *  PORTFOLIO API  —  Supabase integration for dynamic content
 *  Fetches projects & certificates from Supabase, falls back to static data
 * ==========================================================================*/

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import SUPABASE_CONFIG from './config.js'

// Initialize Supabase client
let supabase = null
let isSupabaseConfigured = false

try {
  if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
    supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey)
    isSupabaseConfigured = true
    console.log('✅ Supabase client initialized')
  } else {
    console.warn('⚠️ Supabase not configured. Using static data fallback.')
  }
} catch (error) {
  console.error('❌ Supabase initialization failed:', error)
}

/**
 * Fetch projects from Supabase
 * @returns {Promise<Array>} Array of projects
 */
export async function fetchProjects() {
  if (!isSupabaseConfigured || !supabase) {
    console.log('📦 Using static projects data (Supabase not configured)')
    return null // Signal to use fallback
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Error fetching projects:', error)
      return null // Fallback to static
    }

    console.log(`✅ Fetched ${data.length} projects from Supabase`)
    return data.map(transformProject)
  } catch (error) {
    console.error('❌ Failed to fetch projects:', error)
    return null // Fallback to static
  }
}

/**
 * Fetch certificates from Supabase
 * @returns {Promise<Array>} Array of certificates
 */
export async function fetchCertificates() {
  if (!isSupabaseConfigured || !supabase) {
    console.log('📦 Using static certificates data (Supabase not configured)')
    return null // Signal to use fallback
  }

  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('issue_date', { ascending: false })

    if (error) {
      console.error('❌ Error fetching certificates:', error)
      return null // Fallback to static
    }

    console.log(`✅ Fetched ${data.length} certificates from Supabase`)
    return data.map(transformCertificate)
  } catch (error) {
    console.error('❌ Failed to fetch certificates:', error)
    return null // Fallback to static
  }
}

/**
 * Transform Supabase project data to portfolio format
 * @param {Object} project - Supabase project object
 * @returns {Object} Transformed project
 */
function transformProject(project) {
  const url = project.thumbnail_url || ''
  const mediaType = /\.(mp4|webm|ogg)$/i.test(url) ? 'video'
    : /\.pdf$/i.test(url) ? 'pdf'
    : (url ? 'image' : 'none')
  return {
    name: project.title,
    description: project.description,
    image: url,
    mediaType,
    tags: project.tech_stack || [],
    github: project.github_url || '#',
    demo: project.demo_url || '#',
    status: project.status || 'COMPLETED',
    featured: project.featured || false,
  }
}

/**
 * Transform Supabase certificate data to portfolio format
 * @param {Object} cert - Supabase certificate object
 * @returns {Object} Transformed certificate
 */
function transformCertificate(cert) {
  const url = cert.image_url || ''
  const mediaType = /\.(mp4|webm|ogg)$/i.test(url) ? 'video'
    : /\.pdf$/i.test(url) ? 'pdf'
    : (url ? 'image' : 'none')
  return {
    name: cert.title,
    issuer: cert.issuer,
    date: formatDate(cert.issue_date),
    image: url,
    mediaType,
    credentialId: cert.credential_id || '',
    verifyUrl: cert.verification_url || '#',
  }
}

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  } catch (error) {
    return dateString
  }
}

/**
 * Check if Supabase is configured and available
 * @returns {boolean}
 */
export function isSupabaseAvailable() {
  return isSupabaseConfigured && supabase !== null
}
