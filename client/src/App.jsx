import { useContext, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Result from './pages/Result';
import BuyCredit from './pages/BuyCredit';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';

function App() {
  const { showLogin ,user} = useContext(AppContext);
  return (
    <>
      <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
        <Toaster position='top-right'/>
        <Navbar />
        {showLogin && <Login />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buy" element={<BuyCredit />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
