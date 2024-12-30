import Required from "./required";

export default function Input(props: any): JSX.Element {
  const { errorText, type, label, login, error, children, ...rest } = props;
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
        <div className="form-control">
          {type === "textarea" ? (
            <textarea {...rest}></textarea>
          ) : type === "select" ?
            <select
              {...rest}
            >
              {children}
            </select>
            : (
              <input
                type={type}
                {...rest}
              />
            )}
        </div>

      </div>
      <Required errorText={errorText} />
    </div>
  );
}