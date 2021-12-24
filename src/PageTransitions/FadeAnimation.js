import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: 0 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 },
};

const FadeIn = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      transition={{ duration: 1.5 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
