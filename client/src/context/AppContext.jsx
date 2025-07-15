import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [credit, setCredit] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  async function logout() {
    try {
      const res = await fetch(`${backendUrl}/api/user/logout`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setUser(false);
      }
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error(error.message);
      console.error('Logout failed', error);
    }
  }

  async function generateImage(prompt) {
    try {
      const res = await fetch(`${backendUrl}/api/image/generate-image`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        loadCreditsData();
        if (data.creditBalance === 0) {
          navigate('/buy');
        }
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
      loadCreditsData();
    }
  }

  const loadCreditsData = async () => {
    try {
      const data = await fetch(`${backendUrl}/api/user/credits`, {
        credentials: 'include',
      });
      const res = await data.json();
      if (res.success) {
        setCredit(res.credits);
        setUser(res.user);
      } else {
        setUser(false); // not authenticated
      }
      // toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
      setUser(false);
    } finally {
      setLoadingUser(false);
    }
  };
  useEffect(() => {
    loadCreditsData(); // 🔄 try to restore user on load
  }, []);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    credit,
    setCredit,
    loadCreditsData,
    loadingUser,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
