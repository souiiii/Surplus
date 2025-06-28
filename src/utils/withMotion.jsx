import { motion } from "framer-motion";

const withMotion = (Component) => {
  return function WrappedWithMotion(props) {
    return (
      <motion.div
        className="good"
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(8px)" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ height: "100%" }}
      >
        <Component {...props} />
      </motion.div>
    );
  };
};

export default withMotion;
