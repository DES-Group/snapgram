import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

// Assign import.meta.env values to variables
const url = import.meta.env.VITE_APPWRITE_URL;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const storageId = import.meta.env.VITE_APPWRITE_STORAGE_ID;
const userCollectionId = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
const postCollectionId = import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID;
const savesCollectionId = import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID;


// Create appwriteConfig object
export const appwriteConfig = {
    url,
    projectId,
    databaseId,
    storageId,
    userCollectionId,
    postCollectionId,
    savesCollectionId,
};

// Create a new Client instance and configure it
export const client = new Client()
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId); 

// Create instances of other Appwrite services using the configured client
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
