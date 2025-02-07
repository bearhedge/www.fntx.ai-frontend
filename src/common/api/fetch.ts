import axios from "axios";
import Auth from "./Auth";
const baseURL = import.meta.env.VITE_API_URL;
const commonParams = {};

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";
export default function Fetch(
  endPoint: any,
  params: any = {},
  option: any = {}
) {

  console.log(params, "params=====")
  const method: HttpMethod = option?.method ?? "get";
  const inFormData = option?.inFormData ?? false; // formType === true
  const isToken = option?.isToken ?? true;
  const url = option?.url;
  let parameters = {
    ...commonParams,
    ...params,
  };
  const FetchHeader = (token: any) => {
    const headers: any = {
      "Content-Type": inFormData ? "multipart/form-data" : "application/json",
      Authorization: `Bearer ${token || ""}`,
      "Access-Control-Allow-Origin": "*",
    };
    if (!isToken) {
      delete headers["Authorization"];
    }
    return {
      headers,
    };
  };
  const convertToForm = () => {
    let formData = new FormData();
    for (let name in parameters) {
      if (
        typeof parameters[name] === "object" &&
        !parameters[name]?.type?.length
      ) {
        if (name === "certificates") {
          for (var i = 0; i < parameters[name].length; i++) {
            let file = parameters[name][i]?.file
              ? parameters[name][i]?.file[0]
              : null;
            formData.append(`${name}[${i}]title`, parameters[name][i].title);
            formData.append(
              `${name}[${i}]description`,
              parameters[name][i].description
            );
            formData.append(`${name}[${i}]file`, file);
          }
        } else if (Array.isArray(parameters[name])) {
          for (var i = 0; i < parameters[name].length; i++) {
            if (typeof parameters[name][i] !== "object") {
              formData.append(`${name}`, parameters[name][i]);
            } else {
              for (let nameList in parameters[name][i]) {
                formData.append(
                  `${name}[${i}]${nameList}`,
                  parameters[name][i][nameList]
                );
              }
            }
          }
        } else {
          formData.append(name, JSON.stringify(parameters[name]));
        }
      } else {
        formData.append(name, parameters[name]);
      }
    }
    return formData;
  };
  const fetch = (token: any) => {
    return axios[method](
      url ? url : baseURL + endPoint,
      inFormData
        ? convertToForm()
        : Object.keys(parameters)?.length
        ? parameters
        : FetchHeader(token),
      FetchHeader(token)
    )
      .then((d: any) => {
        const dataParse = { data: d.data, status: true };
        return dataParse;
      })
      .catch((err: any) => {
        // if (err?.response?.data?.code === "token_not_valid") {
        //   return refreshToken().then((d: any) => {
        //     if (d.status) {
        //       localStorage.userJWT = d.data.access;
        //       return fetch(d.data.access);
        //     }
        //   });
        // }
        return { ...err?.response?.data, status: false };
      });
  };
  if (isToken === false) {
    return fetch(isToken);
  }
  return Auth.getAsyncToken().then((token: any) => fetch(token));
}

export const refreshToken: any = async () => {
  try {
    return await Fetch(
      "accounts/auth/token/",
      { refresh: localStorage.refreshJWT },
      { method: "post" }
    );
  } catch (err) {}
};
