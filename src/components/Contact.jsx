/* eslint-disable react-refresh/only-export-components */
import { useRef, useState, useEffect  } from "react";
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser'


import { styles } from '../styles'
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import cvFile from '../assets/cv.pdf';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(form.name.trim() !== "" && form.email.trim() !== "");
  }, [form.name, form.email]);

  const handleChange = (e) => {
    const {name, value } = e.target;
    setForm({ ...form, [name]:value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    emailjs.send(
      'service_08sm6io',
      'template_rwbd4pt',
      {
        from_name: form.name,
        to_name: 'Jospen',
        from_email: form.email,
        to_email: 'jospenwolongwo@gmail.com',
        message: form.message,
      },
      'NbyDTFSRhfjaUK6zt'
    ).then(() => {
      setLoading(false);
      alert('Thank you. I will get back to you as soon as possible.')
     
      setForm({
        name: "",
        email: "",
        message: "",
      });
    },
    (error) => {
      setLoading(false);
      console.error(error);
      alert("Ahh, something went wrong. Please try again.");
    }
  );
  };

  const handleDownloadCV = () => {
    // Replace 'your-cv.pdf' with the actual path to your CV file
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'Jospen-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
 
  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 mt-12"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4"> Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="what's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg outlined-none border-none font-medium"
             />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4"> Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="what's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg outlined-none border-none font-medium"
             />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4"> Your Message</span>
            <textarea
              name="message"
              rows="7"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg outlined-none border-none font-medium"
             />
          </label>
          <div className="flex gap-4">
          <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`py-3 px-8 outline-none w-fit shadow-md shadow-primary rounded-xl ${
                isFormValid && !loading
                  ? "bg-tertiary cursor-pointer"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
            <button
              type="button"
              onClick={handleDownloadCV}
              className="bg-tertiary py-3 px-8 outline-none w-fit shadow-md shadow-primary rounded-xl"
            >
              Download CV
            </button>
          </div>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact");