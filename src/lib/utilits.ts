
export function arrayString(valu: any, showAll = false) {
    let a = typeof valu;
    if (a == "object") {
        let error: any = {};
        for (const val of Object.entries(valu)) {
            const [key, value]: any = val;
            console.log(key, value,'v===');
            
            if (key != "status") {
                if (key === "error") {
                    error["message"] = Array.isArray(value) ? value[0] : value;
                } else {
                    error[key] = Array.isArray(value) ? value[0] : value;
                }
            }
        }
        return error;
    } else return valu;
}