import Loader from "./loader";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?:any
}
export default function Button(props: ButtonProps): React.ReactElement<ButtonProps> {
    const { children,isLoading=false, ...rest }:any = props;
    return <button {...rest}>{isLoading ?<Loader/> :children}</button>
}