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
  providerId: string;                       // The ID of the provider (e.g., "password", "google.com", etc.)
  uid: string;                              // The unique identifier for this provider
  displayName: string | null;               // The display name associated with this provider (can be null)
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
  displayName: string
  email: string
  tier?: "Free" | "Pro" | "Enterprise"
  stripe_cid?: string
  tokens: number
  // chats: string[]   // array of chat document ids
  // files: string []  // array of file document ids


}

export interface FirebaseChat {
  chatId: string
  userId: string
  createdAt: string   // date
  updatedAt: string   // date
  messages: Message[]
}

export interface Message {
  messageId: string
  role: "system" | "user"
  content: string
  timestamp: string // date
  references?: 
}