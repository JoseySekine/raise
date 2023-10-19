import styles from "./LightChangeButton.module.css";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";

const LightChangeButton = (props: any) => {
  return (
    <p className={styles.LightChangeButton} onClick={props.onClick}>
      {props.lightMode ? <BsFillMoonFill /> : <BsSunFill />}
    </p>
  );
};

export default LightChangeButton;
