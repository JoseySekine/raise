import { useRef, useEffect, useState } from "react";
import styles from "./Settings.module.css";
import InputField from "../components/Input-field";

function Settings() {
  const email: any = useRef("");
  const password: any = useRef("");
  const username: any = useRef("");
  const [originalData, setOriginalData] = useState({});
  const dummyAddress = 'aaa@com'

  useEffect(() => {
    const data = async () => {
      let response = await fetch("http://localhost:8080/get_user_info", {
        headers: {
          'Authorization': "Bearer " + dummyAddress,
        },
      });
      if (!response.ok) {
        console.error(`Fetching user info error ${response.status}`);
      } else {
        response = await response.json();
        console.log(response);
      }
    };
    data();
  }, []);

  const editHandler = () => {
    const response = fetch("http://localhost:8080/edit_user_info", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }),
    });
  };

  return (
    <div className={styles.settings_container}>
      <div className={styles.form_container}>
        <p>Edit your account</p>
        <form onSubmit={editHandler} className={styles.form}>
          <InputField
            name={"username"}
            placeholder={"Username"}
            type={"text"}
            dataRef={username}
          />
          <InputField
            name={"email"}
            placeholder={"Email"}
            type={"email"}
            dataRef={email}
          />
          <InputField
            name={"password"}
            placeholder={"Password"}
            type={"password"}
            dataRef={password}
          />
          <button>Edit</button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
