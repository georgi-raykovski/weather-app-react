import { useEffect } from 'react';

export const useOutsideClick = (ref, callback, additionalCondition) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && additionalCondition) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [additionalCondition, callback, ref]);
};
