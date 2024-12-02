interface Iprops {
    label: string
    type?: string
}
export default function Alert({ type = 'type', label }: Iprops) {
    if(!label){
        return<></>
    }
    return <div className={`alert alert-${type}`} role="alert">
        {label}
    </div>
}