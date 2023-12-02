import classNames from "classnames";
import styles from "./Spinner.module.css";

function Spinner({ inlineRow = false }) {
  return (
    <div
      className={classNames(styles.spinnerContainer, {
        [styles.inlineRow]: inlineRow,
      })}
    >
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Spinner;
