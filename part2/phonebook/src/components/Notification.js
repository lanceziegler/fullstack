import React, { useState, useEffect } from 'react';

const Notification = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  if (!isVisible) {
    return null;
  }

  return <div className='update'>{message}</div>;
};

export default Notification;
