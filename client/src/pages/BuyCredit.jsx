import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
function BuyCredit() {
  const { user } = useContext(AppContext);
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-center pt-12 mb-10 min-h-[80vh]">
        <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
          Our Plans
        </button>
        <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
          Choose the plan
        </h1>

        <div className="flex flex-wrap justify-center gap-6 text-left">
          {plans.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500 min-w-[20vw]"
            >
              <img src={assets.logo_icon} alt="" width={40} />
              <p className="mt-3 mb-1 font-semibold">{item.id}</p>
              <p className="text-sm">{item.desc}</p>
              <p className="mt-6">
                <span className="text-3xl font-medium">${item.price}</span>/
                {item.credits} credits
              </p>
              <button className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 cursor-pointer">
                {user ? 'purchase' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default BuyCredit;
