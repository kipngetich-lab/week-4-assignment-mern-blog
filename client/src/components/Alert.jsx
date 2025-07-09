import { FaTimes } from 'react-icons/fa';

const Alert = ({ type = 'info', message, onClose }) => {
  const alertClasses = {
    info: 'bg-blue-100 border-blue-400 text-blue-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    error: 'bg-red-100 border-red-400 text-red-700',
  };

  return (
    <div className={`${alertClasses[type]} border px-4 py-3 rounded relative mb-4`}>
      {message}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-1 mr-2 text-lg"
          aria-label="Close"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default Alert;