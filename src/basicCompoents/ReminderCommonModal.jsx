import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ReminderCommonModal = ({
  isOpen,
  onClose,
  title,
  children,
  primaryButtonText = 'Confirm',
  secondaryButtonText = 'Cancel',
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  size = 'md',
  showCloseButton = true
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className={`w-full ${sizeClasses[size]} bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden`}>
       
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h3>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        
        <div className="p-4 text-gray-600 dark:text-gray-300">
          {children}
        </div>

        
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
          {secondaryButtonText && (
            <button
              onClick={onSecondaryButtonClick || onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {secondaryButtonText}
            </button>
          )}
          <button
            onClick={onPrimaryButtonClick}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
          >
            {primaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderCommonModal;