// src/components/PageWrapper.jsx
import { motion } from "framer-motion";

export default function PageWrapper({ children}) {
  return (
    <motion.div
      className="good"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      style={{ height: "100%", width: "100%" }}
    >
      {children}
    </motion.div>
  );
}
