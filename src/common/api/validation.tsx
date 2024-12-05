import { useState, useEffect, FormEvent } from "react";

export const validation = (data: any) => {
  let errors: any = {};
  for (const property in data) {
    if (data[property]?.length && Array.isArray(data[property])) {
      errors[property] = data[property]?.length
        ? ""
        : inputValidation(data, property);
      if (!errors[property]?.length) {
        delete errors[property];
      }
    } else {
      errors = {
        ...errors,
        ...inputValidation(data, property),
      };
    }
  }
  return errors;
};
const inputValidation = (data: any, property: any) => {
  const errors: any = {};
  if (
    data[property] === null ||
    data[property] === undefined ||
    !data[property].toString().trim().length
  ){
    if (property === "verify_password") {
      errors[property] = 'Please verify your password.'
    }else if (property === "otp") {
      errors[property] = 'Please enter OTP.'
    } else {
      errors[property] = property.startsWith("select.")
        ? `Please select ${property.split(".")[1].replace(/_/g, " ")}.`
        : `Please ${property.includes("photo") ? "upload" : "enter"} ${property === "email"
          ? "email address."
          : property.replace(/_/g, " ") + "."
        }`;
    }
  }
  if (property === "email" && data[property]?.length) {
    if (ValidateEmailAddress(data[property])) {
      errors[property] = ValidateEmailAddress(data[property]);
    }
  }
  if (
    (property.includes("phone") || property.includes("contact_number")) &&
    data[property]?.length
  ) {
    if (data[property]?.length < 10) {
      errors[property] = "Please number must have at least 10 digits.";
    }
  }
  if (
    (property === "password" || property === "new_password") &&
    data[property].length
  ) {
    if (passwordCheck(data[property])) {
      errors[property] = passwordCheck(data[property]);
    }
  }
  if (property === "verify_password" && data["verify_password"]?.length) {
    if (data["verify_password"] !== data["password"]) {
      errors["verify_password"] =
        "Password do not match. Please make sure they match.";
    } else {
      delete errors["verify_password"];
    }
  }
  if (property === "confirm_new_password") {
    if (data["confirm_new_password"] !== data["new_password"]) {
      errors["confirm_new_password"] =
        "Password do not match. Please make sure they match.";
    } else {
      delete errors["confirm_new_password"];
    }
  }
  if (property === "hr_email" && data[property]?.length) {
    if (ValidateEmailAddress(data[property])) {
      errors[property] = ValidateEmailAddress(data[property]);
    }
  }
  if (property.includes("time")) {
    if (data[property] === "0") {
      errors[property] = `Provided ${property
        .split(".")[1]
        .replace(/_/g, " ")} should be greater than 0`;
    }
  }
  return errors;
};
export const passwordCheck = (password: string) => {
  // if (password.length < 8) return "At least 8 characters";
  const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^\w\d\s]).{8,}$/;
  if (!regex.test(password))
    return "Password must contain at least 8 characters, including one uppercase and lowercase letter, one number, and one special character.";
};
export const ValidateEmailAddress = (emailString: string) => {
  if (!emailString) return "Please enter email";
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(emailString))
    return "Your email is incorrect. Please try again";
};
export const FormC = ({
  values,
  removeValidValue,
  onSubmit,
  onSubmitError,
}: any) => {
  const [err, setErr] = useState({});
  const [stateParam, setStateParam] = useState<any>({ ...values });
  useEffect(() => {
    if ((values && JSON.stringify(values)) !== JSON.stringify(stateParam)) {
      setStateParam(values);
    }
  }, [values]);
  const removeAllError = () => {
    setErr({});
  };
  const handleSubmit = (e: FormEvent) => {
    e?.preventDefault();
    const data = removeFormValidation(stateParam);
    const error = validation(data);
    setErr(error);
    if (!Object?.keys(error)?.length) {
      setErr({});
      onSubmit(e);
    } else {
      onSubmitError && onSubmitError(error);
      const err = Object.keys(error);
      if (err.length) {
        const input = document?.querySelector(
          `input[name="${CSS.escape(err[0])}"]`
        );
        input?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  };
  const handleNewError = (error: any) => {
    setErr({ ...error });
  };
  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    const state = {
      ...stateParam,
      [name]: value,
    };
    setStateParam(state);
    if (value?.length) {
      const data = removeFormValidation({ [name]: value });
      if (!Object?.keys(data)?.length) {
        let error = validation(state);
        setErr(error);
      }
    }
  };
  const handleArrayChange = (e: any, type: any) => {
    const { name, value } = e?.target || {};
    let state = {
      [name]: value,
    };
    if (value?.length) {
      let error = validation(state);
      setErr({
        [type]: [error],
      });
    } else {
      setErr({});
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e?.target || {};
    let state = {
      [name]: value,
    };
    const data = removeFormValidation({ [name]: value });
    if (Object?.keys(data)?.length) {
      if (value?.length) {
        var stateparam: any = {
          ...state,
        };
        if (name === "verify_password") {
          stateparam = {
            ...stateparam,
            password: stateParam?.password,
          };
        }
        let error = validation(stateparam);
        setErr(error);
      } else {
        setErr({});
      }
    }
  };
  const removeFormValidation = (stateUpdate: any) => {
    let d = { ...stateUpdate };
    if (removeValidValue?.length) {
      for (let name in d) {
        if (removeValidValue?.includes(name)) {
          delete d[name];
        }
      }
    }
    return d;
  };
  const obj = {
    handleBlur,
    removeFormValidation,
    handleChange,
    handleSubmit,
    handleNewError,
    handleArrayChange,
    removeAllError,
    errors: err as any,
  };
  return obj;
};
