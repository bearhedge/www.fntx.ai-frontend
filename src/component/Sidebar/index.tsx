import { NavLink } from "react-router-dom"
import { menu } from "../../lib/menu"
import Logo from '@assets/svg/logo.svg';
import Card from "../Card";

interface Iprops {
    width: number
}
export default function Sidebar({ width }: Iprops) {
    return <div className='sidebar' style={{ width: width }}>
        <Card>
            <img src={Logo} width='179px' />
            <div className="sidebar__content">
                {
                    menu?.map(item => <div className="sidebar__content__item">
                        {item.route ? <NavLink to={item.route} end className={({ isActive }) => (isActive ? 'active' : '')}>
                            <span>{item.ico}</span>
                            <label>{item.label}</label>
                        </NavLink> :
                        <div className="sidebar__content__item-noLink">
                            <span>{item.ico}</span>
                            <label>{item.label}</label>
                        </div>}
                    </div>)
                }
            </div>
        </Card>
    </div>
}