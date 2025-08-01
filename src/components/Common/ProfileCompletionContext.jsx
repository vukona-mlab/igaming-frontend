// ProfileCompletionContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';

const ProfileCompletionContext = createContext();

export const ProfileCompletionProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(null);

  // Helper function to get auth data from localStorage
  const getAuthData = useCallback(() => {
    console.log('🔍 Getting auth data from localStorage...');
    try {
      const token = localStorage.getItem('token');
      const uid = localStorage.getItem('uid');
      const role = localStorage.getItem('role');
      
      const authData = {
        token: token ? `${token}` : null,
        uid,
        role
      };
      
      console.log('📋 Auth data retrieved:', {
        tokenExists: !!token,
        tokenLength: token ? token.length : 0,
        tokenPreview: token ? `${token.substring(0, 20)}...` : 'null',
        uid: uid,
        role: role
      });
      
      return authData;
    } catch (error) {
      console.error('❌ Error reading from localStorage:', error);
      return { token: null, uid: null, role: null };
    }
  }, []);

  const checkProfileCompletion = useCallback(async (BACKEND_URL) => {
    console.log('🚀 Starting profile completion check...');
    console.log('📍 BACKEND_URL:', BACKEND_URL);
    
    const { token, uid } = getAuthData();
    
    if (!uid || !token || !BACKEND_URL) {
      console.error('❌ Missing required parameters for profile check:', {
        hasUid: !!uid,
        hasToken: !!token,
        hasBackendUrl: !!BACKEND_URL
      });
      setIsProfileComplete(false);
      return { profileComplete: false, missingFields: [], shouldShowModal: false };
    }

    console.log('✅ All required parameters present, proceeding with API call...');
    setLoading(true);
    setError(null);
    
    try {
      const requestUrl = `${BACKEND_URL}/api/auth/users/${uid}`;
      console.log('🌐 Making GET request to:', requestUrl);
      console.log('🔑 Request headers:', {
        Authorization: `${token.substring(0, 20)}...`,
        'Content-Type': 'application/json'
      });
      
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: { 
          Authorization: token,
          'Content-Type': 'application/json'
        },
      });
      
      console.log('📡 Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Profile data received:', {
          hasUser: !!data.user,
          userKeys: data.user ? Object.keys(data.user) : [],
          userData: data.user
        });
        
        setUserProfile(data.user);
        
        const requiredFields = ['name', 'email', 'profilePicture', 'bio'];
        console.log('🔍 Checking required fields:', requiredFields);
        
        const missing = requiredFields.filter(field => {
          const value = data.user[field];
          const isEmpty = !value || (typeof value === 'string' && value.trim() === '');
          console.log(`  - ${field}: ${isEmpty ? '❌ MISSING' : '✅ PRESENT'} (value: ${JSON.stringify(value)})`);
          return isEmpty;
        });
        
        console.log('📊 Profile completion analysis:', {
          totalFields: requiredFields.length,
          missingFields: missing,
          missingCount: missing.length
        });
        
        setMissingFields(missing);
        const profileComplete = missing.length === 0;
        setIsProfileComplete(profileComplete);
        
        const shouldShowModal = missing.length > 0;
        setIsModalOpen(shouldShowModal);
        
        console.log('🎯 Final result:', {
          profileComplete,
          missingFields: missing,
          shouldShowModal,
          modalWillOpen: shouldShowModal
        });
        
        return {
          profileComplete,
          missingFields: missing,
          shouldShowModal
        };
      } else {
        const errorText = await response.text();
        console.error('❌ Failed to fetch user profile:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText
        });
        setError(`Failed to fetch profile: ${response.status}`);
        setIsModalOpen(false);
        setIsProfileComplete(false);
        return { profileComplete: false, missingFields: [], shouldShowModal: false };
      }
    } catch (error) {
      console.error('💥 Error during profile completion check:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      setError(error.message);
      setIsModalOpen(false);
      setIsProfileComplete(false);
      return { profileComplete: false, missingFields: [], shouldShowModal: false };
    } finally {
      console.log('🏁 Profile check completed, setting loading to false');
      setLoading(false);
    }
  }, [getAuthData]);

  const updateProfile = useCallback(async (BACKEND_URL, profileData) => {
    console.log('🔄 Starting profile update...');
    console.log('📊 Profile data to update:', profileData);
    
    const { token, uid } = getAuthData();
    
    if (!uid || !token || !BACKEND_URL || !profileData) {
      console.error('❌ Missing required parameters for profile update:', {
        hasUid: !!uid,
        hasToken: !!token,
        hasBackendUrl: !!BACKEND_URL,
        hasProfileData: !!profileData
      });
      return { success: false, error: 'Missing required parameters' };
    }

    console.log('✅ All update parameters present, proceeding...');
    setLoading(true);
    setError(null);

    try {
      const requestUrl = `${BACKEND_URL}/api/auth/users/${uid}`;
      console.log('🌐 Making PUT request to:', requestUrl);
      
      const response = await fetch(requestUrl, {
        method: "PUT",
        headers: { 
          Authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      console.log('📡 Update response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Profile updated successfully:', data.user);
        setUserProfile(data.user);
        
        console.log('🔄 Re-checking profile completion after update...');
        // Re-check completion after update
        const result = await checkProfileCompletion(BACKEND_URL);
        console.log('🎯 Update final result:', { success: true, ...result });
        return { success: true, ...result };
      } else {
        const errorText = await response.text();
        console.error('❌ Failed to update profile:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText
        });
        setError(`Failed to update profile: ${response.status}`);
        return { success: false, error: `Update failed: ${response.status}` };
      }
    } catch (error) {
      console.error('💥 Error updating profile:', {
        message: error.message,
        stack: error.stack
      });
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      console.log('🏁 Profile update completed, setting loading to false');
      setLoading(false);
    }
  }, [getAuthData, checkProfileCompletion]);

  const handleApiError = useCallback((error, errorData) => {
    console.log('🚨 Handling API error:', { error, errorData });
    
    if (errorData?.code === 'PROFILE_INCOMPLETE') {
      console.log('📋 Profile incomplete error detected, setting modal state...');
      setMissingFields(errorData.missingFields || []);
      setIsModalOpen(true);
      setIsProfileComplete(false);
      console.log('✅ Modal state updated for profile incomplete');
      return true;
    }
    console.log('ℹ️ Not a profile incomplete error, ignoring...');
    return false;
  }, []);

  const refreshProfile = useCallback(async (BACKEND_URL) => {
    console.log('🔄 Refreshing profile...');
    const result = await checkProfileCompletion(BACKEND_URL);
    console.log('✅ Profile refresh completed:', result);
    return result;
  }, [checkProfileCompletion]);

  const clearError = useCallback(() => {
    console.log('🧹 Clearing error state');
    setError(null);
  }, []);

  const openModal = useCallback(() => {
    console.log('🔓 Opening modal');
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    console.log('🔒 Closing modal');
    setIsModalOpen(false);
  }, []);

  const resetContext = useCallback(() => {
    console.log('🔄 Resetting entire context state');
    setIsModalOpen(false);
    setMissingFields([]);
    setUserProfile(null);
    setLoading(false);
    setError(null);
    setIsProfileComplete(null);
    console.log('✅ Context reset completed');
  }, []);

  const value = {
    // State
    isModalOpen,
    missingFields,
    userProfile,
    loading,
    error,
    isProfileComplete,
    
    // Actions
    checkProfileCompletion,
    handleApiError,
    updateProfile,
    refreshProfile,
    openModal,
    closeModal,
    clearError,
    resetContext,
    getAuthData // Expose this in case components need auth data
  };

  console.log('🏗️ ProfileCompletionProvider rendering with current state:', {
    isModalOpen,
    missingFieldsCount: missingFields.length,
    hasUserProfile: !!userProfile,
    loading,
    hasError: !!error,
    isProfileComplete
  });

  return (
    <ProfileCompletionContext.Provider value={value}>
      {children}
    </ProfileCompletionContext.Provider>
  );
};

export const useProfileCompletionContext = () => {
  const context = useContext(ProfileCompletionContext);
  if (!context) {
    throw new Error('useProfileCompletionContext must be used within a ProfileCompletionProvider');
  }
  return context;
};