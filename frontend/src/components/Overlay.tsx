import styles from "./Overlay.module.css";

function Overlay(props: any) {
  const { children } = props;
  return <div className={styles.overlay}>{children}</div>;
}

export default Overlay;
