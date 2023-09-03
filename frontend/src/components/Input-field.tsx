import React, { Fragment } from "react";

const InputField: React.FC<{
  // onChange: (e: any) => any;
  name: string;
  type: string;
  placeholder: string;
  dataRef: string;
}> = (props) => {
  return (
    <Fragment>
      <input
        // {props.onChange && onChange={props.onChange}}
        // onChange={props.onChange}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        ref={props.dataRef}
      ></input>
    </Fragment>
  );
};

export default InputField;
