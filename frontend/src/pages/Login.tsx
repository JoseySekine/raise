import { Fragment, useState, useRef, useContext } from "react";
import { LightModeContext } from "../context";
import { useNavigate } from "react-router";
import InputField from "../components/Input-field";
import LightChangeButton from "../components/LightChangeButton";
import Overlay from "../components/Overlay";
import Modal from "../components/Modal";

import styles from "./Login.module.css";

const Login = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const email: any = useRef("");
  const password: any = useRef("");
  const username: any = useRef("");
  const navigate = useNavigate();

  // context
  const { lightMode, toggleLightMode } = useContext(LightModeContext);

  const field: any = [
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      ref: username,
      value: username.current.value,
    },
    {
      name: "mail",
      type: "mail",
      placeholder: "Email address",
      ref: email,
      value: email.current.value,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      ref: password,
      value: password.current.value,
    },
  ];

  const registerHandler = async (e: any) => {
    e.preventDefault();

    if (email && username && password) {
      const response = await fetch("http://localhost:8080/register_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        }),
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
      } else {
        // const data = await response.json();
        console.log(`Created account! ${response.status}`);
        setLoginMode(true);
      }
    }
    setModalOpen(false);
  };

  const loginHandler = async (e: any) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/login_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    });

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
    } else {
      navigate("/dashboard");
      // const data = await response.json();
      email.current = "";
      password.current = "";
      console.log("Login successful!");
      setLoginMode(false);
    }
  };

  return (
    <Fragment>
      <LightChangeButton lightMode={lightMode} onClick={toggleLightMode} />
      <div className={styles["login_container"]}>
        <div className={styles["login_description"]}></div>
        <div className={styles["form_container"]}>
          {loginMode ? <h4>Login account</h4> : <h4>Create account</h4>}
          <form onSubmit={loginHandler} className={styles["form"]}>
            {field.map((data: any, index: number) => {
              return (
                <InputField
                  dataref={data.ref}
                  key={index}
                  name={data.name}
                  type={data.type}
                  placeholder={data.placeholder}
                  value={data.value}
                />
              );
            })}
            <div className={styles.register_login_buttons}>
              {loginMode ? (
                <button>Login</button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setModalOpen(true);
                  }}
                >
                  Sign in
                </button>
              )}
              {loginMode ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setLoginMode(false);
                  }}
                >
                  Sign in Mode
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setLoginMode(true);
                  }}
                >
                  Login Mode
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {modalOpen && (
        <Overlay>
          <Modal>
            <p>Please confirm your details</p>
            <p>Username : {username.current.value}</p>
            <p>Email Address : {email.current.value}</p>
            <div className={styles.modal_confirm_buttons}>
              <button onClick={registerHandler}>Confirm</button>
              <button
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </Modal>
        </Overlay>
      )}
    </Fragment>
  );
};

export default Login;
