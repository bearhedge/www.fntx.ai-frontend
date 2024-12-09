import { NavLink } from "react-router-dom"
import { menu } from "../../lib/menu"
import Logo from '@assets/svg/logo.svg';
import LogOutIco from '@assets/svg/logout_ico.svg';
import DummyProfileico from '@assets/svg/dummy-img.svg';
import Card from "../Card";
import Button from "../form/button";
import { SettingIco } from "../../lib/icons";

interface Iprops {
    width: number
}
export default function Sidebar({ width }: Iprops) {
    return <div className='sidebar' style={{ width: width }}>
        <Card>
            <img src={Logo} width='179px' />
            <div className="d-flex justify-content-between flex-column">
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
            <div className="">
                <div className="sidebar__content__item sidebar__content__item-user mb-0">
                    <span><img src={DummyProfileico}/></span>
                    <label>User Name</label>
                </div>
                <div className="sidebar__content__item">
                    <NavLink to='/setting' end className={({ isActive }) => (isActive ? 'active' : '')}>
                        <span><SettingIco/></span>
                        <label>Setting</label>
                    </NavLink>
                </div>
                <div className="sidebar__content__item sidebar__content__item-btn">
                    <Button type="button" className="btn w-100">
                        <span><img src={LogOutIco} alt='logout'/></span>
                        <label>Logout</label>
                    </Button>
                </div>
            </div>
            </div>
        </Card>
    </div>
}