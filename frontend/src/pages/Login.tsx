import { Fragment, useState, useRef } from "react";
import { useNavigate } from "react-router";
import InputField from "../components/Input-field";
import classes from "./Login.module.css";

const auth = {
  email: "aaa@com",
  password: "messi",
};

const Login = () => {
  const [login, setLogin] = useState(true);
  const email: any = useRef("");
  const password: any = useRef("");
  const navigate = useNavigate();

  const field: any = [
    { name: "mail", type: "mail", placeholder: "Address", ref: email },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      ref: password,
    },
  ];

  const changeInput = (e: any) => {
    const { name, value } = e.target;

    switch (name) {
      case "mail":
        return (email.current = value);
      case "password":
        return (password.current = value);
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    // create account
    if (!login) {
      const response = await fetch("http://localhost:8080/register_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "1111",
          username: "Josey",
          email: "bbb@com",
          password: "111111",
        }),
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        console.log(data); // Log
      }
    } else {
    }

    if (
      password.current.value === auth.password &&
      email.current.value === auth.email
    ) {
      console.log("got in");
      email.current = "";
      password.current = "";
      setLogin(false);
      navigate("/dashbored");
    } else {
      console.log("try again!");
    }
  };

  const handelMode = (e: any) => {
    e.preventDefault();
    setLogin(!login);
  };

  return (
    <Fragment>
      <div className={classes["login_container"]}>
        <div className={classes["login_description"]}></div>
        <div className={classes["form_container"]}>
          {login ? <h4>Create account</h4> : <h4>Login account</h4>}
          <form onSubmit={submitHandler} className={classes["form"]}>
            {field.map((data: any, index: number) => {
              return (
                <InputField
                  // onChange={changeInput}
                  dataRef={data.ref}
                  key={index}
                  name={data.name}
                  type={data.type}
                  placeholder={data.placeholder}
                />
              );
            })}
            <button>{login ? "Sign in" : "Login"}</button>
            <button onClick={handelMode}>
              {login ? "Login account" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
