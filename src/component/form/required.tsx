interface Iprops {
    errorText:string
}
export default function Required({errorText=''}:Iprops){
    return errorText ? <div className="error">{errorText}</div>:null
}