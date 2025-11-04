import { useState, useEffect } from 'react';
import { STORAGE_CONFIG } from '../../infrastructure/config/storage.config';

export const useUserName = () => {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem(STORAGE_CONFIG.USERNAME_KEY) || '';
  });

  const [showWelcomeModal, setShowWelcomeModal] = useState(!userName);

  useEffect(() => {
    if (userName) {
      localStorage.setItem(STORAGE_CONFIG.USERNAME_KEY, userName);
    }
  }, [userName]);

  const saveUserName = (name) => {
    setUserName(name);
    setShowWelcomeModal(false);
  };

  const clearUserName = () => {
    localStorage.removeItem(STORAGE_CONFIG.USERNAME_KEY);
    setUserName('');
    setShowWelcomeModal(true);
  };

  return {
    userName,
    showWelcomeModal,
    saveUserName,
    clearUserName,
  };
};
