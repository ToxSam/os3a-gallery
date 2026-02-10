// This is a stub implementation of the Supabase client
// Since we've migrated to GitHub storage, we don't need Supabase anymore
// but we keep this to avoid breaking imports in components that haven't been updated

// Stub for auth-related functionality
const authStub = {
  getSession: async () => ({
    data: {
      session: {
        // Add dummy session data to satisfy TypeScript
        access_token: 'dummy-token',
        user: {
          id: 'dummy-user-id',
          email: 'dummy@example.com',
          role: 'user'
        },
        expires_at: Date.now() + 3600000 // 1 hour from now
      }
    },
    error: null
  }),
  signIn: async () => ({
    data: null,
    error: new Error('Supabase authentication is no longer supported')
  }),
  signOut: async () => ({
    error: null
  }),
  // Add other auth methods as needed
};

// Create a stub for supabase client
export const supabase = {
  auth: authStub,
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({
          data: null,
          error: new Error(`Supabase storage is no longer supported. Table: ${table}`)
        }),
        order: () => ({
          limit: () => ({
            data: [],
            error: null
          })
        })
      })
    }),
    insert: () => ({
      data: null,
      error: new Error(`Supabase storage is no longer supported. Table: ${table}`)
    }),
    update: () => ({
      eq: () => ({
        data: null,
        error: new Error(`Supabase storage is no longer supported. Table: ${table}`)
      })
    }),
    delete: () => ({
      eq: () => ({
        data: null,
        error: new Error(`Supabase storage is no longer supported. Table: ${table}`)
      })
    })
  }),
  storage: {
    from: (bucket: string) => ({
      upload: async () => ({
        data: null,
        error: new Error(`Supabase storage is no longer supported. Bucket: ${bucket}`)
      }),
      getPublicUrl: () => ({
        data: {
          publicUrl: ''
        }
      })
    })
  }
}; 