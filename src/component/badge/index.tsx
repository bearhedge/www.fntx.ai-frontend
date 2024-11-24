interface Iprops{
    name:string
    type?:string
}

export default function Badge({name,type='primary'}:Iprops){
    return<div className={`badge badge-${type}`}>{name}</div>
}