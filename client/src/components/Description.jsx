import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'motion/react';

function Description() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className="text-2xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-8">Turn your imagination into visuals</p>

      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        <img
          src={assets.sample_img_1}
          alt=""
          className="w-80 xl:w-96 rounded-lg"
        />
        <div>
          <h1 className="font-medium mb-4">
            Introducting the AI-powered Text to Image Generator.
          </h1>
          <h2>
            <p>
              Easily bring your ideas to life with our free Ai image generator.
            </p>
            <p>
              Simply type in a text prompt and our cutting edge AI will generate
              high quality images in seconds.
            </p>
          </h2>
        </div>
      </div>
    </motion.div>
  );
}

export default Description;
