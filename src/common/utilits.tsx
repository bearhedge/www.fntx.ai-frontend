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