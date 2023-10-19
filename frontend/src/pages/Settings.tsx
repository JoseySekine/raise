import { useEffect, useState } from "react";
import styles from "./Settings.module.css";
import InputField from "../components/Input-field";

interface UserInfo {
  username: string;
  email: string;
  password: string;
}

const Settings = () => {
  const [originalData, setOriginalData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [oldData, setOldData] = useState({
    email: "",
    password: "",
  });
  const dummyAddress = "test@test.com";

  useEffect(() => {
    const data = async () => {
      let response = await fetch("http://localhost:8080/get_user_info", {
        headers: {
          Authorization: "Bearer " + dummyAddress,
        },
      });
      if (!response.ok) {
        console.error(`Fetching user info error ${response.status}`);
      } else {
        const userData: UserInfo = await response.json();
        // response = await response.json();
        console.log(userData);

        if (userData.email && userData.username) {
          setOriginalData({
            username: userData.username,
            email: userData.email,
            password: userData.password,
          });

          setOldData({ password: userData.password, email: userData.email });
        }
      }
    };
    data();
  }, []);

  const editHandler = async (e: any) => {
    e.preventDefault();

    let response = await fetch("http://localhost:8080/edit_user_info", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: originalData.username,
        email: originalData.email,
        password: originalData.password,
        oldPassword: oldData.password,
        oldEmail: oldData.email,
      }),
    });

    if (!response.ok) {
      console.log("Edit failed");
    } else {
      console.log("Edit success");
    }
  };

  return (
    <div className={styles.settings_container}>
      <div className={styles.form_container}>
        <h2>Edit your account</h2>
        <form onSubmit={editHandler} className={styles.form}>
          <InputField
            name={"username"}
            placeholder={"Username"}
            type={"text"}
            value={originalData.username}
            onChange={(e: any) =>
              setOriginalData({ ...originalData, username: e.target.value })
            }
          />
          <InputField
            name={"email"}
            placeholder={"Email"}
            type={"email"}
            value={originalData.email}
            onChange={(e: any) =>
              setOriginalData({ ...originalData, email: e.target.value })
            }
          />
          <InputField
            name={"password"}
            placeholder={"Password"}
            type={"password"}
            value={originalData.password}
            onChange={(e: any) =>
              setOriginalData({ ...originalData, password: e.target.value })
            }
          />
          <button>Edit</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
