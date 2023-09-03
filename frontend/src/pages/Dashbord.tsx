import { Link } from "react-router-dom";
import styles from "./Dashbored.module.css";
function Dashbord() {
  return (
    <div className={styles.dashbored_container}>
      <div className={styles.dashbored_display}>
        <h2>Dashbored</h2>
        <img
          className={styles.dashbored_icon}
          alt=""
          src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"
        ></img>
        <h2>Mike Smith</h2>
        <Link to={'/'}className={styles.dashbored_record}>
          <h2>My cards</h2>
          <button>Check my cards</button>
        </Link>
      </div>
      <div className={styles.dashbored_activities}>
        <Link to="/settings"
          className={`${styles.dashbored_setting} ${styles.dashbored_activity}`}
        >
          <h3>Settings</h3>
          <p>Profile, your studies and experience</p>
        </Link>
        <Link to="/new_cards"
          className={`${styles.dashbored_booking} ${styles.dashbored_activity}`}
        >
          <h3>New Cards</h3>
          {/* <p>See available slots of from calender</p> */}
        </Link>
        <Link to="/"
          className={`${styles.dashbored_members} ${styles.dashbored_activity}`}
        >
          <h3>Find cards</h3>
        </Link>
      </div>
    </div>
  );
}

export default Dashbord;
