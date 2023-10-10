import { Fragment, useState, useRef } from "react";
import { useNavigate } from "react-router";
import InputField from "../components/Input-field";
import classes from "./Login.module.css";
import Overlay from "../components/Overlay";
import Modal from "../components/Modal";

const Login = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const email: any = useRef("");
  const password: any = useRef("");
  const username: any = useRef("");
  const navigate = useNavigate();

  const field: any = [
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      ref: username,
    },
    { name: "mail", type: "mail", placeholder: "Email address", ref: email },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      ref: password,
    },
  ];

  const registerHandler = async (e: any) => {
    e.preventDefault();

    console.log(
      email.current.value,
      username.current.value,
      password.current.value
    );

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
        const data = await response.json();
        console.log(data);
        console.log("Created your account!");
      }
    }
    setLoginMode(true);
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
      console.log("Login failed!");
    } else {
      navigate("/dashboard");
      const data = await response.json();
      email.current = "";
      password.current = "";
      console.log("Login successful!");
      setLoginMode(false);
    }
  };

  return (
    <Fragment>
      <div className={classes["login_container"]}>
        <div className={classes["login_description"]}></div>
        <div className={classes["form_container"]}>
          {loginMode ? <h4>Login account</h4> : <h4>Create account</h4>}
          <form onSubmit={loginHandler} className={classes["form"]}>
            {field.map((data: any, index: number) => {
              return (
                <InputField
                  dataRef={data.ref}
                  key={index}
                  name={data.name}
                  type={data.type}
                  placeholder={data.placeholder}
                />
              );
            })}
            <div className={classes.register_login_buttons}>
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
            <div className={classes.modal_confirm_buttons}>
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
