import React, { Fragment } from "react";

const InputFieldState: React.FC<{
  name: string;
  type: string;
  placeholder: string;
  dataRef: string;
}> = (props) => {
  return (
    <Fragment>
      <input {...props} ref={props.dataRef}></input>
    </Fragment>
  );
};

export default InputFieldState;
