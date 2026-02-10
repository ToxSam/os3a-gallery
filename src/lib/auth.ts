/**
 * This file is deprecated and no longer used.
 * We've migrated from NextAuth.js to our own GitHub authentication implementation.
 * 
 * This file is kept for reference but all code is commented out to prevent build errors.
 */

/*
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

// Create a stub adapter that doesn't actually use Prisma
const stubAdapter = {
  createUser: async (data: any) => ({ id: 'stub-id', ...data }),
  getUser: async (id: string) => null,
  getUserByEmail: async (email: string) => null,
  getUserByAccount: async (data: any) => null,
  updateUser: async (data: any) => data,
  deleteUser: async (id: string) => null,
  linkAccount: async (data: any) => data,
  unlinkAccount: async (data: any) => null,
  getSessionAndUser: async (sessionToken: string) => null,
  createSession: async (data: any) => data,
  updateSession: async (data: any) => data,
  deleteSession: async (sessionToken: string) => null,
  createVerificationToken: async (data: any) => data,
  useVerificationToken: async (data: any) => null,
};

// Auth.js configuration
export const authOptions: NextAuthOptions = {
  // Use stub adapter instead of Prisma adapter
  adapter: stubAdapter as any,
  
  // Configure authentication providers
  providers: [
    // GitHub OAuth provider
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    
    // You can add more providers here
    // GoogleProvider, TwitterProvider, etc.
    
    // Optional: Add credentials provider for email/password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your own logic here for validating credentials
        // This is just a placeholder
        if (!credentials?.email || !credentials?.password) return null;
        
        // Example: Check user in database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        // Additional validation would happen here
        // Compare passwords, etc.
        
        if (user) {
          return {
            id: user.id,
            name: user.username,
            email: user.email
          };
        }
        
        return null;
      }
    })
  ],
  
  // Session configuration
  session: {
    strategy: "jwt",
  },
  
  // Customize pages
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  
  // Callbacks for customizing behavior
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  }
};

// Helper function for checking authentication on protected routes
export async function getUserSession() {
  // When implemented, this would use getServerSession() from next-auth/next
  // to get the current user's session
  
  // Example implementation (not functional until Auth.js is fully set up):
  // import { getServerSession } from "next-auth/next";
  // return await getServerSession(authOptions);
  
  // For demonstration only
  return { user: null };
}
*/

// Export a dummy object to satisfy any imports
export const authOptions = {}; 