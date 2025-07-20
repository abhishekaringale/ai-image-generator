import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function BuyCredit() {
  const { user, backendUrl, loadCreditsData, setShowLogin } =
    useContext(AppContext);

  const navigate = useNavigate();

  const initpay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      desciption: 'Credit Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const res = await fetch(`${backendUrl}/api/user/verify-razor`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ response }),
          });
          const data=await res.json();
          if(data.success){
            loadCreditsData();
            navigate('/');
            toast.success('Credits Added')
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    rzp.on('payment.failed', function (response) {
      toast.error('Payment Failed');
      console.error(response.error);
    });
  };
  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
      }
      const res = await fetch(`${backendUrl}/api/user/pay-razor`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.success) {
        initpay(data.order);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
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
              <button
                onClick={() => paymentRazorpay(item.id)}
                className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 cursor-pointer"
              >
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
