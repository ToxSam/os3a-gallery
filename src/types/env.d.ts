// src/types/env.d.ts
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_SUPABASE_URL: string;
        NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
        // Add other environment variables here as needed
      }
    }
  }
  
  // This empty export is necessary to mark this as a module
  export {}