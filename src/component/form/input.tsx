import { useState } from "react";
import Required from "./required";

export default function Input(props: any): JSX.Element {
  const { errorText, type, label, login, error, ...rest } = props;
  return (
    <div className="form-input">
      {label?.length ? (
        <label

          className="form-label"
        >
          {label}
        </label>
      ) : null}{" "}
      <div
        className={`${type === "textarea" ? "textarea" : ""} input-wrapper`}
      >
        {type === "textarea" ? (
          <textarea {...rest}></textarea>
        ) : (
          <div className="form-control">
            <input
              type={type}
              {...rest}
            />
          </div>
        )}
      </div>
      <Required errorText={errorText} />
    </div>
  );
}