/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionHeadText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        variants={fadeIn("", "", 0.1, 1)}
      >
        I'm a Software Engineer with a passion for building scalable,
        user-focused applications. I have over three years of hands-on
        experience working with both front-end tools like Angular and React and
        back-end frameworks such as NestJS and Laravel.
      </motion.p>

      <motion.p
        className="mt-2 text-secondary text-[17px] max-w-3xl leading-[30px]"
        variants={fadeIn("", "", 0.2, 1)}
      >
        I enjoy solving complex problems by creating efficient, practical
        solutions. In my work, I've streamlined deployments using Docker,
        improved team workflows in agile environments, and focused on delivering
        high-performance applications.
      </motion.p>

      <motion.p
        className="mt-2 text-secondary text-[17px] max-w-3xl leading-[30px]"
        variants={fadeIn("", "", 0.3, 1)}
      >
        I'm always eager to learn and grow, and I'm excited to contribute to
        innovative projects that make a real impact.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
