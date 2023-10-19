import React, { Fragment } from "react";

const InputField: React.FC<{
  onChange?: (e: any) => any;
  name: string;
  type: string;
  placeholder: string;
  dataref?: string;
  value: string;
}> = (props) => {
  return (
    <Fragment>
      <input
        {...props}
      ></input>
    </Fragment>
  );
};

export default InputField;
