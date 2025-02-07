import * as moment from "moment-timezone";

export function arrayString(valu: any, showAll = false) {
  let a = typeof valu;
  if (a == "object") {
    let error: any = {};
    for (const val of Object.entries(valu)) {
      const [key, value]: any = val;
      if (key != "status") {
        if (showAll) {
          error[key] = value[0];
        } else if (key === "error") {
          error["error"] = value[0];
        } else {
          error["description"] = value || value[1] || "Something went wrong";
        }
      }
    }
    return error;
  } else return valu;
}
export const decodeToken = (token: any) => {
  const a = token.split('.')[1];
  const b = a.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(b).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export const convertToIST = (utcTime:any) => {
  const todayUtcDate = moment.utc().format("YYYY-MM-DD");
      const fullUtcDateTime = `${todayUtcDate}T${utcTime}Z`; // Assuming Z (UTC) timezone

      // Convert to IST
      const istTimeString = moment.utc(fullUtcDateTime).tz("Asia/Kolkata").format(" HH:mm ");
      return istTimeString;
};