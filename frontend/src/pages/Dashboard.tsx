import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { LightModeContext } from "../context";
import styles from "./Dashboard.module.css";
import LightChangeButton from "../components/LightChangeButton";

const Dashboard = () => {
  // context
  const { lightMode, toggleLightMode } = useContext(LightModeContext);
  return (
    <Fragment>
      <LightChangeButton lightMode={lightMode} onClick={toggleLightMode}/>
      <div className={styles.dashboard_container}>
        <div className={styles.dashboard_display}>
          <h2>Dashboard</h2>
          <img
            className={styles.dashboard_icon}
            alt=""
            src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"
          ></img>
          <h2>Mike Smith</h2>
          <Link to={"/"} className={styles.dashboard_record}>
            <h2>My cards</h2>
            <button>Check my cards</button>
          </Link>
        </div>
        <div className={styles.dashboard_activities}>
          <Link
            to="/settings"
            className={`${styles.dashboard_setting} ${styles.dashboard_activity}`}
          >
            <h3>Settings</h3>
            <p>Profile, your studies and experience</p>
          </Link>
          <Link
            to="/new_cards"
            className={`${styles.dashboard_booking} ${styles.dashboard_activity}`}
          >
            <h3>New Cards</h3>
          </Link>
          <Link
            to="/"
            className={`${styles.dashboard_members} ${styles.dashboard_activity}`}
          >
            <h3>Find cards</h3>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
