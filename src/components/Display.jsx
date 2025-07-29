import styles from "./display.module.css";

const Display = ({ expression }) => {
  return (
    <input
      type="text"
      className={styles.display}
      value={expression}
      readOnly
    />
  );
};

export default Display;
