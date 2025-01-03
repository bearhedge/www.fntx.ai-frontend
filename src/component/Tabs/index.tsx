import { systemtab } from "../../lib/dummyArray";
import TickIcon from '@assets/svg/tick-tabs.svg'
interface Iprops {
  handleTab?: (val: number) => void;
  tab: number;
}
export default function Tabs({ handleTab, tab }: Iprops) {
  return (
    <ul className="tabs">
      {systemtab?.map((items: string, key: number) => (
        <li
          key={key}
          className={`tabs__list ${tab === key ? "active" : tab > key ? "completed" :""}`}
          onClick={() => tab < key ? {}:handleTab&&handleTab(key)}
        >
          <span
            className={`tabs__list-dot ${tab === key ? "active" : ""}`}
          >
            {tab > key && <img src={TickIcon} alt='tick-tab'/>}
          </span>
          {items}
        </li>
      ))}
    </ul>
  );
}
