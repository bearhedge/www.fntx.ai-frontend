interface Iprops {
    children: React.ReactNode
    className?:string
}
export default function Card({ children,className='' }: Iprops) {
    return <div className={`card ${className?className:''}`}>{children}</div>
}