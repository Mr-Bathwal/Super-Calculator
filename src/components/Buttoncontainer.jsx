import styles from "./Buttoncontainer.module.css";

const normalButtons = [
  "C", "⌫", "/", "*",
  "7", "8", "9", "-",
  "4", "5", "6", "+",
  "1", "2", "3", "=",
  "0", ".", "Super" // Super button fills empty spot
];

const sciButtons = [
  "sin(", "cos(", "tan(",
  "log(", "ln(", "sqrt(",
  "^", "(", ")", "%",
  "1/x", "π"
];

const Buttoncontainer = ({ onButtonClick, isSuper, toggleSuper }) => {
  return (
    <div className={styles.buttoncontainer}>

      {/* Super mode: scientific buttons grid */}
      {isSuper && (
        <div className={styles.scientificGrid}>
          {sciButtons.map((btn, i) => (
            <button
              key={i}
              className={styles.sciButton}
              onClick={() => {
                if (btn === "π") {
                  onButtonClick(Math.PI.toFixed(6)); // Insert π value
                } else {
                  onButtonClick(btn);
                }
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      )}

      {/* Normal buttons grid */}
      <div className={styles.normalGrid}>
        {normalButtons.map((btn, i) => {
if (btn === "Super") {
  return (
    <div
      key={i}
      className={styles.superWrapper}
    >
      {!isSuper && (
        <svg
          className={styles.pointerIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 28"
          width="24"
          height="24"
          fill="none"
          stroke="gold"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      )}
      <button
        className={styles.superButton}
        onClick={toggleSuper}
      >
        {isSuper ? "Back" : "Super"}
      </button>
    </div>
  );
}



          return (
            <button
              key={i}
              className={styles.buttons}
              onClick={() => onButtonClick(btn)}
            >
              {btn}
            </button>
          );
        })}
      </div>

      {/* Curvy text */}
      <p className={styles.holoText}>Super Calculator</p>
    </div>
  );
};

export default Buttoncontainer;
