import React from 'react';
import { assets } from '../assets/assets';

function Footer() {
  return (
    <div className="mt-20 flex items-center justify-between gap-4 py-3">
      <img src={assets.logo} alt="" width={150} />

      <p>Copyright @Abhishek | All rights reserved.</p>

      <div className='flex gap-2'>
        <img src={assets.facebook_icon} alt="" />
        <img src={assets.twitter_icon} alt="" />
        <img src={assets.instagram_icon} alt="" />
      </div>
    </div>
  );
}

export default Footer;
