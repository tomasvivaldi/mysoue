"use client";
import React from "react";
import { motion } from "framer-motion";

const FindUs = () => {
  const fadeInDelayed = {
    initial: { opacity: 0, y: 20 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        delay: 0.5,
      },
    },
  };
  return (
    <div className=" flex flex-row w-full lg:gap-32 md:gap-4">
      <motion.div
        className=" max-w-6xl"
        variants={fadeInDelayed}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        <h3 className="heading2 mb-4">Wo Sie Mich Finden</h3>

        <p className="paragraph-regular  text-gray-700 mb-1">
          Im Jiyukan-Dojo erleben Sie KenShō • Shiatsu auf den Grundlagen des
          Masunaga-Shiatsu. Im KenShō • Shiatsu sind auf angenehme Weise
          Gelenkmobilisationen, Muskeldehnungen, Weichteil- und Atemtechniken
          integriert. Über die Meridiane werden Körper, Geist und Seele
          angesprochen. Im Mittelpunkt steht dabei die ganzheitliche Sicht auf
          den Menschen, die seit Jahrtausenden zur Traditionellen Chinesischen
          Medizin gehört.
          <br />
        </p>
        {/* <p className="paragraph-regular  text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p> */}

        <div className="relative rounded-lg w-[90%] md:hidden h-[50vh] my-4 mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2617.189299439306!2d8.404825076137168!3d49.006983490238596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47970647b7efcc09%3A0x897ee0292101788d!2sAikido-Dojo%20Jiyukan!5e0!3m2!1sen!2sde!4v1698225763690!5m2!1sen!2sde"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
              borderRadius: "5px",
            }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <h3 className="heading3 mb-4 mt-8">Contact</h3>

        <p className="paragraph-regular text-gray-700 mb-4">
          Phone: 0000 000 000 –{" "}
          <a
            href="mailto:mail@aikido-jiyukan.de"
            className="text-sky-600 hover:underline"
          >
            heike.wendelin@gmail.com
          </a>
        </p>
      </motion.div>
      <motion.div
        className="relative rounded-lg hidden md:block md:w-full -mr-12 lg:mr-0"
        variants={fadeInDelayed}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2617.189299439306!2d8.404825076137168!3d49.006983490238596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47970647b7efcc09%3A0x897ee0292101788d!2sAikido-Dojo%20Jiyukan!5e0!3m2!1sen!2sde!4v1698225763690!5m2!1sen!2sde"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
            borderRadius: "5px",
          }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default FindUs;
