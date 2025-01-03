import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { menu } from "../../lib/menu"
import Logo from '@assets/svg/logo.svg';
import LogOutIco from '@assets/svg/logout_ico.svg';
import DummyProfileico from '@assets/svg/dummy-img.svg';
import Card from "../Card";
import Button from "../form/button";
import { ArrowDropdownIco, SettingIco } from "../../lib/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../../services/slices/authSlice";

interface Iprops {
    width: number
}
export default function Sidebar({ width }: Iprops) {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null); // State to manage active dropdown

    const handleDropdownToggle = (key: number) => {
        setActiveDropdown((prevKey:number | null) => (prevKey === key ? null : key)); // Toggle dropdown
    };
    const handleLogout = () => {
        localStorage.clear();
        dispatch(setLoginUser(false))
        navigate('/')
    }
    const fullUrl = location.pathname + location.search
    return <div className='sidebar' style={{ width: width }}>
        <Card>
            <img src={Logo} width='179px' />
            <div className="d-flex justify-content-between flex-column">
                <div className="sidebar__content">
                    {
                        menu?.map((item, key) => <div className="sidebar__content__item" key={key}>
                            {item.route ? <NavLink to={item.route} end className={({ isActive }) => (isActive ? 'active' : '')}>
                                <span>{item.ico}</span>
                                <label>{item.label}</label>
                            </NavLink> :
                                <div className="dropdown">
                                    <div className={`sidebar__content__item-noLink ${location.pathname?.includes(`/system`) ?'active':''} ${activeDropdown === key && 'dropdown-open'}`} onClick={() => handleDropdownToggle(key)}>
                                        <span>{item.ico}</span>
                                        <label>{item.label}</label>
                                        <span className="ms-2 ico"><ArrowDropdownIco color={location.pathname?.includes('/system') || activeDropdown === key?'#fff':''}/></span>
                                    </div>
                                    <div 
                                    className={`${activeDropdown === key ? 'open dropdown-container' : ''}`}
                                    style={{
                                        maxHeight: activeDropdown === key ? '300px' : '0',
                                        visibility:activeDropdown === key ? 'visible':'hidden'
                                    }}
                                    >
                                        
                                        {
                                            item.chiildren?.map((child, index) => child.route ? <div key={key + index} className="sidebar__content__item">
                                                <NavLink to={child.route} className={() => (fullUrl === child.route ? 'active' : '')}>
                                                    <label>{child.label}</label>
                                                </NavLink>
                                            </div>: 
                                            <div className={`sidebar__content__item-noLink ${fullUrl.includes(child.route) || activeDropdown === key?'active':''}`} onClick={() => handleDropdownToggle(key)}>
                                        {/* <label>{item.label}</label> */}
                                    </div>)
                                        }
                                    </div>
                                </div>
                            }
                        </div>)
                    }
                </div>
                <div className="">
                    <div className="sidebar__content__item sidebar__content__item-user mb-0">
                        <span><img src={DummyProfileico} /></span>
                        <label>User Name</label>
                    </div>
                    <div className="sidebar__content__item">
                        <NavLink to='/setting' end className={({ isActive }) => (isActive ? 'active' : '')}>
                            <span><SettingIco /></span>
                            <label>Settings</label>
                        </NavLink>
                    </div>
                    <div className="sidebar__content__item sidebar__content__item-btn">
                        <Button type="button" className="btn w-100" onClick={handleLogout}>
                            <span><img src={LogOutIco} alt='logout' /></span>
                            <label>Logout</label>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    </div>
}