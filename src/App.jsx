import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Buttoncontainer from "./components/buttoncontainer";
import Display from "./components/display";

function App() {
  const [expression, setExpression] = useState("");
  const [isSuper, setIsSuper] = useState(false);

  const toggleSuper = () => setIsSuper((prev) => !prev);

 const preprocessExpression = (exp) => {
  // Auto-close missing brackets
  const openBrackets = (exp.match(/\(/g) || []).length;
  const closeBrackets = (exp.match(/\)/g) || []).length;
  let fixedExp = exp + ')'.repeat(Math.max(0, openBrackets - closeBrackets));

  // Insert * for implicit multiplication
  fixedExp = fixedExp
    .replace(/(\d)(?=[a-zA-Z])/g, '$1*') // 2sqrt -> 2*sqrt
    .replace(/(\d)(?=\()/g, '$1*')       // 2(3+4) -> 2*(3+4)
    .replace(/(\))(?=\d)/g, '$1*')       // )2 -> )*2
    .replace(/(\))(?=[a-zA-Z])/g, '$1*');// )sqrt -> )*sqrt

  // Replace functions with Math equivalents
  return fixedExp
    .replace(/sqrt\(/g, "Math.sqrt(")
    .replace(/sin\(/g, "Math.sin(")
    .replace(/cos\(/g, "Math.cos(")
    .replace(/tan\(/g, "Math.tan(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/ln\(/g, "Math.log(")
    .replace(/\^/g, "**")
    .replace(/1\/x/g, "1/"); // reciprocal
};

  const handleButtonClick = (value) => {
    if (value === "C") {
      setExpression("");
    } else if (value === "π") {
  setExpression((prev) => prev + Math.PI.toFixed(6)); // use 6 decimals
}
else if (value === "⌫") {
      setExpression((prev) => prev.slice(0, -1));
    }  else if (value === "=") {
  try {
    const safeExp = preprocessExpression(expression);
    let result = eval(safeExp);

    // Limit decimal places (6 significant digits)
    if (typeof result === "number" && !Number.isInteger(result)) {
      result = parseFloat(result.toFixed(6));
    }

    setExpression(result.toString());
  } catch {
    setExpression("Error");
  }
}
else {
      setExpression((prev) => prev + value);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/[0-9+\-*/.=]/.test(e.key)) {
        setExpression((prev) => prev + e.key);
      } else if (e.key === "Enter") {
        try {
          const processed = preprocessExpression(expression);
          const result = eval(processed);
          setExpression(result.toString());
        } catch {
          setExpression("Error");
        }
      } else if (e.key === "Backspace") {
        setExpression((prev) => prev.slice(0, -1));
      } else if (e.key.toLowerCase() === "c") {
        setExpression("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expression]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.calculator}>
        <h2>{isSuper ? "Super Calculator" : "Normal Calculator"}</h2>
        <Display expression={expression} />
        <Buttoncontainer
          onButtonClick={handleButtonClick}
          isSuper={isSuper}
          toggleSuper={toggleSuper}
        />
      </div>
    </div>
  );
}

export default App;
