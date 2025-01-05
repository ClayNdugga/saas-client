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

export interface ProviderData {
  providerId: string;                       // The ID of the provider (e.g., "password", "google.com", etc.)
  uid: string;                              // The unique identifier for this provider
  displayName: string | null;               // The display name associated with this provider (can be null)
  email: string; 
  phoneNumber: string | null; 
  photoURL: string | null; 
}

export interface StsTokenManager {
  refreshToken: string; 
  accessToken: string; 
  expirationTime: number; 
}
