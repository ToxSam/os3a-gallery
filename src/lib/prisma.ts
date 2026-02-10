// This is a stub implementation of the Prisma client
// Since we've migrated to GitHub storage, we don't need actual database connections
// but we keep this to avoid breaking imports

const stubbedMethods = {
  findUnique: async () => null,
  findFirst: async () => null,
  findMany: async () => [],
  create: async () => ({}),
  update: async () => ({}),
  delete: async () => ({}),
  upsert: async () => ({}),
  count: async () => 0,
};

// Create a stub for all possible Prisma models
const modelStub = {
  ...stubbedMethods,
};

// Create proxy handler for missing methods
const handler = {
  get: (target: Record<string, unknown>, prop: string | symbol) => {
    // Convert symbol to string if needed
    const propKey = prop.toString();
    
    // Return the property if it exists
    if (propKey in target) {
      return target[propKey];
    }
    
    // For any model access, return the stub
    return modelStub;
  }
};

// Create a proxy object that mimics the Prisma client
export const prisma = new Proxy({
  user: modelStub,
  project: modelStub,
  avatar: modelStub,
  tag: modelStub,
  avatarTag: modelStub,
  download: modelStub,
  $connect: async () => {},
  $disconnect: async () => {},
}, handler);