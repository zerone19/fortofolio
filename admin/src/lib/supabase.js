import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Check your .env file.')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

// Storage bucket name
export const STORAGE_BUCKET = 'portfolio-assets'

// Helper functions for database operations
export const db = {
  // Projects
  projects: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },

    getById: async (id) => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },

    create: async (project) => {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single()
      if (error) throw error
      return data
    },

    update: async (id, project) => {
      const { data, error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return data
    },

    delete: async (id) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
      if (error) throw error
      return true
    },
  },

  // Certificates
  certificates: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('issue_date', { ascending: false })
      if (error) throw error
      return data
    },

    getById: async (id) => {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },

    create: async (certificate) => {
      const { data, error } = await supabase
        .from('certificates')
        .insert([certificate])
        .select()
        .single()
      if (error) throw error
      return data
    },

    update: async (id, certificate) => {
      const { data, error } = await supabase
        .from('certificates')
        .update(certificate)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return data
    },

    delete: async (id) => {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id)
      if (error) throw error
      return true
    },
  },

  // Storage
  storage: {
    upload: async (file, path) => {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      const filePath = `${path}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath)

      return data.publicUrl
    },

    delete: async (url) => {
      try {
        const path = url.split(`${STORAGE_BUCKET}/`)[1]
        if (path) {
          await supabase.storage.from(STORAGE_BUCKET).remove([path])
        }
      } catch (error) {
        console.error('Error deleting file from storage:', error)
      }
    },
  },
}
