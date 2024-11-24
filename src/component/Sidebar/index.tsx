import { NavLink } from "react-router-dom"
import { menu } from "../../lib/menu"

interface Iprops {
    width: number
}
export default function Sidebar({ width }: Iprops) {
    return <div className='sidebar' style={{ width: width }}>
        <h5>Trading</h5>
        <div className="sidebar__content">
            {
                menu?.map(item => <>
                    <div className="sidebar__content__label">{item.label}</div>
                    {
                        item.item?.map(itemMenu => <div className="sidebar__content__item">
                            <NavLink to={itemMenu.route} end className={({ isActive }) => (isActive ? 'active' : '')}>
                                <span>{itemMenu.ico}</span>
                                <label>{itemMenu.label}</label>
                            </NavLink>
                        </div>)
                    }

                </>)
            }
        </div>
    </div>
}