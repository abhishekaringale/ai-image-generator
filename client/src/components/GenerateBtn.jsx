import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'motion/react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function GenerateBtn() {
  const { user, setShowLogin } = useContext(AppContext);

  const navigate = useNavigate();

  const onclickhandler = () => {
    user ? navigate('/result') : setShowLogin(true);
  };
  return (
    <motion.div className="text-center"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className="text-2xl md:text-3xl lg-text-4xl mt-4 font-semibold text-neutral-800 pt-3 md:py-5">
        Try Now!
      </h1>
      <button
        className="cursor-pointer flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onclickhandler}
      >
        Generate Image <img src={assets.star_group} className="h-6" alt="" />
      </button>
    </motion.div>
  );
}

export default GenerateBtn;
