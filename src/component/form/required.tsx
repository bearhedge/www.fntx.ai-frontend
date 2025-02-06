interface Iprops {
    errorText:string
}
export default function Required({errorText=''}:Iprops){
    return errorText ? <div className="error" style={{fontSize: '18px'}}>{errorText}</div>:null
}