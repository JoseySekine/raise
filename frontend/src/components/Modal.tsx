import styles from './Modal.module.css'

function Modal(props: any) {
  const {children} = props;
  return (
    <div className={styles.modal}>
      {children}
    </div>
  );
}

export default Modal;
