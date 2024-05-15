import { motion } from "framer-motion";
import Image from "next/image";

import { useTranslations } from "next-intl";

const TeamSection = () => {
  const t = useTranslations("TeamSection");
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto py-16"
      initial="initial"
      animate="visible"
      variants={fadeIn}
      whileInView="whileInView"
      viewport={{ once: true }}
    >
      <motion.h2
        initial="initial"
        animate="visible"
        variants={fadeIn}
        whileInView="whileInView"
        viewport={{ once: true }}
        className="text-center heading1 mb-12 font-simplemichael"
      >
        {t("heading")}
      </motion.h2>
      <motion.div
        className="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-16"
        variants={fadeIn}
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        <motion.div
          className="text-center flex flex-col items-center"
          variants={fadeIn}
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <h3 className="heading1 font-bluewind ">{t("teamMember1")}</h3>
          <Image
            src="/our-little-story-1.png"
            alt={t("imageAlt1")}
            width={1556}
            height={1724}
            objectPosition="center"
            className="rounded-lg w-44 my-3"
          />

          <p className="text-gray-600 font-nunito">{t(`memberDescription1`)}</p>
        </motion.div>
        <motion.div
          className="text-center flex flex-col items-center"
          variants={fadeIn}
          viewport={{ once: true }}
          whileInView="whileInView"
        >
          <h3 className="heading1 font-bluewind">{t("teamMember2")}</h3>
          <Image
            src="/our-little-story-1.png"
            alt={t("imageAlt2")}
            width={1556}
            height={1724}
            objectPosition="center"
            className="rounded-lg w-44 my-3"
          />

          <p className="text-gray-600 font-nunito">{t(`memberDescription2`)}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TeamSection;
