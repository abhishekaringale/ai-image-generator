import { useContext, useEffect } from 'react';
import ReactDom from 'react-dom';
import { AppContext } from '../context/AppContext';

export default function Model({ children }) {
  const { showLogin, setShowLogin } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return ReactDom.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 overflow-auto">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative animate-fade-in">
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl btn"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
