import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';

export const usePersistentState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return loadFromLocalStorage(key, defaultValue);
  });

  useEffect(() => {
    saveToLocalStorage(key, state);
  }, [key, state]);

  return [state, setState];
};
