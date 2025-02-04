export interface FirebaseUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: ProviderData[]; // Array of provider data (such as Google, Facebook, etc.)
  stsTokenManager: StsTokenManager; // Token manager details
  // metadata: {createdAt, creationTime, lastLogin}
  apiKey: string;
  appName: string;
}

interface ProviderData {
  providerId: string; // The ID of the provider (e.g., "password", "google.com", etc.)
  uid: string; // The unique identifier for this provider
  displayName: string | null; // The display name associated with this provider (can be null)
  email: string;
  phoneNumber: string | null;
  photoURL: string | null;
}

interface StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

export interface FirebaseDBUser {
  displayName: string;
  email: string;
  tier: "Free" | "Pro";
  numFiles?: number;
  files?: string[];
  chats: string[];
}

export interface FirebaseChat {
  chatId: string;
  userId: string;
  createdAt: string; // date
  updatedAt: string; // date
  messages: Message[];
}

export interface Message {
  messageId: string;
  role: "system" | "user";
  content: string;
  timestamp: string;
  files?: string[];
  references?: Citation[];
}

export interface Citation {
  fileId: string;
  fileName: string;
  pageNumber: number;
  boundingBox: number[];
  folderId: string;
}

export interface FirebaseFile {
  // fileId: string
  userId: string;
  name: string
  size: number;
  type: string;
  folderId: string | "root";
  storagePath: string;
  uploadedAt: string;
  status: "processing" | "processed" | "error";
  embeddingMetadata: {
    namespace: string;
    folderId: string;
  };  
}