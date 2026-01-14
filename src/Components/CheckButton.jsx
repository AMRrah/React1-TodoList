import { motion, useMotionValue, useTransform } from "framer-motion";
import styles from "../styles/modules/todoItem.module.scss";

const checkvariants = {
  initial: {
    color: "#fff",
  },
  checked: {
    pathLenght: 1,
  },
  unchecked: {
    pathLenght: 0,
  },
};
const boxvariants = {
  checked: {
    background: "#3693adff",
    transition: { duration: 0.1 },
  },
  unchecked: {
    background: "#dededeff",
    transition: { duration: 0.1 },
  },
};

const CheckButton = ({ check, handlecheck }) => {
  const pathLenght = useMotionValue(0);
  const opacity = useTransform(pathLenght, [0.05, 0.15], [0, 1]);
  return (
    <motion.div
      className={styles.svgBox}
      animate={check ? "checked" : "unchecked"}
      variants={boxvariants}
      onClick={() => handlecheck()}>
      <motion.svg
        viewBox="0 0 53 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <motion.path
          variants={checkvariants}
          animate={check ? "checked" : "unchecked"}
          style={{ pathLenght, opacity }}
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinejoin="round"
          strokeLinecap="round"></motion.path>
      </motion.svg>
    </motion.div>
  );
};
export default CheckButton;
