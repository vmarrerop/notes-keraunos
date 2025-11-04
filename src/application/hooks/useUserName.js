import { useState, useEffect } from 'react';

export const useUserName = () => {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('keraunos_user_name') || '';
  });

  const [showWelcomeModal, setShowWelcomeModal] = useState(!userName);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('keraunos_user_name', userName);
    }
  }, [userName]);

  const saveUserName = (name) => {
    setUserName(name);
    setShowWelcomeModal(false);
  };

  const clearUserName = () => {
    localStorage.removeItem('keraunos_user_name');
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
