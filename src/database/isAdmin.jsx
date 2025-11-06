import { getAuth } from 'firebase/auth';

// Function to check if current user is admin
export const isAdmin = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        return false;  // No user is signed in
    }

    // Check the sign-in method of the current user
    const providerData = user.providerData;

    // Look for the sign-in method that indicates email/password
    const isAdmin = providerData.some((provider) => provider.providerId === 'password');
    
    return isAdmin,user.uid;
};
