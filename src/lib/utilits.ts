
export function arrayString(valu: any, showAll = false) {
    let a = typeof valu;
    if (a == "object") {
        let error: any = {};
        for (const val of Object.entries(valu)) {
            const [key, value]: any = val;
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

export const onKeyPress = (evt: any, reg?: any) => {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = reg ? reg : /^[0-9\b]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
};