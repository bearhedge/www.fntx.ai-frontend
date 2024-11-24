import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../services/slices/themeSlice";
import { AppDispatch, RootState } from "../../services/store";

export default function Header(){
    const dispatch: AppDispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme.theme);
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);
    return <div className='header'>
        <h4>Welcome back, Alex</h4>
        <div className="header__mode">
            Mode: <div className="switch">
            <input type="checkbox" onChange={() => dispatch(toggleTheme())}/>
            </div>
        </div>
    </div>
}